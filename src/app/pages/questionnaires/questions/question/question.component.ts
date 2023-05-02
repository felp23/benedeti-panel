import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { AnswerService, AuthService, ConfigService, QuestionService, SharedService } from 'src/app/services';
import { AddAnswerComponent } from '../add-answer/add-answer.component';
import { AnswerComponent } from '../answer/answer.component';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss']
})

export class QuestionComponent implements OnInit {

    toastPosition: '';

    filteredQuestions: any = [];
    cols: any[];

    answers: any = [];
    filteredAnswers: any = [];

    isEditable: boolean = false;
    editedQuestion: any = [];

    questionnaires: any = [];
    filteredQuestionnaires: any = [];
    selectedQuestionnaires: any[] = [];
    selectedQuiz: any;

    options = [
        { label: 'Muito fácil', value: 1 },
        { label: 'Fácil', value: 2 },
        { label: 'Médio', value: 3 },
        { label: 'Dificil', value: 4 },
        { label: 'Muito dificil', value: 5 }
    ];

    selectedOption: boolean;

    constructor(
        public router: Router,
        private confirmationService: ConfirmationService,
        public messageService: MessageService,
        public sharedService: SharedService,
        public questionService: QuestionService,
        public configService: ConfigService,
        public dialogService: DialogService,
        public answerService: AnswerService,
        public authService: AuthService,
        ) { }

    ngOnInit(): void {
        this.authService.checkAuth();
        this.editedQuestion = this.configService.cloneObject(this.questionService.selectedQuestion);
        this.updateBreadcrumb();
        this.getAnswersByQuestion();
        if (this.editedQuestion == false) {
            this.router.navigateByUrl('/pages/questions')
        }
    }

    updateBreadcrumb() {
        this.sharedService.items = [
            {
                label:'Lista de questionários',
                routerLink: ['/pages/questionnaires']
            },
            {
                label:'Detalhes do quiz',
                routerLink: ['/pages/quiz']
            },
            {
                label:'Detalhes pergunta'
            },
        ];
    }

    showAnswerDialog(event) {
        this.answerService.selectedAnswer = event;
        const ref = this.dialogService.open(AnswerComponent, {
            header: 'Detalhes da resposta',
        });

        ref.onClose.subscribe(data => this.getAnswersByQuestion());
    }

    confirmQuestionDelete(event: Event) {
        console.log ('Event 001', event);
        this.confirmationService.confirm({
            target: event.target,
            message: 'Tem certeza que deseja apagar essa questão?',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => {
                this.questionService.deleteQuestion(this.editedQuestion.questionId).subscribe(response => 
                    {
                        console.log('Resposta', response);   
                        if (response.success == true) {
                            this.answerService.selectedAnswer = {};
                            // this.sharedService.toastAddSuccess();
                            this.router.navigateByUrl('/pages/questions');
                        }
                    }
                );
            },
            reject: () => {
                //reject action
            }
        });
    }

    confirmAnswerDelete(event: Event, answer: any) {
        console.log ('Event 001', event);
        this.confirmationService.confirm({
            target: event.target,
            message: 'Tem certeza que deseja apagar essa resposta?',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => {
                console.log('Excluir resoista:', event);
                this.answerService.deleteAnswerById(answer.answerId).subscribe(response => {
                    console.log("REMOVE ANSWERS BY ID: ", response);            
                    if (response.success == true) {
                        this.getAnswersByQuestion();
                    }
                })
            },
            reject: () => {
                //reject action
            }
        });
    }

    showAddAnswerDialog() {
        this.questionService.selectedQuestion = this.configService.cloneObject(this.editedQuestion);
        console.log("Selected Question: ", this.editedQuestion.questionId);
        const ref = this.dialogService.open(AddAnswerComponent, {
            header: 'Adicionar resposta',
        });

        ref.onClose.subscribe(data => {
            console.log('DATA: ', data)
            if (data == true) {
                console.log("Selected Question: ", this.editedQuestion.questionId);
                this.filteredAnswers = [];
                this.getAnswersByQuestion();
            }
        });
    }

	getAnswersByQuestion() {
		// this.loadingService.presentLoading();
        console.log("Selected Question: ", this.editedQuestion.questionId);
		this.answerService.getAnswersByQuestion(this.editedQuestion.questionId).subscribe(response => {
            console.log(response);
            this.answers = response;
            for (let answer of this.answers) {
                if (answer.answerIsCorrect == "true") {
                    answer.answerIsCorrectF = 'Sim'
                }
                if (answer.answerIsCorrect == "false") {
                    answer.answerIsCorrectF = 'Não'
                }
            }
            this.filteredAnswers = this.configService.cloneObject(this.answers);
            console.log(this.filteredAnswers);
        })
		// this.loadingService.dismissLoading();
	}

    filterQuestionnaires(event) {
        let filtered: any[] = [];
        let query = event.query;

        for (let i = 0; i < this.questionnaires.length; i++) {
            let quiz = this.questionnaires[i];
            if (quiz.quizName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(quiz);
            }
        }

        this.filteredQuestionnaires = filtered;
        console.log('QUESTIONARIOS FILTRADOS: ',  this.filteredQuestionnaires)
    }

    deleteAnswerById(event: any) {
    }

}
