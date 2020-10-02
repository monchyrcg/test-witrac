import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    clear(obj: any) {
        for (const varName in obj) {
            if ((obj[varName] == null || obj[varName].toString().trim() === '')) {
                delete obj[varName];
            }
        }

        return obj;
    }
}