import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { ConfigService } from '../config/config.service';

@Injectable({
    providedIn: 'root'
})

export class SimulatedService {

    questions: any = [];
    selectedSimulated: any = {};
    simulatedIsStart: boolean = false;
    
    constructor(
		private http: HttpClient,
		public configService: ConfigService
		) { }
    
    addSimulated(newSimulated): Observable<any> {
        let URL = this.configService.baseURL + 'simulated/add-simulated';
        return this.http.post<any>(URL, 
        {
            simulatedTestId: newSimulated.simulatedTestId,
            simulatedUserId: newSimulated.simulatedUserId,
            simulatedChapterId: newSimulated.simulatedChapterId,
            // simulatedIsValid: newSimulated.simulatedIsValid,
        })
        .pipe(
            tap(data => this.log(data)),
            catchError(this.handleError('simulated', [])));
    };

    private log(message: string) {
        console.log(message);
    };

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          console.error(error);
          this.log(`${operation} failed: ${error.message}`);
          return of(result as T);
        };
    };
};
