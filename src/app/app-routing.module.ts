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
import { PostsComponent } from './pages/posts/posts.component';
import { PostComponent } from './pages/posts/post/post.component';
import { AddPostComponent } from './pages/posts/add-post/add-post.component';
import { QuestionsComponent } from './pages/questionnaires/questions/questions.component';

// CUSTOM COMPONENTS


@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: 'pages', 
                component: AppMainComponent,
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
                        path: 'add-post', 
                        component: AddPostComponent
                    },
                    {
                        path: 'posts', 
                        component: PostsComponent
                    },
                    {
                        path: 'posts/post', 
                        component: PostComponent
                    },
                    {
                        path: 'questionnaires', 
                        component: QuestionnairesComponent
                    },
                    {
                        path: 'questions', 
                        component: QuestionsComponent
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
