import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ConfigService } from '../config/config.service';

@Injectable({
    providedIn: 'root'
})

export class PublicationService {

    publications: any = [];
	selectedPublication: any = {};
	newPublication: any = {};
	editedPublication: any = {};

	constructor(
		public configService:ConfigService,
		public http: HttpClient,
		public router: Router
		) { }


    uploadImage(formData): Observable<any> {
        let URL = this.configService.baseURL + 'publication/publication-image';
        return this.http.post<any>(URL, formData)
        .pipe(
            tap(data => this.log(data)),
            catchError(this.handleError('publications', [])));
    }

    addPublication(): Observable<any> {
        let URL = this.configService.baseURL + 'publication/add-publication';
        return this.http.post<any>(URL, 
        {
            publicationTitle: this.newPublication.publicationTitle,
            publicationText: this.newPublication.publicationText,
            publicationLink: this.newPublication.publicationLink,
            publicationImageFilename: this.newPublication.publicationImageFilename
        })
        .pipe(
            tap(data => this.log(data)),
            catchError(this.handleError('publications', [])));
    }
        
    editPublication(editedPublication): Observable<any> {
        let URL = this.configService.baseURL + 'publication/edit-publication';
        return this.http.post<any>(URL, 
        {
            publicationId: editedPublication.publicationId,
            publicationTitle: editedPublication.publicationTitle,
            publicationText: editedPublication.publicationText,
            publicationLink: editedPublication.publicationLink,
            publicationImageFilename: editedPublication.publicationImageFilename
        })
        .pipe(
            tap(data => this.log(data)),
            catchError(this.handleError('publications', [])));
    }

    deletePublication(publicationId): Observable<any> {
        let URL = this.configService.baseURL + 'publication/delete-publication';
        return this.http.post<any>(URL, 
        {
            publicationId: publicationId
        })
        .pipe(
            tap(data => this.log(data)),
            catchError(this.handleError('publications', [])));
    }

    getPublciations(): Observable<any> {
        let URL = this.configService.baseURL + 'publication/publications';
        return this.http.post<any>(URL, 
        {})
        .pipe(
            tap(data => this.log(data)),
            catchError(this.handleError('delete-publication', [])));
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
