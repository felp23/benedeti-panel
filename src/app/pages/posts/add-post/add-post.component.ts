import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService, SharedService, ConfigService, StorageService, UserService, PostService } from 'src/app/services';
import { AddImageComponent } from '../../shared/add-image/add-image.component';

@Component({
    selector: 'app-add-post',
    templateUrl: './add-post.component.html',
    styleUrls: ['./add-post.component.scss'],
})

export class AddPostComponent implements OnInit {
    
    displayCustom: boolean;
    _activeIndex: number = 2;

    get activeIndex(): number {
        return this._activeIndex;
    }

    set activeIndex(newValue) {
        if (this.images && 0<= newValue && newValue <= this.images.length - 1) {
            this._activeIndex = newValue;
        }
    }

    imageSrc: any;
    fileToUpload: any;
    uploadedFiles: any[] = [];

    selectedState: any;
    toastPosition: '';

    response: any[] = [];
    images: any[];
 
    stateOptions: any[] = [{label: 'Sim', value: '1'}, {label: 'Não', value: '0'}];
    value: string = '0';

    responsiveOptions: any[] = [
        {
            breakpoint: '1500px',
            numVisible: 5
        },
        {
            breakpoint: '1024px',
            numVisible: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    constructor(
        public router: Router,
        public dialogService: DialogService,
        private messageService: MessageService,
        public configService: ConfigService,
        public authService: AuthService,
        public storageService: StorageService,
        public userService: UserService,
        public sharedService: SharedService,
        public postService: PostService,
        private http: HttpClient
        ) { }

    ngOnInit(): void {
        this.authService.checkAuth();
        this.updateBreadcrumb();
    }

    addPost() {
        this.postService.newPost.postCarousel = this.value;
        if (this.images) {
            this.postService.newPost.postImages = JSON.stringify(this.images);
        }
        this.postService.newPost.postDescription = this.postService.newPost.postDescription.replace(/\\/g, '');
        console.log('NewPost: ', this.postService.newPost);
        this.postService.addPost().subscribe(response => {
            console.log('Resposta: ', response);
            if (response.success) {
                this.router.navigateByUrl('/pages/posts');
                this.sharedService.toastCustomSuccess('Post adicionado com sucesso');
            }
        })
    }

    showAddImage() {
        const ref = this.dialogService.open(AddImageComponent, {
            header: "Selecione uma imagem",
            width: "50%"
        });
        ref.onClose.subscribe(response => {
            this.getImages(response);
        });
    }
    
    removeItemFromArray(filename: string) {
        const newArray = this.images.filter((item) => item.postImageFilename !== filename);
        this.images = newArray;
        console.log('NOVO ARRAY: ', this.images);
        this.displayCustom = false;
    }

    getImages(response) {
        this.images = this.configService.cloneObject(response);
        console.log('IMAGENS: ', this.images);
        for (let image of this.images) {
            image.imageSrc = this.configService.imageURL + image.postImageFilename;
            image.imageSrc = image.imageSrc.toString();
            console.log('IMAGEM: ', image.imageSrc);
        }
    }

    imageClick(index: number) {
        this.activeIndex = index;
        this.displayCustom = true;
    }

    updateBreadcrumb() {
        this.sharedService.items = [
            {
                label:'Lista de serviços',
                routerLink: ['/pages/posts']
            },
            {
                label:'Adicionar novo serviço',
                routerLink: ['/pages/posts/add-post']
            },
        ];
    }

    // onUpload(event: any) {
    //     console.log('Event IMAGE: ',event);
    //     for(let file of event.files) {
    //         this.uploadedFiles.push(file);
    //     }

    //     this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
    // }

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
		if (!this.userService.newUser.userFirstName) {
			this.customToast(
                'warn',
				'Você precisa inserir um nome de usuário válido.',
                'bottom-center'
			);
			return;
		}
		if (!this.userService.newUser.userLastName) {
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
		if (!this.userService.newUser.userPasscode || !this.userService.newUser.userConfirmPasscode) {
			this.customToast(
                'warn',
				'Você precisa inserir uma senha válida.',
                'bottom-center'
			);
			return;
		}
		if (this.userService.newUser.userPasscode != this.userService.newUser.userConfirmPasscode) {
			this.customToast(
                'warn',
				'A senhas não são idênticas.',
                'bottom-center'
			);
			return;
		}
		// this.addUser();
	}

}
