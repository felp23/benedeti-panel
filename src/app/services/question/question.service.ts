import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ConfigService } from '../config/config.service';

@Injectable({
    providedIn: 'root'
})

export class QuestionService {

    questions: any = [];
	selectedQuestion: any = [];
    selectedSubQuestion: any = [];
	newQuestion: any = [];
	editedQuestion: any = [];

	constructor(
		public configService:ConfigService,
		public http: HttpClient,
		public router: Router
		) { }

	addQuestion(): Observable<any> {
		let URL = this.configService.baseURL + 'question/add-question';
		return this.http.post<any>(URL, 
		{
			questionTestId: this.newQuestion.questionTestId,
			// questionChapterId: this.newQuestion.questionChapterId,
			questionDescription: this.newQuestion.questionDescription,
			questionDifficulty: this.newQuestion.questionDifficulty,
		})
		.pipe(
			tap(data => this.log(data)),
			catchError(this.handleError('questions', [])));
	};

    editQuestion(editedQuestion): Observable<any> {
        let URL = this.configService.baseURL + 'question/edit-question';
        return this.http.post<any>(URL, 
        {
            questionId: editedQuestion.questionId,
			questionTestId: editedQuestion.questionTestId,
            // questionChapterId: editedQuestion.questionChapterId,
            questionDescription: editedQuestion.questionDescription,
            questionDifficulty: editedQuestion.questionDifficulty,
        })
        .pipe(
            tap(data => this.log(data)),
            catchError(this.handleError('questions', [])));
    };

    deleteQuestion(editedQuestion): Observable<any> {
        let URL = this.configService.baseURL + 'question/delete-question';
        return this.http.post<any>(URL, 
        {
            questionId: editedQuestion.questionId,
        })
        .pipe(
            tap(data => this.log(data)),
            catchError(this.handleError('questions', [])));
    };

    getQuestionsByTest(questionTestId): Observable<any> {
        let URL = this.configService.baseURL + 'question/questions-by-test';
        return this.http.post<any>(URL, 
        {
            questionTestId: questionTestId
        })
        .pipe(
            tap(data => this.log(data)),
            catchError(this.handleError('questions', [])));
    };

    // getQuestionsByChapter(questionChapterId): Observable<any> {
    //     let URL = this.configService.baseURL + 'question/questions-by-chapter';
    //     return this.http.post<any>(URL, 
    //     {
    //         questionChapterId: questionChapterId
    //     })
    //     .pipe(
    //         tap(data => this.log(data)),
    //         catchError(this.handleError('questions', [])));
    // };
	
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