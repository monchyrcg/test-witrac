import { HttpParams } from '@angular/common/http';
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

    addToParam(params: HttpParams, obj) {
        for (const varName in obj) {
            if ((obj[varName] == null || obj[varName].toString().trim() === '')) {
                params = params.append(varName, obj[varName]);
            }
        }

        return params;
    }
}