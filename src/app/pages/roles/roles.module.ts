import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RolesComponent} from './roles.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {PipesModule} from '../../theme/pipes/pipes.module';
import {RolesDialogComponent} from './roles-dialog/roles-dialog.component';

export const routes = [
    {path: '', component: RolesComponent, pathMatch: 'full'},

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
    declarations: [RolesComponent, RolesDialogComponent],
    entryComponents:[RolesDialogComponent]
})
export class RolesModule {
}
