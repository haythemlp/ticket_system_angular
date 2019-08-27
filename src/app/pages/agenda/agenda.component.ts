import {Component, OnInit} from '@angular/core';
import {EventInput} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {AgendaDialogComponent} from './agenda-dialog/agenda-dialog.component';
import {MatDialog} from '@angular/material';
import {Agenda} from './agenda';
import {ConfirmationComponent} from '../../shared/confirmation/confirmation.component';
import {AgendaService} from './agenda.service';
import * as moment from 'moment';
import {SnackbarService} from '../../services/snackbar.service';

declare var jQuery: any;

@Component({
    selector: 'app-agenda',
    templateUrl: './agenda.component.html',
    styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {

    constructor(private dialog: MatDialog, private service: AgendaService, private alert: SnackbarService) {
    }


    calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin]; // important!
    public header = {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    };

    public calendarEvents: EventInput[] = [];
    public i = 0;


    ngOnInit() {
        this.getEvent();

    }

    getEvent = () => this.service.all().subscribe((events) => this.calendarEvents = Agenda.all(events));
    addEvent = (event) => this.service.add(event).subscribe(() => this.getEvent());
    updateEvent = (event) => this.service.update(event).subscribe(() => this.getEvent());

    openDialog(e) {


        const text = (e && e.extendedProps) ? e.extendedProps.text : '';
        const user = (e && e.extendedProps) ? e.extendedProps.user : '';
        const edit = (e && e.extendedProps) ? e.extendedProps.edit : true;
        const ev = (e) ? new Agenda(e.id, e.title, e.start, e.end, e.backgroundColor, text, user, edit) : null;
        const dialogRef = this.dialog.open(AgendaDialogComponent, {
            data: ev,
            width: '600px',
        });
        dialogRef.afterClosed().subscribe(event => {
            if (event) {

                event.start = moment(event.start).format('YYYY-MM-DD  HH:mm');
                event.end = moment(event.end).format('YYYY-MM-DD  HH:mm');
                return event.id ? this.updateEvent(event) : this.addEvent(event);
            } else {
                this.getEvent();
            }
        });
    }


    eventRender(e) {

    }

    eventDrop(info) {

        console.log(info.event);
        if (info.event.extendedProps.edit) {
            const dialogRef = this.dialog.open(ConfirmationComponent, {
                width: '350px',
                data: 'Do you confirm changement?'
            });
            dialogRef.afterClosed().subscribe(result => {
                if (!result) {
                    info.revert();
                } else {
                    this.updateEvent(Agenda.fromCalender(info.event));
                }
            });

        } else {

            this.alert.open('unathourized', 'x');
            info.revert();
        }
    }

    handleDateClick(arg) {
        const event = Agenda.new();
        event.start = arg.date;
        this.openDialog(event);
    }
}
