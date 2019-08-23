import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TicketsComponent} from './tickets.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {QuillModule} from 'ngx-quill';
import {SharedModule} from '../../shared/shared.module';
import {PipesModule} from '../../theme/pipes/pipes.module';
import { QuestionsComponent } from './questions/questions.component';
import { CategoriesComponent } from './categories/categories.component';
import { DialogQuestionComponent } from './questions/dialog-question/dialog-question.component';
import { DialogCategoryComponent } from './categories/dialog-category/dialog-category.component';


export const routes = [
    {path: 'list', component: TicketsComponent, pathMatch: 'full',data: { breadcrumb: 'Liste' }},
    {path: 'questions', component: QuestionsComponent, pathMatch: 'full', data: { breadcrumb: 'Questions' }},
    {path: 'categories', component: CategoriesComponent, pathMatch: 'full', data: { breadcrumb: 'Categories' }},
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        PerfectScrollbarModule,
        QuillModule,
        SharedModule,
        PipesModule
    ],
    declarations: [TicketsComponent, QuestionsComponent, CategoriesComponent, DialogQuestionComponent, DialogCategoryComponent],
     entryComponents:[DialogQuestionComponent,DialogCategoryComponent]
})
export class TicketsModule {
}
