import { Component, OnInit } from '@angular/core';
// import { Product } from '../../api/product';
// import { User } from '../../api/user';
// import { ProductService } from '../../service/productservice';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddUserComponent } from './add-user/add-user.component';

import { UserService, SharedService, AuthService } from 'src/app/services';
import { Router } from '@angular/router';

import {BreadcrumbModule} from 'primeng/breadcrumb';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    submitted: boolean;
    statuses: any[];

    // ref: DynamicDialogRef;
    cols: any[];
    rowsPerPageOptions = [5, 10, 20];
    users: any = [];
    // user: User[] = [];

    filteredUsers: any = [];

    constructor(
                public router: Router,
                public dialogService: DialogService,
                public userService: UserService,
                public sharedService: SharedService,
                public authService: AuthService
        ) { }

    ngOnInit(): void {
        this.authService.checkAuth();
        this.getUsers();
        console.log('Users: ', this.users);

        this.updateBreadcrumb();
    }

    updateBreadcrumb() {
        this.sharedService.items = [
            {
                label:'Lista de usuários',
                routerLink: ['/pages/users']
            },
        ];
    }

    showAddUserDialog() {
        const ref = this.dialogService.open(AddUserComponent, {
            header: 'Novo usuário',
            width: '70%'
        });

        ref.onClose.subscribe(data => this.getUsers());
    }

    openUserPage(user) {
        this.userService.selectedUser = user;
        console.log("Selected User: ", user);
        this.router.navigateByUrl('/pages/users/user');
    }

	async getUsers() {
		// this.loadingService.presentLoading();
		await this.userService.getUsers()
			.toPromise()
				.then(data => {
					console.log(data);
                    this.users = data;
                    this.filteredUsers = data;
				}, err => {
					console.log(err);
				});
		// this.loadingService.dismissLoading();
	}

    getItems(searchbar) {
        // console.log('Searchbar: ', searchbar.srcElement.value);
        // this.filteredUsers = this.users;
        // var q = searchbar.srcElement.value; 
        // if (!q) {
        //     return;
        // }
        // this.filteredUsers = this.filteredUsers.filter((v) => {
        //     if(v.userFirstname && q) {
        //         if (v.userFirstname.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        //             return true;
        //         }
        //         if (v.userLastname.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        //             return true;
        //         }
        //         return false;
        //     }
        // });
        // console.log(q, this.filteredUsers.length);
    }

    // openNew() {
    //     this.product = {};
    //     this.submitted = false;
    //     this.productDialog = true;
    // }

    // deleteSelectedProducts() {
    //     this.deleteProductsDialog = true;
    // }

    // editProduct(product: Product) {
    //     this.product = {...product};
    //     this.productDialog = true;
    // }

    // deleteProduct(product: Product) {
    //     this.deleteProductDialog = true;
    //     this.product = {...product};
    // }

    // confirmDeleteSelected(){
    //     this.deleteProductsDialog = false;
    //     this.products = this.products.filter(val => !this.selectedProducts.includes(val));
    //     this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
    //     this.selectedProducts = null;
    // }

    // confirmDelete(){
    //     this.deleteProductDialog = false;
    //     this.products = this.products.filter(val => val.id !== this.product.id);
    //     this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
    //     this.product = {};
    // }

    // hideDialog() {
    //     this.productDialog = false;
    //     this.submitted = false;
    // }

    // saveProduct() {
    //     this.submitted = true;

    //     if (this.product.name.trim()) {
    //         if (this.product.id) {
    //             // @ts-ignore
    //             this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value: this.product.inventoryStatus;
    //             this.products[this.findIndexById(this.product.id)] = this.product;
    //             this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
    //         } else {
    //             this.product.id = this.createId();
    //             this.product.code = this.createId();
    //             this.product.image = 'product-placeholder.svg';
    //             // @ts-ignore
    //             this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
    //             this.products.push(this.product);
    //             this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000});
    //         }

    //         this.products = [...this.products];
    //         this.productDialog = false;
    //         this.product = {};
    //     }
    // }

    // findIndexById(id: string): number {
    //     let index = -1;
    //     for (let i = 0; i < this.products.length; i++) {
    //         if (this.products[i].id === id) {
    //             index = i;
    //             break;
    //         }
    //     }

    //     return index;
    // }

    // createId(): string {
    //     let id = '';
    //     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     for (let i = 0; i < 5; i++) {
    //         id += chars.charAt(Math.floor(Math.random() * chars.length));
    //     }
    //     return id;
    // }
}
