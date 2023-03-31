import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppMainComponent } from './app-main/app.main.component';
import { LandingComponent } from './components/landing/landing.component';
// import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AccessComponent } from './components/access/access.component';
import { LoginComponent } from './auth/login/login.component';
import { UsersComponent } from './pages/users/users.component';
import { UserComponent } from './pages/users/user/user.component';
import { AddUserComponent } from './pages/users/add-user/add-user.component';
import { QuestionnairesComponent } from './pages/questionnaires/questionnaires.component';
import { QuizComponent } from './pages/questionnaires/quiz/quiz.component';
import { AddQuestionComponent } from './pages/questionnaires/questions/add-question/add-question.component';
import { QuestionComponent } from './pages/questionnaires/questions/question/question.component';
import { WorksComponent } from './pages/works/works.component';
import { WorkComponent } from './pages/works/work/work.component';

// CUSTOM COMPONENTS


@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: 'pages', component: AppMainComponent,
                children: [
                    {
                        path: 'dashboard', 
                        component: DashboardComponent
                    },
                    {
                        path: 'users', 
                        component: UsersComponent
                    },
                    {
                        path: 'users/user', 
                        component: UserComponent
                    },
                    {
                        path: 'works', 
                        component: WorksComponent
                    },
                    {
                        path: 'works/work', 
                        component: WorkComponent
                    },
                    {
                        path: 'questionnaires', 
                        component: QuestionnairesComponent
                    },
                    {
                        path: 'quiz', 
                        component: QuizComponent
                    },
                    {
                        path: 'add-question', 
                        component: AddQuestionComponent
                    },
                    {
                        path: 'question', 
                        component: QuestionComponent
                    },
                ],
            },
            {path:'pages/landing', component: LandingComponent},
            {path:'auth/login', component: LoginComponent},
            {path:'pages/error', component: ErrorComponent},
            {path:'pages/notfound', component: NotfoundComponent},
            {path:'pages/access', component: AccessComponent},
            {path:'', component: LoginComponent},
            {path: '**', redirectTo: 'pages/notfound'},
        ], {scrollPositionRestoration: 'enabled', anchorScrolling:'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
