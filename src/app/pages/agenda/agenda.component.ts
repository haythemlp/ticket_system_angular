import {Component, OnInit} from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
    selector: 'app-agenda',
    templateUrl: './agenda.component.html',
    styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {
    calendarPlugins = [dayGridPlugin]; // important!
    public header = {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    };

   

    public calendarEvents = [
        {title: 'event 1', date: '2019-08-23'}
    ];
    public i: number = 0;

    constructor() {
    }

    ngOnInit() {
    }

    handleDateClick(arg) { // handler method
        alert(arg.event.title);
    }


    openDialog(e) {
        console.log(e);
        const event = {title: 'event ' + this.i, date: '2019-08-23'};
        this.calendarEvents.push(event);
        this.i++;
    }
}
