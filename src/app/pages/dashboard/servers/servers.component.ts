import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Server} from '../../servers/server';

@Component({
    selector: 'app-servers-dashboard',
    templateUrl: './servers.component.html',
    styleUrls: ['./servers.component.scss']
})
export class ServersComponent implements OnInit, AfterViewInit, OnChanges {

    @Input() servers: Server[];
    public displayedColumns = ['name', 'url', 'company', 'status'];
    public dataSource: any;

    constructor() {
    }

    ngOnInit() {

    }


    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    ngAfterViewInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.dataSource = new MatTableDataSource<Server>(this.servers);
    }

}
