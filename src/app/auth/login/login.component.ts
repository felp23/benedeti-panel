import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../../service/app.config.service';
import { AppConfig } from '../../api/appconfig';
import { Subscription } from 'rxjs';
import { AuthService, SharedService, StorageService, UserService } from 'src/app/services';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles:[`
        :host ::ng-deep .p-password input {
        width: 100%;
        padding:1rem;
        }

        :host ::ng-deep .pi-eye{
        transform:scale(1.6);
        margin-right: 1rem;
        color: var(--primary-color) !important;
        }

        :host ::ng-deep .pi-eye-slash{
        transform:scale(1.6);
        margin-right: 1rem;
        color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent implements OnInit, OnDestroy {

    valCheck: string[] = ['remember'];

    password: string;
    
    config: AppConfig;
    
    subscription: Subscription;

    userEmail: any;
    userPasscode: any;

    constructor(
        private location: Location,
		public authService: AuthService,
        private messageService: MessageService,
        public configService: ConfigService,
        public router: Router,
        public userService: UserService,
        public storageService: StorageService,
        public sharedService: SharedService
        ){ }

    ngOnInit(): void {
        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(config => {
        this.config = config;
        });
    }

    ngOnDestroy(): void {
        if(this.subscription){
        this.subscription.unsubscribe();
        }
    }

    login() {
        let response: any;
        this.authService.login(this.userEmail, this.userPasscode).subscribe(data => 
            {
                console.log('Resposta', data);   
                if (data.error == false) {
                    console.log('OK');   
                    let user: any = {};
                    user = data.user;
                    user.userPasscode = "";
                    console.log('User', user);   
                    if (user.userLevel == 1) {
                        this.messageService.add(
                            {
                                severity:'success', 
                                summary: 'Sucesso!', 
                                detail: 'Você será redirecionado.'
                            }
                        );
                        this.authService.user = user;
                        this.storageService.sendToStorage('admin', user);
                        this.router.navigateByUrl('/pages/dashboard');
                    }
                    if (user.userLevel != 1) {
                        this.messageService.add(
                            {
                                severity:'error', 
                                summary: 'Atenção!', 
                                detail: 'Você não tem acesso a esse painel.'
                            }
                        );
                        window.location.href = 'https://www.google.com.br';
                        // window.location.reload();
                    }
                }
                if (data.error == true) {
                    this.messageService.add(
                        {
                            severity:'error', 
                            summary: 'Atenção!', 
                            detail: 'E-mail ou senha estão incorretos.'
                        }
                    );
                    console.log('ERRO');   
                }
            }
        );
    }
}
