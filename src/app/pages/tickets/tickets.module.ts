import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TicketsComponent} from './tickets.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {QuillModule} from 'ngx-quill';
import {SharedModule} from '../../shared/shared.module';
import {PipesModule} from '../../theme/pipes/pipes.module';


export const routes = [
    {path: '', component: TicketsComponent, pathMatch: 'full'}
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
    declarations: [TicketsComponent]
})
export class TicketsModule {
}
