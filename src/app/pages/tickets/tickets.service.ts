import {Injectable} from '@angular/core';
import {Ticket} from './ticket';
import {environment} from '../../../environments/environment.prod';
import {HttpService} from '../../services/http.service';


@Injectable({
    providedIn: 'root'
})


export class TicketsService {

    public appUrl = environment.apiUrl + 'tickets';
    public replyUrl = environment.apiUrl + 'ticket/replies';

    constructor(public http: HttpService) {

    }

    public getAllTickets(Tickets) {

        return Tickets;
    }

    public getTickets() {

        return this.http.getHttp(this.appUrl);

    }

    addTicket(ticket: Ticket) {
        return this.http.postHttp(this.appUrl, ticket);
    }

    updateTicket(ticket: Ticket) {
        return this.http.putHttp(this.appUrl + '/' + ticket.id, ticket);
    }

    deleteTicket(id: number) {
        return this.http.deleteHttp(this.appUrl + '/' + id);
    }


    editType(status, id) {
        return this.http.postHttp(this.appUrl + '/status', {status: status, id: id});
    }

// replies of tickets


    addReply(reply) {
        return this.http.postHttp(this.replyUrl, reply);
    }

    updateReply(reply) {
        return this.http.putHttp(this.replyUrl + '/' + reply.id, reply);
    }

    deleteReply(id: number) {
        return this.http.deleteHttp(this.replyUrl + '/' + id);
    }


    // filter of tickets
    public getNewTickets(tickets: Ticket[]) {
        return tickets.filter(ticket => ticket.status == 'new');
    }

    public getReadTickets(tickets: Ticket[]) {
        return tickets.filter(ticket => ticket.status == 'read');
    }

    public getSolvedTickets(tickets: Ticket[]) {
        return tickets.filter(ticket => ticket.status == 'solved');
    }

    public getUnsolvedTickets(tickets: Ticket[]) {
        return tickets.filter(ticket => ticket.status == 'unsolved');
    }

    public getTicket(tickets: Ticket[], id: number | string) {
        return tickets.find(ticket => ticket.id === +id);
    }


}
