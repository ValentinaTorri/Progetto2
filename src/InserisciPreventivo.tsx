import React, { useEffect, useState } from "react";
import { IPreventivo } from "./interfacce";
import { AreaRiservata } from "./AreaRiservata"
import { Stampa } from "./StampaPreventivo";
import "./InserisciPreventivo.css"

import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from 'react-router-dom'
import { table } from "console";


var listaPreventivi: Array<IPreventivo> = []

export const InserisciPreventivo = () => {

    const [Targa, setTarga] = useState('')
    const [Cilindrata, setCilindrata] = useState(2001)
    const [Interesse, setInteresse] = useState(1.2)


    const [preventivoTag, setPreventivoTag] = useState<any>('')
    let tagPreventivo: any = preventivoTag

    function AddPreventivo() {
        let archivioStringa: any = localStorage.getItem('archivioPreventivi')
        if (JSON.parse(archivioStringa) != null) {

            listaPreventivi = JSON.parse(archivioStringa)
        }

        let nuovoPreventivo: IPreventivo = {
            id: (MaxId() + 1),
            targa: Targa,
            cilindrata: Cilindrata,
            costoIniz: (Cilindrata <= 900) ? 300 : (Cilindrata > 900 && Cilindrata <= 1500) ? 600 : (Cilindrata > 1500 && Cilindrata <= 2000) ? 800 : 1000,
            interesse: Interesse,
            costoFin: (Cilindrata <= 900) ? 300 * Interesse : (Cilindrata > 900 && Cilindrata <= 1500) ? 600 * Interesse : (Cilindrata > 1500 && Cilindrata <= 2000) ? 800 * Interesse : 1000 * Interesse,
            stato: 0

        }

        setPreventivi([...listaPreventivi, nuovoPreventivo])
        localStorage.setItem('archivioPreventivi', JSON.stringify([...listaPreventivi, nuovoPreventivo]))
        //console.log(listaPreventivi)
        //window.open('StampaPreventivo')
        alert('Preventivo aggiunto correttamente')

        setPreventivoTag(<table>
            <tr>
                <th>Targa</th>
                <th>Cilindrata</th>
                <th>Tipo rateizzazione</th>
                <th>Prezzo</th>
                <th>Interesse</th>
                <th>Totale</th>
            </tr>
            <tr>
                <td>{nuovoPreventivo.targa.toUpperCase()}</td>
                <td>{nuovoPreventivo.cilindrata}cc</td>
                <td>{
                    nuovoPreventivo.interesse == 1 ?
                        'Unica' : nuovoPreventivo.interesse == 1.1 ?
                            'Semestrale' : nuovoPreventivo.interesse == 1.2 ?
                                'Trimestrale' : ''
                }
                </td>
                <td>{nuovoPreventivo.costoIniz}€</td>
                <td>{Math.round((nuovoPreventivo.interesse - 1) * 100)}%</td>
                <td>{Math.round(nuovoPreventivo.costoFin)}€</td>
            </tr>
        </table>)

    }

    const [Preventivi, setPreventivi] = useState(listaPreventivi)

    function MaxId(): number {
        let massimo: number = 0;

        for (let preventivo of listaPreventivi) {
            if (preventivo.id > massimo) {
                massimo = preventivo.id;
            }
        }
        return massimo;
    }


    return (
        <div className="contenitore">
            <div className="box">
                <label className="dati" htmlFor="">Targa</label>
                <input
                    type="text"
                    value={Targa}
                    onChange={(val) => {
                        setTarga(val.target.value);
                        //  (Cilindrata <= 900) ? setCostoIniz(300) : (Cilindrata > 900 && Cilindrata <= 1500) ? setCostoIniz(600) : (Cilindrata > 1500 && Cilindrata <= 2000) ? setCostoIniz(800) : setCostoIniz(1000)
                    }}
                /><br />

                <label className="dati" htmlFor="">Cilindrata</label>
                <input
                    type="number"
                    onChange={(val) => {
                        setCilindrata(parseFloat(val.target.value));
                    }}
                /><br />
            </div>

            <div className="box">
                <label htmlFor="">Rata unica</label>
                <input
                    type="radio"
                    name="rata"
                    value={1}
                    onChange={(val) => {
                        setInteresse(parseFloat(val.target.value));
                    }}
                /><br />

                <label htmlFor="">Rateizzazione semestrale</label>
                <input
                    type="radio"
                    name="rata"
                    value={1.1}
                    onChange={(val) => {
                        setInteresse(parseFloat(val.target.value));
                    }}
                /><br />

                <label htmlFor="">Rateizzazione trimestrale</label>
                <input
                    type="radio"
                    name="rata"
                    value={1.2}
                    onChange={(val) => {
                        setInteresse(parseFloat(val.target.value));
                    }}
                /><br />
            </div>
            <div className="box">
                <button
                    onClick={AddPreventivo}
                >Crea preventivo</button>
            </div>
            <div>
                {tagPreventivo}
            </div>
        </div>
    )
}
//<a href="http://localhost:3000/StampaPreventivo" target="_blank" rel="noopener noreferrer"></a>