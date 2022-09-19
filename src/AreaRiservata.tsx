import { table } from "console";
import React, { useState, useEffect } from "react";
import { IAdmin, IPreventivo } from "./interfacce";
import { Tabella } from "./Tabella";
import { Tabella2 } from "./Tabella"
import { Riga } from "./Riga"
import { stringify } from "querystring";


let listaAdmin: Array<IAdmin> = [
    { username: 'Valentina', password: 'Admin1' },
    { username: 'Matteo', password: 'Admin2' },
    { username: 'Giuseppe', password: 'Admin3' }
]




export const AreaRiservata = () => {

    let statoIniziale: number = 1
    const [valoreStato1, setValoreStato1] = useState<number>(statoIniziale)
    const cambiaStato = ( ): void => {
        setValoreStato1(1)
    }

    let statoIniziale2: number = 2
    const [valoreStato2, setValoreStato2] = useState<number>(statoIniziale2)
    const cambiaStato2 = (): void => {
        setValoreStato2(valoreStato2 + 1)
    }

    let saldoStringa: any = localStorage.getItem('saldo')
    let saldoIniziale: number = JSON.parse(saldoStringa)
    const [saldo2, setSaldo2] = useState<number>(saldoIniziale)
    const aggiungiImporto = (importo: number): void => {
        setSaldo2(importo + saldo2)
    }
    localStorage.setItem('saldo', JSON.stringify(saldo2))

    let preventiviRicevuti: any = localStorage.getItem('archivioPreventivi')
    let arrayPreventivi: Array<IPreventivo> = JSON.parse(preventiviRicevuti)
    const [preventiviletti, setPreventiviletti] = useState<Array<IPreventivo>>(arrayPreventivi)
    let preventiviFiltrati: Array<IPreventivo> = preventiviletti.filter(
        (prev) =>
            prev.stato == 0
    )

    let preventiviFiltrati2: Array<IPreventivo> = preventiviletti.filter(
        (prev) =>
            prev.stato == 0 || prev.stato == 1
    )
    preventiviFiltrati2.forEach(
        (prev) => {
            if (prev.stato == 1) {
                saldoIniziale += prev.costoFin
            }
        }
    )

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [tagNascosto, setTagNascosto] = useState<any>('')
    let afterLogin: any = tagNascosto

    const [tagNascosto2, setTagaNascosto2] = useState<any>('')
    let tab2: any = tagNascosto2

    const [prova, setProva] = useState<any>('')
    let tagSaldo: any = prova



    function Login() {
        localStorage.setItem('saldo', JSON.stringify(saldo2))
        let stringaSaldo: any = localStorage.getItem('saldo')

        localStorage.setItem('archivioPreventivi', JSON.stringify(preventiviFiltrati2))

        let adminFiltrato: Array<IAdmin> = listaAdmin.filter(
            (admin) =>
                admin.username == username && admin.password == password
        )

        if (adminFiltrato.length > 0) {
            setTagNascosto(
                <div>
                    <div className="saldo">
                        <h2>Saldo: {
                            JSON.parse(stringaSaldo)
                        }€
                        </h2>
                    </div>
                    <table>
                        <tr>
                            <th>Targa</th>
                            <th>Cilindrata</th>
                            <th>Costo Iniziale</th>
                            <th>Interesse</th>
                            <th>Costo Finale</th>
                            <th></th>
                            <th></th>
                        </tr>
                        {
                            preventiviFiltrati.map(
                                (prev) => {
                                    return <Riga
                                        key={prev.id}
                                        ricezione={prev}
                                        statoDaInviare1={valoreStato1}
                                        statoDaInviare2={valoreStato2}
                                        aggiornaStato={cambiaStato}
                                        aggiornaStato2={cambiaStato2}
                                        costoDaInviare={saldo2}
                                        aggiornaSaldo={aggiungiImporto}
                                    ></Riga>
                                }
                            )}
                    </table><br />

                </div>
            )

            setTagaNascosto2(<table>
                <tr>
                    <th>Targa</th>
                    <th>Cilindrata</th>
                    <th>Costo Iniziale</th>
                    <th>Interesse</th>
                    <th>Costo Finale</th>
                    <th></th>
                </tr>
                {
                    preventiviFiltrati2.map(
                        (preventivo2: IPreventivo) => {
                            return <Tabella2
                                preventivoDaInviare={preventivo2}
                                importo={saldo2}
                                aggiornaSaldo={aggiungiImporto}
                            ></Tabella2>
                        }
                    )
                }

            </table>
            )
        }

        else if (username == '' && password == '') {
            setTagNascosto('')
        }
        else {
            alert("Admin non autorizzato")
            setTagNascosto('')
        }
    }

    useEffect(
        () => {
            Login()
        }, [saldo2, valoreStato1, valoreStato2]
    )

    return (
        <div>
            <div className="box">
                <label className="dati" htmlFor="">Username:</label>
                <input
                    type="text"
                    onChange={(val) => {
                        setUsername(val.target.value)
                    }}
                /><br />
                <label className="dati" htmlFor="">Password:</label>
                <input
                    type="password"
                    onChange={(val) => {
                        setPassword(val.target.value)
                    }}
                />
                <button className="login"
                    onClick={Login}
                >Login</button>
            </div>

            {afterLogin}
            {tagSaldo}
            {tab2}

        </div>
    )
}