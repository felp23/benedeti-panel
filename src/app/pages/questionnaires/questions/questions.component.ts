import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthService, QuestionService, QuizService, SharedService } from 'src/app/services';
import { AddQuestionComponent } from './add-question/add-question.component';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss']
})

export class QuestionsComponent implements OnInit {

    filteredQuestions: any = [];
    cols: any[];
    questions: any = [];

    constructor(
                public dialogService: DialogService,
                public questionService: QuestionService,
                public quizService: QuizService,
                public router: Router,
                public authService: AuthService,
                public sharedService: SharedService
        ) { }

    ngOnInit(): void {
        this.authService.checkAuth();
        this.getQuestions();
        this.updateBreadcrumb();
    }

    updateBreadcrumb() {
        this.sharedService.items = [
            {
                label:'Lista de questões',
                routerLink: ['/pages/questionnaires']
            },
        ];
    }
    openAddQuestionPage() {
        this.questionService.selectedQuestion = {};
        // console.log("Selected Quiz: ", event);
        this.router.navigateByUrl('/pages/add-question');
    }

    openQuestionPage(event) {
        this.questionService.selectedQuestion = event;
        console.log("Selected Question: ", event);
        this.router.navigateByUrl('/pages/question');
    }

    getQuestions() {
        this.questionService.getQuestions().subscribe(response => {
            console.log(response);
            this.questions = response.data;
            for (let question of this.questions) {
                if (question.questionDifficulty == 1) {
                    question.questionDifficultyF = "Muito fácil"
                }
                if (question.questionDifficulty == 2) {
                    question.questionDifficultyF = "Fácil"
                }
                if (question.questionDifficulty == 3) {
                    question.questionDifficultyF = "Médio"
                }
                if (question.questionDifficulty == 4) {
                    question.questionDifficultyF = "Difícil"
                }
                if (question.questionDifficulty == 5) {
                    question.questionDifficultyF = "Muito difícil"
                }
            }
            this.filteredQuestions = this.questions;
            console.log(this.filteredQuestions);
        })
    }

	async getQuestionsByQuizId() {
		// this.loadingService.presentLoading();
		await this.questionService.getQuestionsByQuizId(this.quizService.selectedQuiz.quizId)
			.toPromise()
				.then(data => {
					console.log(data);
                    this.questions = data.data;
                    for (let question of this.questions) {
                        if (question.questionDifficulty == 1) {
                            question.questionDifficultyF = "Muito fácil"
                        }
                        if (question.questionDifficulty == 2) {
                            question.questionDifficultyF = "Fácil"
                        }
                        if (question.questionDifficulty == 3) {
                            question.questionDifficultyF = "Médio"
                        }
                        if (question.questionDifficulty == 4) {
                            question.questionDifficultyF = "Difícil"
                        }
                        if (question.questionDifficulty == 5) {
                            question.questionDifficultyF = "Muito difícil"
                        }
                    }
                    this.filteredQuestions = this.questions;
                    console.log(this.filteredQuestions);
				}, err => {
					console.log(err);
				});
		// this.loadingService.dismissLoading();
	}

    deleteQuiz() {

    }
}
