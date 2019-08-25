import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {DashboardComponent} from './dashboard.component';
import {TilesComponent} from './tiles/tiles.component';
import {InfoCardsComponent} from './info-cards/info-cards.component';
import {TicketsChartComponent} from './tickets-chart/tickets-chart.component';
import {TodoComponent} from './todo/todo.component';
import {AnalyticsComponent} from './analytics/analytics.component';
import {FullCalendarModule} from '@fullcalendar/angular';
import {TeamComponent} from './team/team.component';
import {AgendaComponent} from './agenda/agenda.component';
import { ServersComponent } from './servers/servers.component';

export const routes = [
    {path: '', component: DashboardComponent, pathMatch: 'full'}
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        FormsModule,
        NgxChartsModule,
        FullCalendarModule,
        PerfectScrollbarModule
    ],
    declarations: [
        DashboardComponent,
        TilesComponent,
        InfoCardsComponent,
        TicketsChartComponent,
        TodoComponent,
        AnalyticsComponent,
        TeamComponent,
        AgendaComponent,
        ServersComponent
    ]
})
export class DashboardModule {
}
