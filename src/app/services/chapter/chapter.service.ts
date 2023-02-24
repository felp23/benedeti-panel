import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ConfigService } from '../config/config.service';

@Injectable({
    providedIn: 'root'
})

export class ChapterService {

    chapters: any = [];
	selectedChapter: any = [];
    selectedSubChapter: any = [];
	newChapter: any = [];
	editedChapter: any = [];

	constructor(
		public configService:ConfigService,
		public http: HttpClient,
		public router: Router
		) { }


    addChapter(): Observable<any> {
        let URL = this.configService.baseURL + 'chapter/add-chapter';
        return this.http.post<any>(URL, 
        {
            chapterName: this.newChapter.chapterName,
            chapterTestId: this.newChapter.chapterTestId
        })
        .pipe(
            tap(data => this.log(data)),
            catchError(this.handleError('chapters', [])));
    }

    editChapter(editedChapter): Observable<any> {
        let URL = this.configService.baseURL + 'chapter/edit-chapter';
        return this.http.post<any>(URL, 
        {
            chapterId: editedChapter.chapterId,
            chapterName: editedChapter.chapterName
        })
        .pipe(
            tap(data => this.log(data)),
            catchError(this.handleError('chapters', [])));
    }

    deleteChapter(chapterId): Observable<any> {
        let URL = this.configService.baseURL + 'chapter/delete-chapter';
        return this.http.post<any>(URL, 
        {
            chapterId: chapterId
        })
        .pipe(
            tap(data => this.log(data)),
            catchError(this.handleError('chapters', [])));
    }

    getChaptersByTest(chapterTestId): Observable<any> {
        let URL = this.configService.baseURL + 'chapter/chapters-by-test';
        return this.http.post<any>(URL, 
        {
            chapterTestId: chapterTestId
        })
        .pipe(
            tap(data => this.log(data)),
            catchError(this.handleError('chapters', [])));
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
