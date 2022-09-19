export interface IPreventivo {
    id: number,
    targa: string,
    cilindrata: number,
    costoIniz: number,
    interesse: number,
    costoFin: number,
    stato: number          // 0= in attesa di risposta, 1= accettato, 2= rifiutato,  
}

export interface IAdmin {
    username: string,
    password: string
}

export interface IPrezzo {
    preventivoDaInviare: IPreventivo,
    importo: number,
    aggiornaSaldo: (arg: number) => void
}

export interface IRiga {
    ricezione: IPreventivo,
    statoDaInviare1: number,
    statoDaInviare2: number,
    aggiornaStato: () => void,
    aggiornaStato2: () => void, 
    costoDaInviare:number,
    aggiornaSaldo: (arg: number) => void
}