import React, { useState } from "react";
import { IPreventivo, IRiga } from "./interfacce";
import { AreaRiservata } from "./AreaRiservata";
import { IPrezzo } from "./interfacce"


export const Riga: React.FC<IRiga> = ({ ricezione, statoDaInviare1, statoDaInviare2, aggiornaStato, aggiornaStato2, costoDaInviare, aggiornaSaldo }) => {

    const [datistorage, setDatistorage] = useState<Array<IPreventivo>>([])
    const[costo, setCosto] = useState<number>(0)


    return (

        <tr>
            <td>{ricezione.targa.toUpperCase()}</td>
            <td>{ricezione.cilindrata}cc</td>
            <td>{ricezione.costoIniz}€</td>
            <td>{Math.round((ricezione.interesse-1)*100)}%</td>
            <td>{Math.round(ricezione.costoFin)}€</td>
            <td><button className="login"
            onClick={()=>{ricezione.stato=statoDaInviare1; aggiornaStato(); aggiornaSaldo(ricezione.costoFin)}}
            >ACCETTA</button>
            </td>
            <td><button className="login" 
            onClick={()=>{ricezione.stato = statoDaInviare2; aggiornaStato2()}}
            >RIFIUTA</button></td>
        </tr>

    )
}