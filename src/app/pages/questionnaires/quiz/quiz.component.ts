import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

import { AuthService, SharedService, ConfigService, StorageService, UserService, QuizService } from 'src/app/services';
import { QuizModalComponent } from '../quiz-modal/quiz-modal.component';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss']
})

export class QuizComponent implements OnInit {

    allowEdit: boolean = false;

    selectedState:any;
    userLevel = [
        { name: 'Administrador', code: 'Option 1' },
        { name: 'Colaborador', code: 'Option 2' }
    ];

    quiz: any = {};

    constructor(
        public router: Router,
        public dialogService: DialogService,
        private confirmationService: ConfirmationService,
        public configService: ConfigService,
        public authService: AuthService,
        public storageService: StorageService,
        public userService: UserService,
        public sharedService: SharedService,
        public quizService: QuizService,
        private messageService: MessageService,
        ) { }

    ngOnInit(): void {
        this.authService.checkAuth();
        this.updateBreadcrumb();
        this.quiz = this.configService.cloneObject(this.quizService.selectedQuiz);
        if (this.quiz.quizStart == null) {
            this.quiz.quizStart = 0
        }
        if (this.quiz.quizFinish == null) {
            this.quiz.quizFinish = 0
        }
    }

    changeEdit() {
        this.quiz = this.configService.cloneObject(this.quizService.selectedQuiz);
        this.allowEdit = !this.allowEdit;
    }

    confirmDelete() {
        this.confirmationService.confirm({
            target: event.target,
            message: 'Tem certeza que deseja apagar esse Quiz?',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => {
                this.deleteQuiz();
            },
            reject: () => {
                //reject action
            }
        });
        // this.confirmationService.confirm({
        //     message: 'Tem certeza que deseja apagar esse usuário?',
        //     accept: () => {
        //         this.deleteUser();
        //     }
        // });
    }

    showEditQuizDialog() {
        this.quizService.isEditable = true;
        const ref = this.dialogService.open(QuizModalComponent, {
            header: 'Editar questionário',
            width: '32%'
        });

        ref.onClose.subscribe(data => 
            this.quiz = this.quizService.selectedQuiz
        );
    }


    checkEditReturn(response) {
        // console.log('Resposta', response);   
        // if(response.success) {
        //     this.sharedService.toastCustomSuccess('Usuário editado com sucesso');
        //     this.userService.selectedUser = this.userService.editedUser;
        //     this.changeEdit();
        // }
    }

    deleteQuiz() {
        this.quizService.deleteQuiz(this.quizService.selectedQuiz.quizId).subscribe(data => 
            {
                console.log('Resposta', data);   
                if(data.success) {
                    this.goTo('/pages/questionnaires');
                }
            }
        );
    }

    updateBreadcrumb() {
        this.sharedService.items = [
            {
                label:'Lista de questionários',
                routerLink: ['/pages/questionnaires']
            },
            {
                label:'Detalhes do Quiz',
                routerLink: ['/pages/questionnaires/quiz']
            },
        ];
    }

    goTo(link) {
        this.router.navigateByUrl(link);
    }

}
