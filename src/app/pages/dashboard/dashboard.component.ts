import {Component, OnInit} from '@angular/core';
import {DashboardService} from './dashboard.service';
import {Data} from './data';
import {Server} from "../servers/server";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {

    constructor(private service: DashboardService) {
    }

    public data: Data;
    events: any;
    tickets: any;
    stats: any;
    users: any;
    servers: Server[];

    ngOnInit() {
        this.getData();
    }


    getData = () => this.service.data().subscribe((data) => {
        this.data = data;
        this.events = data.events;
        this.stats = data.stats;
        this.users = data.users;
        this.tickets = data.tickets;
        this.servers = data.servers;
    });


}
