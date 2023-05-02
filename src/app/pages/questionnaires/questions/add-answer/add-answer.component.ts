import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AnswerService, AuthService, ConfigService, QuestionService, QuizService, SharedService } from 'src/app/services';

@Component({
    selector: 'app-add-answer',
    templateUrl: './add-answer.component.html',
    styleUrls: ['./add-answer.component.scss']
})

export class AddAnswerComponent implements OnInit {

    options = [
        { label: 'Sim', value: true },
        { label: 'Não', value: false }
    ];

    selectedOption: boolean;
    selectedQuestion: any = {};

    constructor(
        public answerService: AnswerService,
        public questionService: QuestionService,
        public sharedService: SharedService,
        public ref: DynamicDialogRef,
        public quizService: QuizService,
        public authService: AuthService,
        public configService: ConfigService
        ) { }

    ngOnInit(): void {
        this.authService.checkAuth();
        this.selectedQuestion = this.configService.cloneObject(this.questionService.selectedQuestion);
        console.log("Selected Question ANSWER: ",  this.selectedQuestion);
    }

    addAnswer() {
        if (this.selectedQuestion.questionId) {
            console.log('PAROU AQUI 01');
            this.answerService.newAnswer.answerQuestionId = this.selectedQuestion.questionId;
        }
        if (!this.selectedQuestion.questionId) {
            console.log('PAROU AQUI 02');
            this.answerService.newAnswer.answerQuestionId = 0;
        }
        this.answerService.newAnswer.answerQuizId = this.quizService.selectedQuiz.quizId;
        console.log('Nova resposta:', this.answerService.newAnswer);
        this.answerService.addAnswer().subscribe(data => 
            {
                console.log('Resposta', data);   
                if (data.success == true) {
                    this.answerService.newAnswer = {};
                    this.questionService.selectedQuestion = {};
                    this.ref.close(true);
                }
            }
        );
    }

}
