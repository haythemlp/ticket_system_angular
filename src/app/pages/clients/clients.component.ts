import { Component, OnInit } from '@angular/core';
import {ClientsService} from'./clients.service';
import {Client} from'./client';
import {MatDialog, MatTableDataSource} from '@angular/material';

import {ClientDialogComponent} from './client-dialog/client-dialog.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

	public clients:Client[];
	public dataSource: any;
    public spiner:boolean =false;

    public displayedColumns = ['name', 'num_contrat', 'address', 'email', 'actions'];

  constructor(private clientsService:ClientsService,public dialog: MatDialog) { }

  ngOnInit() {

         this.getclients();


  }


   public getclients(): void {



   this.clientsService.getClients().subscribe(clients => {
            this.clients = clients;
           this.dataSource = new MatTableDataSource<Client>(this.clients);
           this.spiner=true;
           

     });


     

    }

       applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    public openServerDialog(client: Client) {


        let dialogRef = this.dialog.open(ClientDialogComponent, {
            data: client,

            width: '80%',
        });
        dialogRef.afterClosed().subscribe(client => {
            if (client) {
            //(server.id) ? this.updateServer(server) : this.addServer(server);
            }
        });

    }

}
