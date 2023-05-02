import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AnswerService, AuthService, ConfigService, QuestionService, QuizService, SharedService } from 'src/app/services';
import { AddAnswerComponent } from '../add-answer/add-answer.component';
import { AnswerComponent } from '../answer/answer.component';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-add-question',
    templateUrl: './add-question.component.html',
    styleUrls: ['./add-question.component.scss'],
    providers: [MessageService]
})

export class AddQuestionComponent implements OnInit {

    toastPosition: '';

    filteredQuestions: any = [];
    cols: any[];

    answers: any = [];
    filteredAnswers: any = [];

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
        private messageService: MessageService,
        public questionService: QuestionService,
        public sharedService: SharedService,
        public answerService: AnswerService,
        public dialogService: DialogService,
        public quizService: QuizService,
        public router: Router,
        public authService: AuthService,
        public configService: ConfigService
        ) { }

    ngOnInit(): void {
        this.questionService.newQuestion = {};
        this.answerService.newAnswer = {};
        this.authService.checkAuth();
        this.deleteAnswerByQyestuion();
        this.updateBreadcrumb();
        this.getQuestionnaires();
    }

    addQuiz() {
        console.log('CLICK', this.selectedQuestionnaires)
        var array = [];
        array =  this.configService.cloneObject(this.selectedQuestionnaires);
        for (let a of array) {
            if (a.quizId == this.selectedQuiz.quizId) {
                console.log('Esse quiz já foi selecionado.');
                this.messageService.add({ key: 'bc', severity: 'warn', summary: 'Atenção', detail: 'Esse quiz já foi selecionado!' });
                return
            }
        }
        array.push(this.selectedQuiz);
        this.selectedQuestionnaires = this.configService.cloneObject(array);
        console.log('QUESTIONNAIRES', this.selectedQuestionnaires);
        this.selectedQuiz = {};
    }

    removeQuiz(event: any) {
        console.log("ITEM: ", event);
        var array = [];
        array =  this.configService.cloneObject(this.selectedQuestionnaires);
        console.log("ARRAY BEFORE: ", array);
        array = array.filter(quiz => quiz.quizId !== event.quizId);
        console.log("ARRAY AFTER: ", array);
        this.selectedQuestionnaires = this.configService.cloneObject(array);
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

    updateBreadcrumb() {
        this.sharedService.items = [
            {
                label:'Lista de questionários',
                routerLink: ['/pages/questionnaires']
            },
            {
                label:'Adicionar pergunta',
                routerLink: ['/pages/add-quiz']
            },
        ];
    }

    getQuestionnaires() {
        this.quizService.getQuestionnaires().subscribe(response =>
            {
                this.quizService.questionnaires = response;
                this.questionnaires = response;
                console.log("QUESTIONARIOS: ", this.quizService.questionnaires);
            }
        )
    }

    addQuestion() {
        for (let quiz of this.selectedQuestionnaires) {
            this.questionService.newQuestion.questionQuestionnairesId = this.selectedQuestionnaires.map(quiz => quiz.quizId);
        }
        console.log('Nova resposta:', this.questionService.newQuestion.questionQuestionnairesId);
        // this.questionService.newQuestion.questionDescription = this.questionService.newQuestion.questionDescription.toString();
        this.questionService.addQuestion().subscribe(data => 
           {
                console.log('Resposta', data);   
                if (data.success == true) {
                    this.editAnswersQuestionId(data.data.questionId);
                    this.messageService.add({ key: 'bc', severity: 'success', summary: 'Sucesso', detail: 'Questão adicionada com sucesso!' });
                    this.questionService.newQuestion = {};
                }
            }
        );
    }

    editAnswersQuestionId(questionId) {
        // this.questionService.newQuestion.questionQuizId = this.quizService.selectedQuiz.quizId;
        console.log('ID:', questionId);
        this.answerService.editAnswerQuestionId(questionId).subscribe(data => 
            {
                console.log('Resposta', data);   
                if (data.success == true) {
                    this.questionService.newQuestion = {};
                    this.answerService.newAnswer = {};
                    this.router.navigateByUrl('/pages/questions');
                }
            }
        );
    } 

    showAddAnswerDialog() {
        const ref = this.dialogService.open(AddAnswerComponent, {
            header: 'Adicionar resposta',
        });

        ref.onClose.subscribe(data => this.getAnswersByIdZero());
    }

    showAnswerDialog(event) {
        this.answerService.selectedAnswer = event;
        const ref = this.dialogService.open(AnswerComponent, {
            header: 'Detalhes da resposta',
        });

        ref.onClose.subscribe(data => this.getAnswersByIdZero());
    }

	async getAnswersByIdZero() {
		// this.loadingService.presentLoading();
        this.answers = [];
		await this.answerService.getAnswersByQuestion(0).subscribe(response => {
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
            this.filteredAnswers = this.answers;
            console.log(this.filteredAnswers);
        })
		// this.loadingService.dismissLoading();
	}

    deleteAnswerByQyestuion() {
        this.answerService.deleteAnswerByQyestuion(0).subscribe(response => {
            console.log("REMOVE ANSWERS WITH ID ZERO: ", response);
            if (response.success == true) {
                this.getAnswersByIdZero();
            }
        })
    }

    deleteAnswerById(event: any) {
        console.log('Excluir resoista:', event);
        this.answerService.deleteAnswerById(event.answerId).subscribe(response => {
            console.log("REMOVE ANSWERS BY ID: ", response);            
            if (response.success == true) {
                this.getAnswersByIdZero();
            }
        })
    }
}
