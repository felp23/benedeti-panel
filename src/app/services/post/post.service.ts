import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ConfigService } from '../config/config.service';

@Injectable({
    providedIn: 'root'
})

export class PostService {

    posts: any = [];
	selectedWork: any = [];
    selectedSubwork: any = [];
	newPost: any = [];
	editedWork: any = [];
    workImages: any = {}
    postImages: any = [];

	constructor(
		public configService:ConfigService,
		public http: HttpClient,
		public router: Router
		) { }

    addPost(): Observable<any> {
        let URL = this.configService.baseURL + 'post/add-post';
        return this.http.post<any>(URL, 
        {
            postTitle: this.newPost.postTitle,
            postDescription: this.newPost.postDescription,
            postImages: this.newPost.postImages,
            postCarousel: this.newPost.postCarousel,
        })
        .pipe(
            tap(data => this.log(data)),
            catchError(this.handleError('works', [])));
    }

    getPosts(): Observable<any> {
        let URL = this.configService.baseURL + 'post/posts';
        return this.http.post<any>(URL, 
        {})
        .pipe(
            tap(data => this.log(data)),
            catchError(this.handleError('posts', [])));
    }

    uploadImage(image): Observable<any> {

        const formData = new FormData();
        formData.append('imagem', image);

        let URL = this.configService.baseURL + 'image/upload-image';
        return this.http.post<any>(URL, formData)
        .pipe(
            tap(data => this.log(data)),
            catchError(this.handleError('works', [])));
    }

    editworkQuestionId(questionId): Observable<any> {
        let URL = this.configService.baseURL + 'work/edit-work-question-id';
        return this.http.post<any>(URL, 
        {
            workQuestionId: questionId,
        })
        .pipe(
            tap(data => this.log(data)),
            catchError(this.handleError('works', [])));
    }

    deletework(workId): Observable<any> {
        let URL = this.configService.baseURL + 'work/delete-work';
        return this.http.post<any>(URL, 
        {
            workId: workId,
        })
        .pipe(
            tap(data => this.log(data)),
            catchError(this.handleError('works', [])));
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
