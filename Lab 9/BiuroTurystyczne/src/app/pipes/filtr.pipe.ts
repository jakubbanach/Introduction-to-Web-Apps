import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from '../app-interfaces/interfaceTrip';
import { FilterInterface } from '../app-interfaces/interfaceFiltr';

@Pipe({
    name: 'filterPipe',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(trips: Trip[], filters: FilterInterface): Trip[] {
        if (!trips) return [];
      
        return trips.filter(trip => {
          return Object.keys(filters).every(key => {
            const filterValue = filters[key];
            let newValue: any;
            // console.log(filterValue, "aaa", key);
            if (filterValue === null || filterValue === undefined || filterValue === "") {
                return true;
            }
            if (typeof filterValue === 'string'){
                newValue = filterValue.toLowerCase();
            }
            else{
                newValue = filterValue;
            }
            // console.log("TRIP FILTER", key, newValue);

            switch (key) {
                case 'location':
                    return trip.docelowy_kraj.toLowerCase().includes(newValue);
                case 'priceFrom':
                    return newValue <= trip.cena;
                case 'priceTo':
                    return newValue >= trip.cena;                
                case 'dateFrom':
                  return trip.data_rozpoczecia >= newValue;
                case 'dateTo':
                      return trip.data_zakonczenia <= newValue;
                case 'rating':
                    // TODO
                  return true;
                default:
                  throw new Error('Invalid key');
              }
          });
        });
      }
}
