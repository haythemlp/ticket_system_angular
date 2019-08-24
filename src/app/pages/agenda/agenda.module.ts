import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgendaComponent} from './agenda.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {PipesModule} from '../../theme/pipes/pipes.module';
import {FullCalendarModule} from '@fullcalendar/angular';
import {AgendaDialogComponent} from './agenda-dialog/agenda-dialog.component';
import {OWL_DATE_TIME_LOCALE, OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';


export const routes = [
    {path: '', component: AgendaComponent, pathMatch: 'full'}
];

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        FullCalendarModule,
        SharedModule,
        PipesModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule
    ],
    declarations: [AgendaComponent, AgendaDialogComponent],
    entryComponents: [AgendaDialogComponent],
    providers: [{provide: OWL_DATE_TIME_LOCALE, useValue: 'fr'}
    ]
})
export class AgendaModule {
}
