import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService, SharedService, ConfigService, StorageService, UserService, QuizService } from 'src/app/services';

@Component({
    selector: 'app-add-quiz',
    templateUrl: './add-quiz.component.html',
    styleUrls: ['./add-quiz.component.scss'],
})

export class AddQuizComponent implements OnInit {

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
        console.log('NewQuiz: ', this.quizService.newQuiz);
		if (!this.quizService.newQuiz.quizName) {
			this.customToast(
                'warn',
				'Você precisa inserir um nome válido.',
                'bottom-center'
			);
			return;
		}
		this.addQuiz();
	}

    addQuiz() {
        this.quizService.addQuiz().subscribe(data => 
            this.checkReturn(data)
        );
    }

    checkReturn(response) {
        console.log('Resposta', response);   
        if (response.success == true) {
            this.quizService.newQuiz = {};
            this.ref.close(this.sharedService.toastAddSuccess());
        }
    }

}
