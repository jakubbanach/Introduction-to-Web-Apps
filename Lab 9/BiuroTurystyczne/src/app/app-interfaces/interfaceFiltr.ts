export interface FilterInterface {
    [key: string]: string|number|null;
    location: string | null;
    priceFrom: number | null;
    priceTo: number | null;
    dateFrom: string | null;
    dateTo: string | null;
    rating: number | null;
  }
