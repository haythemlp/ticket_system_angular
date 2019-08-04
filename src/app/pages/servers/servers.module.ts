import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ServersComponent} from './servers.component';
import {ServersDialogComponent} from './servers-dialog/servers-dialog.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {PipesModule} from '../../theme/pipes/pipes.module';
import { ChildComponent } from './child/child.component';


export const routes = [
    {path: '', component: ServersComponent, pathMatch: 'full'},
    {path: ':id', component: ChildComponent, pathMatch: 'full' ,data: { breadcrumb: 'show' }}
];

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        PipesModule

    ],
    declarations: [ServersComponent, ServersDialogComponent, ChildComponent]
    ,
    entryComponents: [
        ServersDialogComponent
    ]
})
export class ServersModule {
}
