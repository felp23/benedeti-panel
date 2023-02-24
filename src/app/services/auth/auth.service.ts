import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ConfigService } from '../config/config.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

	user: any = {}

	constructor(
		public configService: ConfigService,
		public http: HttpClient,
		public router: Router,
        public storageService: StorageService
	) 
    { 
        // this.checkAuth();
    }

	checkAuth() {
		this.storageService.getFromStorage('user')
			.then(data => {
				console.log('checkAuth', data);
				if (data) {
					this.user = data;
                    console.log(this.user);
				} else {
					this.logout();
				}
			}, err => {
				this.router.navigate(['/login'], {replaceUrl: true});
			})
	}

    login(userEmail, userPassword): Observable<any> {
        let URL = this.configService.baseURL + 'auth/login';
        return this.http.post<any>(URL, 
        {   
            userEmail: userEmail, 
            userPassword: userPassword
        })
        .pipe(
            tap(data => this.log(data)),
            catchError(this.handleError('login', [])));
    }

	logout() {
		this.storageService.removeFromStorage('user');
		this.router.navigate(['/login'], {replaceUrl: true});
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
