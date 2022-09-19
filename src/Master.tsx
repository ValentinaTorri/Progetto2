import React, { useState } from "react";
import { InserisciPreventivo } from "./InserisciPreventivo";
import { AreaRiservata } from "./AreaRiservata";
import { Tabella } from "./Tabella";
import { Tabella2 } from "./Tabella";
import { IPreventivo } from "./interfacce";
import './Master.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from 'react-router-dom'



export const Master = () => {

    let preventiviRicevuti: any = localStorage.getItem('archivioPreventivi')
    let arrayPreventivi: Array<IPreventivo> = JSON.parse(preventiviRicevuti)
    const [preventiviletti, setPreventiviletti] = useState<Array<IPreventivo>>(arrayPreventivi)


    console.log(arrayPreventivi)


    return (
        <div>
            <header>
                <h1>ASSICURAZIONE</h1>
            </header>

            <BrowserRouter>
                <nav >
                    <Link className='link' to='/InserisciPreventivo'>Crea preventivo</Link>
                    <Link className='link' to='/AreaRiservata'>Area riservata</Link>
                </nav>

                <Routes>
                    <Route path="InserisciPreventivo" element={<InserisciPreventivo></InserisciPreventivo>}></Route>
                    <Route path="AreaRiservata" element={<AreaRiservata></AreaRiservata>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )

}