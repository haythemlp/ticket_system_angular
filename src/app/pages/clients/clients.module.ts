import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClientsComponent} from './clients.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {PipesModule} from '../../theme/pipes/pipes.module';
import {HttpClientModule} from '@angular/common/http';
import { ClientDialogComponent } from './client-dialog/client-dialog.component';


export const routes = [
    {path: '', component: ClientsComponent, pathMatch: 'full'},
  
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
  declarations: [ClientsComponent, ClientDialogComponent],
       entryComponents: [ClientDialogComponent ]
})



export class ClientsModule { }
