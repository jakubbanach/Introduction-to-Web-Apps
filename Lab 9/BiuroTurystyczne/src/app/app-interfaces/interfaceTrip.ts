export interface Trip {
    [key: string]: any;
    id: number;
    nazwa: string;
    docelowy_kraj: string;
    data_rozpoczecia: string;
    data_zakonczenia: string;
    cena: number;
    miejsca: number;
    opis: string;
    zdjecie: string;
    // ocena: number;
    // recenzja: string[];
  }