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
        { name: 'Administrador', value: 1 },
        { name: 'Colaborador', value: 2 }
    ];

    selectedUser: any = {};

    constructor(
        public router: Router,
        private confirmationService: ConfirmationService,
        public configService: ConfigService,
        public authService: AuthService,
        public storageService: StorageService,
        public userService: UserService,
        public sharedService: SharedService
        ) { }

    ngOnInit(): void {
        this.authService.checkAuth();
        this.updateBreadcrumb();
        this.selectedUser = this.configService.cloneObject(this.userService.selectedUser);
    }

    changeEdit() {
        this.selectedUser = this.configService.cloneObject(this.userService.selectedUser);
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
        this.selectedUser.userLevel = this.selectedUser.userLevel.value;
        this.userService.editUser(this.selectedUser).subscribe(data => 
            this.checkEditReturn(data)
        );
    }

    checkEditReturn(response) {
        console.log('Resposta', response);   
        if(response.success) {
            this.sharedService.toastCustomSuccess('Usuário editado com sucesso');
            this.userService.selectedUser = this.userService.editedUser;
            this.changeEdit();
        }
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
