import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AnswerService, QuestionService, SharedService } from 'src/app/services';
import { AddAnswerComponent } from '../add-answer/add-answer.component';

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

    constructor(
        public questionService: QuestionService,
        public sharedService: SharedService,
        public answerService: AnswerService,
        public dialogService: DialogService
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
                routerLink: ['/pages/questionnaires/quiz']
            },
            {
                label:'Adicionar pergunta',
                routerLink: ['/pages/questionnaires/quiz']
            },
        ];
    }

    showAddAnswerDialog() {
        const ref = this.dialogService.open(AddAnswerComponent, {
            header: 'Adicionar resposta',
            width: '32%'
        });

        // ref.onClose.subscribe(data => this.getQuestionnaires());
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
