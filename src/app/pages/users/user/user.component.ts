import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

import { AuthService, SharedService, ConfigService, StorageService, UserService } from 'src/app/services';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

    allowEdit: boolean = false;

    selectedState:any;
    userLevel = [
        { name: 'Administrador', code: 'Option 1' },
        { name: 'Colaborador', code: 'Option 2' }
    ];

    user: any = {};

    constructor(
        public router: Router,
        private confirmationService: ConfirmationService,
        public configService: ConfigService,
        public authService: AuthService,
        public storageService: StorageService,
        public userService: UserService,
        public sharedService: SharedService
    ) { 
    }

    ngOnInit(): void {
        this.updateBreadcrumb();
        this.user = this.configService.cloneObject(this.userService.selectedUser);
    }

    changeEdit() {
        this.user = this.configService.cloneObject(this.userService.selectedUser);
        this.allowEdit = !this.allowEdit;
    }

    confirm() {
        this.confirmationService.confirm({
            message: 'Tem certeza que deseja apagar esse usuário?',
            accept: () => {
                this.deleteUser();
            }
        });
    }

    editUser() {
        // this.userService.editedUser = this.user;
        // this.userService.editUser().subscribe(data => 
        //     this.checkEditReturn(data)
        // );
    }

    checkEditReturn(response) {
        // console.log('Resposta', response);   
        // if(response.success) {
        //     this.sharedService.toastCustomSuccess('Usuário editado com sucesso');
        //     this.userService.selectedUser = this.userService.editedUser;
        //     this.changeEdit();
        // }
    }

    deleteUser() {
        this.userService.deleteUser().subscribe(data => 
            this.checkDeleteReturn(data)
        );
    }

    checkDeleteReturn(response) {
        console.log('Resposta', response);   
        if(response.success) {
            this.goTo('/pages/users');
        }
    }

    updateBreadcrumb() {
        this.sharedService.items = [
            {
                label:'Lista de usuários',
                routerLink: ['/pages/users']
            },
            {
                label:'Detalhes do usuário',
                routerLink: ['/pages/users/user']
            },
        ];
    }

    goTo(link) {
        this.router.navigateByUrl(link);
    }

}
