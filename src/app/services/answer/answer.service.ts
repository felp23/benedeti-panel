import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ConfigService } from '../config/config.service';

@Injectable({
    providedIn: 'root'
})

export class AnswerService {

    answers: any = [];
	selectedAnswer: any = [];
    selectedSubAnswer: any = [];
	newAnswer: any = [];
	editedAnswer: any = [];

	constructor(
		public configService:ConfigService,
		public http: HttpClient,
		public router: Router
		) { }

    addAnswer(): Observable<any> {
        let URL = this.configService.baseURL + 'answer/add-answer';
        return this.http.post<any>(URL, 
        {
            answerQuizId: this.newAnswer.answerQuizId,
            answerQuestionId: this.newAnswer.answerQuestionId,
            answerDescription: this.newAnswer.answerDescription,
            answerIsCorrect: this.newAnswer.answerIsCorrect,
        })
        .pipe(
            tap(data => this.log(data)),
            catchError(this.handleError('Answers', [])));
    }

    editAnswer(editedAnswer): Observable<any> {
        let URL = this.configService.baseURL + 'answer/edit-answer';
        return this.http.post<any>(URL, 
        {
            answerId: editedAnswer.answerId,
            answerDescription: editedAnswer.answerDescription,
            answerIsCorrect: editedAnswer.answerIsCorrect,
        })
        .pipe(
            tap(data => this.log(data)),
            catchError(this.handleError('Answers', [])));
    }

    editAnswerQuestionId(questionId): Observable<any> {
        let URL = this.configService.baseURL + 'answer/edit-answer-question-id';
        return this.http.post<any>(URL, 
        {
            answerQuestionId: questionId,
        })
        .pipe(
            tap(data => this.log(data)),
            catchError(this.handleError('Answers', [])));
    }

    deleteAnswer(answerId): Observable<any> {
        let URL = this.configService.baseURL + 'answer/delete-answer';
        return this.http.post<any>(URL, 
        {
            answerId: answerId,
        })
        .pipe(
            tap(data => this.log(data)),
            catchError(this.handleError('Answers', [])));
    }

    getAnswersByQuestion(answerQuestionId): Observable<any> {
        let URL = this.configService.baseURL + 'answer/answers-by-question';
        return this.http.post<any>(URL, 
        {
            answerQuestionId: answerQuestionId
        })
        .pipe(
            tap(data => this.log(data)),
            catchError(this.handleError('answers', [])));
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
