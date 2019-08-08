import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClientsComponent} from './clients.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {PipesModule} from '../../theme/pipes/pipes.module';
import {HttpClientModule} from '@angular/common/http';
import { ClientDialogComponent } from './client-dialog/client-dialog.component';
import { ChildComponent } from './child/child.component';
import { ChildDialogComponent } from './child/child-dialog/child-dialog.component';


export const routes = [
    {path: '', component: ClientsComponent, pathMatch: 'full'},
    {path: ':id', component: ChildComponent, pathMatch: 'full'},

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
  declarations: [ClientsComponent, ClientDialogComponent, ChildComponent, ChildDialogComponent],
       entryComponents: [ClientDialogComponent ,ChildDialogComponent]
})



export class ClientsModule { }
