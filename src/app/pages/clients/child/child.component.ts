import {Component, OnInit} from '@angular/core';
import {Client, Contact} from '../client';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {ClientsService} from '../clients.service';
import {ContactsService} from './contacts.service';
import {MatDialog, MatSnackBar, MatTableDataSource} from '@angular/material';
import {ChildDialogComponent} from './child-dialog/child-dialog.component';
import {ClientDialogComponent} from '../client-dialog/client-dialog.component';
import {ConfirmationComponent} from '../../../shared/confirmation/confirmation.component';

@Component({
    selector: 'app-child',
    templateUrl: './child.component.html',
    styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {

    public client: Client;
    private routeSub: Subscription;
    public dataSource: any;
    public spiner: boolean = false;
    public displayedColumns = ['fname', 'lname', 'fonction', 'email', 'tel', 'mobile', 'birth_date', 'actions'];


    constructor(private clientsService: ClientsService,
                private contactsService: ContactsService,
                private route: ActivatedRoute,
                public dialog: MatDialog,
                public snackBar: MatSnackBar
    ) {
    }

    ngOnInit() {
        this.getClient();

    }


    public getClient() {

        this.client = new Client();

        this.routeSub = this.route.params.subscribe(params => {
            this.clientsService.showClient(params['id']).subscribe(client => {
                this.client = client;
                this.dataSource = new MatTableDataSource<Contact>(this.client.contacts);
                this.spiner = true;
            });
        });

    }


    public openContactDialog(contact: Contact) {
        const dialogRef = this.dialog.open(ChildDialogComponent, {
            data: Object.assign({}, contact),
            width: '80%',
        });
        dialogRef.afterClosed().subscribe(contact => {
            if (contact) {
                contact.client_id = this.client.id;
                (contact.id) ? this.updateContact(contact) : this.addContact(contact);
            }
        });

    }


    public openClientDialog(client: Client) {
        const dialogRef = this.dialog.open(ClientDialogComponent, {
            data: Object.assign({}, client),
            width: '80%',
        });
        dialogRef.afterClosed().subscribe(client => {
            if (client) {
                this.updateClient(client);
            }
        });

    }


    public addContact(contact: Contact) {
        this.contactsService.addContact(contact).subscribe(contact => {


            this.getClient();

            this.snackBar.open('ajouter avec succès', 'success');


        });
    }


    public updateClient(client: Client) {
        this.clientsService.updateClient(client).subscribe(client => {
            this.getClient();
            this.snackBar.open('mise à jour avec succès', 'success');


        });
    }

    public updateContact(contact: Contact) {
        this.contactsService.updateContact(contact).subscribe(contact => {
            this.getClient();
            this.snackBar.open('mise à jour avec succès', 'success');


        });
    }

    public deleteContact(contact: Contact) {

        const dialogRef = this.dialog.open(ConfirmationComponent, {
            width: '350px',
            data: 'Do you confirm the deletion of this data?'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.log('Yes clicked');
                // DO SOMETHING
                this.contactsService.deleteContact(contact.id).subscribe(contact => {
                    this.getClient();
                    this.snackBar.open('supprimé avec succès', 'success');
                });
            }
        });


    }


}
