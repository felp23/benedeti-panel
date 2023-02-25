import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { AnswerService, ConfigService, QuestionService, SharedService } from 'src/app/services';
import { AddAnswerComponent } from '../add-answer/add-answer.component';
import { AnswerComponent } from '../answer/answer.component';

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
        public sharedService: SharedService,
        public questionService: QuestionService,
        public configService: ConfigService,
        public dialogService: DialogService,
        public answerService: AnswerService
        ) { }

    ngOnInit(): void {
        this.editedQuestion = this.configService.cloneObject(this.questionService.selectedQuestion);
        this.updateBreadcrumb();
        this.getAnswersByQuestion();
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

    showAddAnswerDialog() {
        const ref = this.dialogService.open(AddAnswerComponent, {
            header: 'Adicionar resposta',
        });

        ref.onClose.subscribe(data => this.getAnswersByQuestion());
    }

    showAnswerDialog(event) {
        this.answerService.selectedAnswer = event;
        const ref = this.dialogService.open(AnswerComponent, {
            header: 'Detalhes da resposta',
        });

        ref.onClose.subscribe(data => this.getAnswersByQuestion());
    }

    deleteQuestion() {
        console.log('Nova resposta:', this.answerService.newAnswer);
        this.questionService.deleteQuestion(this.editedQuestion.questionId).subscribe(data => 
            this.checkDeleteReturn(data)
        );
    }

    checkDeleteReturn(response) {
        console.log('Resposta', response);   
        if (response.success == true) {
            this.answerService.selectedAnswer = {};
            // this.sharedService.toastAddSuccess();
            this.router.navigateByUrl('/pages/questionnaires');
        }
    }

	async getAnswersByQuestion() {
		// this.loadingService.presentLoading();
        console.log("Selected Question: ", this.questionService.selectedQuestion.questionId);
		await this.answerService.getAnswersByQuestion(this.questionService.selectedQuestion.questionId)
			.toPromise()
				.then(data => {
					console.log(data);
                    this.answers = data;
                     for (let answer of this.answers) {
                        console.log('AQUI POHA', answer);
                        if (answer.answerIsCorrect == "true") {
                        console.log('AGORA AQUI POHA', answer);
                            answer.answerIsCorrectF = 'Sim'
                        }
                        if (answer.answerIsCorrect == "false") {
                        console.log('AGORA AQUI POHA', answer);
                            answer.answerIsCorrectF = 'Não'
                        }
                    }
                    this.filteredAnswers = this.answers;
                    console.log(this.filteredAnswers);
				}, err => {
					console.log(err);
				});
		// this.loadingService.dismissLoading();
	}

}
