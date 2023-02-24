import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService, SharedService, ConfigService, StorageService, UserService } from 'src/app/services';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.scss'],
})

export class AddUserComponent implements OnInit {

    selectedState: any;
    toastPosition: '';

    response: any = [];

    dropdownItems = [
        { name: 'Option 1', code: 'Option 1' },
        { name: 'Option 2', code: 'Option 2' },
        { name: 'Option 3', code: 'Option 3' }
    ];
    
    userLevel = [
        { name: 'Administrador', code: 'Option 1' },
        { name: 'Colaborador', code: 'Option 2' }
    ];

    constructor(
        public router: Router,
        public ref: DynamicDialogRef,
        private messageService: MessageService,
        public configService: ConfigService,
        public authService: AuthService,
        public storageService: StorageService,
        public userService: UserService,
        public sharedService: SharedService
    ) { 
    }

    ngOnInit(): void {
    }
    
    close() {
        this.ref.close();
    }

    customToast(style, message, position) {
        this.toastPosition = position;
        this.messageService.add({
            severity: style, 
            summary: message, 
            // detail:'Via MessageService',
            key: 'ct'
        });
    }

	verifyFields() {
        console.log('NewUser: ', this.userService.newUser);
		if (!this.userService.newUser.userFirstname) {
			this.customToast(
                'warn',
				'Você precisa inserir um nome de usuário válido.',
                'bottom-center'
			);
			return;
		}
		if (!this.userService.newUser.userLastname) {
			this.customToast(
                'warn',
				'Você precisa inserir um sobrenome válido.',
                'bottom-center'
			);
			return;
		}
		if (this.configService.validateEmail(this.userService.newUser.userEmail) == false) {
			this.customToast(
                'warn',
				'Você precisa inserir um e-mail válido.',
                'bottom-center'
			);
			return;
		}
		if (!this.userService.newUser.userPasscode) {
			this.customToast(
                'warn',
				'Você precisa inserir uma senha válida.',
                'bottom-center'
			);
			return;
		}
		this.addUser();
	}

    addUser() {
        this.userService.addUser().subscribe(data => 
            this.checkReturn(data)
        );
    }

    checkReturn(response) {
        console.log('Resposta', response);   
        if (response.success == true) {
            this.userService.newUser = {};
            this.ref.close(this.sharedService.toastAddSuccess());
        }
    }

}
