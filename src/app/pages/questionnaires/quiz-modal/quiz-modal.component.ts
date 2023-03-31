import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService, SharedService, ConfigService, StorageService, UserService, QuizService } from 'src/app/services';

@Component({
    selector: 'app-quiz-modal',
    templateUrl: './quiz-modal.component.html',
    styleUrls: ['./quiz-modal.component.scss'],
})

export class QuizModalComponent implements OnInit {

    quizName: string;
    quizDescription: string;
    quizTimeOut: string;
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
        public quizService: QuizService,
        public sharedService: SharedService
        ) { }

    ngOnInit(): void {
        this.authService.checkAuth();
        if (this.quizService.isEditable == true) {
            this.quizName = this.configService.cloneObject(this.quizService.selectedQuiz.quizName);
            this.quizDescription = this.configService.cloneObject(this.quizService.selectedQuiz.quizDescription);
            this.quizTimeOut = this.configService.cloneObject(this.quizService.selectedQuiz.quizTimeOut);
        }
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
        console.log('NewQuiz: ', this.quizService.newQuiz);
		if (!this.quizName) {
			this.customToast(
                'warn',
				'Você precisa inserir um nome válido.',
                'bottom-center'
			);
			return;
		}
        if (this.quizService.isEditable == false) {
            this.quizService.newQuiz.quizName = this.quizName;
            this.quizService.newQuiz.quizDescription = this.quizDescription;
            this.quizService.newQuiz.quizTimeOut = this.configService.formatTimeToFront(this.quizTimeOut);
            console.log('QUIZ: ', this.quizService.newQuiz.quizTimeOut);
		    this.addQuiz();
            this.router.navigateByUrl('/pages/questionnaires');
            return
        }
        if (this.quizService.isEditable == true) {
            this.quizService.selectedQuiz.quizName = this.quizName;
            this.quizService.selectedQuiz.quizDescription = this.quizDescription;
            this.quizService.selectedQuiz.quizTimeOut = this.configService.formatTimeToFront(this.quizTimeOut);
            this.editQuiz(this.quizService.selectedQuiz);
            return
        }
	}

    addQuiz() {
        this.quizService.addQuiz().subscribe(response => 
            {
                console.log('Resposta', response);   
                if (this.quizService.isEditable == false) {
                    if (response.success == true) {
                        this.quizService.newQuiz = {};
                        this.ref.close(this.sharedService.toastAddSuccess());
                    }
                }           
            }
        );
    }

    editQuiz(editedQuiz) {
        this.quizService.editQuiz(editedQuiz).subscribe(response => 
            {
                if (this.quizService.isEditable == true) {
                    if (response.success == true) {
                        this.quizService.newQuiz = {};
                        this.ref.close(this.sharedService.toastAddSuccess());
                    }
                } 
            }
        );
    }

}
