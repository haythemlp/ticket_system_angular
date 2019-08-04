import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ServersService} from '../servers.service';
import {Subscription} from 'rxjs';
import {Server} from '../server';

@Component({
    selector: 'app-child',
    templateUrl: './child.component.html',
    styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {
    private routeSub: Subscription;
    public server: Server;

    constructor(private route: ActivatedRoute, private serversService: ServersService, private router: Router) {
    }

    ngOnInit() {
        this.server = new Server();
        this.routeSub = this.route.params.subscribe(params => {
            this.serversService.showSever(params['id']).subscribe(server => this.server = server);
        });

    }
}
