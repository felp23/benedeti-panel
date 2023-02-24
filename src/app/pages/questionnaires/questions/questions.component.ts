import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { QuestionService } from 'src/app/services';
import { AddQuestionComponent } from './add-question/add-question.component';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss']
})

export class QuestionsComponent implements OnInit {

    filteredQuestions: any = [];
    cols: any[];

    constructor(
                public dialogService: DialogService,
                public questionService: QuestionService,
                public router: Router
        ) { }

    ngOnInit(): void {
    }

    openAddQuestionPage() {
        // this.questionService.selectedQuestion = event;
        // console.log("Selected Quiz: ", event);
        this.router.navigateByUrl('/pages/add-question');
    }

}
