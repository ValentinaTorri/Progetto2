import React, { useState } from "react";
import { IPreventivo } from "./interfacce";
import { AreaRiservata } from "./AreaRiservata";
import { IPrezzo } from "./interfacce"


/*type preventivoInviato = {
   
} */





export const Tabella: React.FC<IPrezzo> = ({ preventivoDaInviare, importo, aggiornaSaldo }) => {

    const [tabella, setTabella] = useState<any>('')

    const [costo, setCosto] = useState<number>(0)
    const [datistorage, setDatistorage] = useState<Array<IPreventivo>>([])



    function Accetta(): void {
        alert('sei dentro accetta')
        let preventiviRicevuti: any = localStorage.getItem('archivioPreventivi')
        let arrayPreventivi: Array<IPreventivo> = JSON.parse(preventiviRicevuti)


        arrayPreventivi.map(
            (preven: IPreventivo) => {
                if (preven.targa == preventivoDaInviare.targa) {
                    preven.stato = 1
                }
            })

        localStorage.clear()
        localStorage.setItem('archivioPreventivi', JSON.stringify(arrayPreventivi))
        console.log(arrayPreventivi)
        setDatistorage(arrayPreventivi)

        let preventiviFiltrati: Array<IPreventivo> = datistorage.filter(
            (prev) =>
                prev.stato == 0
        )



        setTabella(
            preventiviFiltrati.map(
            (prev: IPreventivo) => {
                <tr>
                    <td>{prev.id}</td>
                    <td>{prev.targa}</td>
                    <td>{prev.cilindrata}</td>
                    <td>{prev.costoIniz}</td>
                    <td>{prev.interesse}</td>
                    <td>{prev.costoFin}</td>
                    <td><button className="login">ACCETTA</button>
                    </td>
                    <td><button className="login" >RIFIUTA</button></td>
                </tr>

            }
        )
        )

        //console.log(oggettoPreventivi)

        setCosto(preventivoDaInviare.costoFin)
        aggiornaSaldo(costo)
    }

    function Rifiuta() {
        let stringaPreventivi: any = localStorage.getItem('archivioPreventivi')
        let oggettoPreventivi = JSON.parse(stringaPreventivi)

        oggettoPreventivi.map(
            (preven: IPreventivo) => {
                if (preven.targa == preventivoDaInviare.targa) {
                    preven.stato = 2
                }
            })


        console.log(oggettoPreventivi)
        localStorage.clear()
        localStorage.setItem('archivioPreventivi', JSON.stringify(oggettoPreventivi))

    }


    return (
        <div>
            {tabella}
            <tr key={preventivoDaInviare.id}>
                <td>{preventivoDaInviare.id}</td>
                <td>{preventivoDaInviare.targa.toUpperCase()}</td>
                <td>{preventivoDaInviare.cilindrata}cc</td>
                <td>{preventivoDaInviare.costoIniz}€</td>
                <td>{preventivoDaInviare.interesse}</td>
                <td>{preventivoDaInviare.costoFin}€</td>
                <td><button
                    onClick={Accetta}
                >ACCETTA</button></td>
                <td>
                    <button
                        onClick={Rifiuta}
                    >RIFIUTA</button></td>
            </tr >
        </div>

    )
}

export const Tabella2: React.FC<IPrezzo> = ({ preventivoDaInviare }) => {

    let preventiviRicevuti: any = localStorage.getItem('archivioPreventivi')
    let arrayPreventivi: Array<IPreventivo> = JSON.parse(preventiviRicevuti)
    let preventiviFiltrati2: Array<IPreventivo> = arrayPreventivi.filter(
        (prev) =>
            prev.stato == 0 || prev.stato == 1
    )

    return (
        <tr key={preventivoDaInviare.id}>
            <td>{preventivoDaInviare.targa.toUpperCase()}</td>
            <td>{preventivoDaInviare.cilindrata}cc</td>
            <td>{preventivoDaInviare.costoIniz}€</td>
            <td>{Math.round((preventivoDaInviare.interesse-1)*100)}%</td>
            <td>{Math.round(preventivoDaInviare.costoFin)}€</td>

            <td>
                {preventivoDaInviare.stato == 0 ? 'In sospeso' : 'Accettato'}
            </td>
        </tr>
    )
}