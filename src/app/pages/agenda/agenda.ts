import * as moment from 'moment';

export class Agenda {
    id: number;
    title: string;
    start: string;
    end: string;
    color: string;
    allDay: boolean;
    text: string;
    user: number;
    edit: boolean;


    constructor(id: number, title: string, start: string, end: string, color: string, text: string, user: number, edit: boolean) {
        this.id = id;
        this.title = title;
        this.start = start;
        this.end = end;
        this.color = color;
        this.allDay = false;
        this.text = text;
        this.user = user;
        this.edit = edit;
    }

    static new() {
        return new Agenda(null, null, null, null, null, null, null, true);
    }

    static fromCalender = (e) => new Agenda(
        e.id,
        e.title,
        Agenda.formatDate(e.start),
        Agenda.formatDate(e.end),
        e.backgroundColor,
        e.extendedProps.text,
        e.extendedProps.user,
        e.extendedProps.edit
    )

    static fromDB = (e) => new Agenda(e.id, e.title, e.start, e.end, e.color, e.text, e.user, e.edit);

    static all(e) {
        const events = [];
        for (let i = 0; i < e.length; i++) {
            events.push(Agenda.fromDB(e[i]));
        }
        return events;

    }

    static formatDate = (date) => moment(date).format('YYYY-MM-DD  HH:mm');

}
