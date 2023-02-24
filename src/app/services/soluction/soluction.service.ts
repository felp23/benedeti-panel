import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ConfigService } from '../config/config.service';

@Injectable({
    providedIn: 'root'
})

export class SoluctionService {

    soluctions: any = [];
	selectedSoluction: any = {};
	newSoluction: any = {};
	editedSoluction: any = {};

	constructor(
		public configService:ConfigService,
		public http: HttpClient,
		public router: Router
		) { }


    uploadImage(formData): Observable<any> {
        let URL = this.configService.baseURL + 'image/upload-image';
        return this.http.post<any>(URL, formData)
        .pipe(
            tap(data => this.log(data)),
            catchError(this.handleError('images', [])));
    }
    
    addSoluction(): Observable<any> {
        let URL = this.configService.baseURL + 'soluction/add-soluction';
        return this.http.post<any>(URL, 
        {
            soluctionName: this.newSoluction.soluctionName,
            soluctionDescription: this.newSoluction.soluctionDescription,
            soluctionImageFilename: this.newSoluction.soluctionImageFilename,
        })
        .pipe(
            tap(data => this.log(data)),
            catchError(this.handleError('Soluctions', [])));
    }

    editSoluction(editedSoluction): Observable<any> {
        let URL = this.configService.baseURL + 'soluction/edit-soluction';
        return this.http.post<any>(URL, 
        {
            soluctionId: editedSoluction.soluctionId,
            soluctionName: editedSoluction.soluctionName,
            soluctionDescription: editedSoluction.soluctionDescription,
            soluctionImageFilename: editedSoluction.soluctionImageFilename,
        })
        .pipe(
            tap(data => this.log(data)),
            catchError(this.handleError('categories', [])));
    }

    deleteSoluction(ssoluctioneId): Observable<any> {
        let URL = this.configService.baseURL + 'soluction/delete-soluction';
        return this.http.post<any>(URL, 
        {
            soluctionId: ssoluctioneId
        })
        .pipe(
            tap(data => this.log(data)),
            catchError(this.handleError('Soluctions', [])));
    }

    getSoluctions(): Observable<any> {
        let URL = this.configService.baseURL + 'soluction/soluctions';
        return this.http.post<any>(URL, 
        {})
        .pipe(
            tap(data => this.log(data)),
            catchError(this.handleError('soluctions', [])));
    }

    private log(message: string) {
        console.log(message);
    }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          console.error(error);
          this.log(`${operation} failed: ${error.message}`);
          return of(result as T);
        };
    }
}
