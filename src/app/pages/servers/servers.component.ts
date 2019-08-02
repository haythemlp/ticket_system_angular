import { Component, OnInit } from '@angular/core';
import {ServersService} from './servers.service';
import { Server } from './server';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss']
})
export class ServersComponent implements OnInit {

	  public servers: Server[];
	 public dataSource: any;

	  	public displayedColumns = ['name', 'url', 'company', 'ip','actions'];



  constructor(private serversService: ServersService) { }

  ngOnInit() { 


this.getservers();
  }


  public getservers(): void {



        this.servers = []; //for show spinner each time
        this.serversService.getSevers().subscribe(servers => {this.servers = servers, console.log(servers) 


 this.dataSource = new MatTableDataSource<Server>(this.servers);

 console.log(this.dataSource);

        });    

       
    }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
