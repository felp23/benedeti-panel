import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AnswerService, QuestionService, SharedService } from 'src/app/services';

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

    constructor(
        public answerService: AnswerService,
        public questionService: QuestionService,
        public sharedService: SharedService,
        public ref: DynamicDialogRef,
    ) { }

    ngOnInit(): void {
    }

    addAnswer() {
        if (this.questionService.selectedQuestion.questionId) {
            this.answerService.newAnswer.answerQuestionId = this.questionService.selectedQuestion.questionId;
        }
        if (!this.questionService.selectedQuestion.questionId) {
            this.answerService.newAnswer.answerQuestionId = 0;
        }
        console.log('Nova resposta:', this.answerService.newAnswer);
        this.answerService.addAnswer().subscribe(data => 
            this.checkReturn(data)
        );
    }

    checkReturn(response) {
        console.log('Resposta', response);   
        if (response.success == true) {
            this.answerService.newAnswer = {};
            this.questionService.selectedQuestion = {};
            this.ref.close(this.sharedService.toastAddSuccess());
        }
    }

}
