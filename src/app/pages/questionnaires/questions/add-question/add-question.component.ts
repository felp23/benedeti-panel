import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AnswerService, QuestionService, QuizService, SharedService } from 'src/app/services';
import { AddAnswerComponent } from '../add-answer/add-answer.component';
import { AnswerComponent } from '../answer/answer.component';

@Component({
    selector: 'app-add-question',
    templateUrl: './add-question.component.html',
    styleUrls: ['./add-question.component.scss']
})

export class AddQuestionComponent implements OnInit {

    toastPosition: '';

    filteredQuestions: any = [];
    cols: any[];

    answers: any = [];
    filteredAnswers: any = [];

    options = [
        { label: 'Muito fácil', value: 1 },
        { label: 'Fácil', value: 2 },
        { label: 'Médio', value: 3 },
        { label: 'Dificil', value: 4 },
        { label: 'Muito dificil', value: 5 }
    ];

    selectedOption: boolean;

    constructor(
        public questionService: QuestionService,
        public sharedService: SharedService,
        public answerService: AnswerService,
        public dialogService: DialogService,
        public quizService: QuizService,
        public router: Router
    ) { }

    ngOnInit(): void {
        this.updateBreadcrumb();
        this.getAnswersByIdZero();
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
                label:'Adicionar pergunta',
                routerLink: ['/pages/add-quiz']
            },
        ];
    }

    addQuestion() {
        this.questionService.newQuestion.questionQuizId = this.quizService.selectedQuiz.quizId;
        console.log('Nova resposta:', this.answerService.newAnswer);
        this.questionService.addQuestion().subscribe(data => 
            this.checkReturn(data)
        );
    }

    checkReturn(response) {
        console.log('Resposta', response);   
        if (response.success == true) {
            this.editAnswersQuestionId(response.data.questionId);
        }
    }

    editAnswersQuestionId(questionId) {
        // this.questionService.newQuestion.questionQuizId = this.quizService.selectedQuiz.quizId;
        console.log('ID:', questionId);
        this.answerService.editAnswerQuestionId(questionId).subscribe(data => 
            this.checkEditReturn(data)
        );
    } 

    checkEditReturn(response) {
        console.log('Resposta', response);   
        if (response.success == true) {
            this.questionService.newQuestion = {};
            this.answerService.newAnswer = {};
            this.router.navigateByUrl('/pages/questionnaires');
        }
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
		await this.answerService.getAnswersByQuestion(0)
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
