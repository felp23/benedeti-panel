import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { ConfigService } from '../config/config.service';

@Injectable({
    providedIn: 'root'
})

export class UserService {

    users: any = [];
    newUser: any = {};
    selectedUser: any = {};
    editedUser: any = {};

    constructor(
		private http: HttpClient,
		public configService: ConfigService
		) { }

    addUser(): Observable<any> {
        let URL = this.configService.baseURL + 'user/add-user';
        return this.http.post<any>(URL, 
        {
            userFirstName: this.newUser.userFirstName,
            userLastName: this.newUser.userLastName,
            userEmail: this.newUser.userEmail,
            userPhone: this.newUser.userPhone,
            userBirthdate: this.newUser.userBirthdate,
            userPasscode: this.newUser.userPasscode,
            userLevel: this.newUser.userLevel
        })
        .pipe(
            tap(data => this.log(data)),
            catchError(this.handleError('users', [])));
    }

    editUser(editedUser): Observable<any> {
        let URL = this.configService.baseURL + 'user/edit-user';
        return this.http.post<any>(URL, 
        {
            userId: editedUser.userId,
            userFirstName: editedUser.userFirstName,
            userLastName: editedUser.userLastName,
            userEmail: editedUser.userEmail,
            userPhone: editedUser.userPhone,
            userBirthdate: editedUser.userBirthdate,
            userPasscode: editedUser.userPasscode,
            userLevel: editedUser.userLevel,
        })
        .pipe(
            tap(data => this.log(data)),
            catchError(this.handleError('users', [])));
    }

    deleteUser(userId): Observable<any> {
        let URL = this.configService.baseURL + 'user/delete-user';
        return this.http.post<any>(URL, 
        {
            userId: userId
        })
        .pipe(
            tap(data => this.log(data)),
            catchError(this.handleError('users', [])));
    }

    getUsers(): Observable<any> {
        let URL = this.configService.baseURL + 'user/users';
        return this.http.post<any>(URL, 
        {})
        .pipe(
            tap(data => this.log(data)),
            catchError(this.handleError('users', [])));
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
