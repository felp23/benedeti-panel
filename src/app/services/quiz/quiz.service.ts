import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { ConfigService } from '../config/config.service';

@Injectable({
    providedIn: 'root'
})

export class QuizService {

    questionnaires: any = [];
    newQuiz: any = {};
    selectedQuiz: any = {};
    isEditable: boolean = false;

    constructor(
		private http: HttpClient,
		public configService: ConfigService
		) { }

    addQuiz(): Observable<any> {
        let URL = this.configService.baseURL + 'quiz/add-quiz';
        return this.http.post<any>(URL, 
        {
            quizName: this.newQuiz.quizName,
            quizDescription: this.newQuiz.quizDescription,
            quizTimeOut: this.newQuiz.quizTimeOut,
        })
        .pipe(
            tap(data => this.log(data)),
            catchError(this.handleError('questionnaires', [])));
    }

    editQuiz(editedQuiz): Observable<any> {
        let URL = this.configService.baseURL + 'quiz/edit-quiz';
        return this.http.post<any>(URL, 
        {
            quizId: editedQuiz.quizId,
            quizName: editedQuiz.quizName,
            quizDescription: editedQuiz.quizDescription
        })
        .pipe(
            tap(data => this.log(data)),
            catchError(this.handleError('tests', [])));
    }

    deleteQuiz(quizId): Observable<any> {
        let URL = this.configService.baseURL + 'quiz/delete-quiz';
        return this.http.post<any>(URL, 
        {
            quizId: quizId
        })
        .pipe(
            tap(data => this.log(data)),
            catchError(this.handleError('tests', [])));
    }

    getQuestionnaires(): Observable<any> {
        let URL = this.configService.baseURL + 'quiz/questionnaires';
        return this.http.post<any>(URL, 
        {})
        .pipe(
            tap(data => this.log(data)),
            catchError(this.handleError('tests', [])));
    }

    editUser(editedUser): Observable<any> {
        let URL = this.configService.baseURL + 'user/edit-user.php';
        return this.http.post<any>(URL, 
        {
            userId: editedUser.userId,
            userFirstName: editedUser.userFirstName,
            userLastName: editedUser.userLastName,
            userEmail: editedUser.userEmail,
            userPasscode: editedUser.userPasscode,
            userPhone: editedUser.userPhone,
            userDocument: editedUser.userDocument,
        })
        .pipe(
            tap(data => this.log(data)),
            catchError(this.handleError('users', [])));
    }

    // deleteUser(): Observable<any> {
    //     let URL = this.configService.baseURL + 'user/delete-user.php';
    //     return this.http.post<any>(URL, 
    //     {
    //         userId: this.selectedUser.userId
    //     })
    //     .pipe(
    //         tap(data => this.log(data)),
    //         catchError(this.handleError('users', [])));
    // }

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
