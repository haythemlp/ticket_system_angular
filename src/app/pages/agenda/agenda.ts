import * as moment from "moment";

export class Agenda {
    id: number;
    title: string;
    start: string;
    end: string;
    color: string;
    allDay: boolean;


    constructor(id: number, title: string, start: string, end: string, color: string) {
        this.id = id;
        this.title = title;
        this.start = start;
        this.end = end;
        this.color = color;
        this.allDay = false;
    }

    static new() {
        return new Agenda(null, null, null, null, null);
    }


    static fromCalender = (e) => new Agenda(e.id, e.title, Agenda.formatDate(e.start), Agenda.formatDate(e.end), e.backgroundColor);
    static fromDB = (e) => new Agenda(e.id, e.title, e.start, e.end, e.color);

    static all(e) {
        let events = [];
        for (let i = 0; i < e.length; i++) {
            events.push(Agenda.fromDB(e[i]));
        }
        console.log(events);
        return events;

    }

  static  formatDate = (date) => moment(date).format('YYYY-MM-DD  HH:mm');

}
