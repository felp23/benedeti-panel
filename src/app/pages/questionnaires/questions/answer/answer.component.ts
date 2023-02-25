import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AnswerService, SharedService } from 'src/app/services';

@Component({
    selector: 'app-answer',
    templateUrl: './answer.component.html',
    styleUrls: ['./answer.component.scss']
})

export class AnswerComponent implements OnInit {

    options: any = [];

    selectedOption: boolean;

    editedAnswer: any = [];

    constructor(
        public answerService: AnswerService,
        public ref: DynamicDialogRef,
        public sharedService: SharedService
        ) { }

    ngOnInit(): void {
        this.editedAnswer = this.answerService.selectedAnswer;
        console.log("RESPOSTA: ", this.editedAnswer);
        this.options = [
            { label: 'Sim', value: true },
            { label: 'Não', value: false }
        ];
    }

    deleteAnswer() {
        console.log('Nova resposta:', this.answerService.newAnswer);
        this.answerService.deleteAnswer(this.editedAnswer.answerId).subscribe(data => 
            this.checkDeleteReturn(data)
        );
    }

    checkDeleteReturn(response) {
        console.log('Resposta', response);   
        if (response.success == true) {
            this.answerService.selectedAnswer = {};
            this.ref.close(this.sharedService.toastAddSuccess());
        }
    }
}
