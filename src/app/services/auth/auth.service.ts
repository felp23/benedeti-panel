import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ConfigService } from '../config/config.service';
import { StorageService } from '../storage/storage.service';
import { Location } from '@angular/common';
import { SharedService } from '../shared/shared.service';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

	user: any = {}

	constructor(
		public configService: ConfigService,
		public http: HttpClient,
		public router: Router,
        public storageService: StorageService,
        public sharedService: SharedService,
        private location: Location
	) 
    { 
        this.checkAuth();
    }

	checkAuth() {
        var currentUrl: any = this.location.path();
        console.log(currentUrl);
		this.storageService.getFromStorage('admin')
			.then(data => {
				console.log('checkAuth', data);
				if (!data) {
                    console.log('Off', data);
                    this.logout();
				} 
                if (data) {
					this.user = data;
                }
			}, err => {
				this.router.navigate(['/auth/login'], {replaceUrl: true});
			})
	}

    logout() {
        this.user = {};
        this.storageService.removeFromStorage('admin');
        this.router.navigateByUrl('/auth/login');
    }

    login(userEmail, userPasscode): Observable<any> {
        let URL = this.configService.baseURL + 'auth/login';
        return this.http.post<any>(URL, 
        {   
            userEmail: userEmail, 
            userPasscode: userPasscode
        })
        .pipe(
            tap(data => this.log(data)),
            catchError(this.handleError('login', [])));
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
