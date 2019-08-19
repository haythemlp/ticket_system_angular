import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Server} from "../server";
import {Client} from'../../clients/client';


@Component({
    selector: 'app-servers-dialog',
    templateUrl: './servers-dialog.component.html',
    styleUrls: ['./servers-dialog.component.scss']
})
export class ServersDialogComponent implements OnInit {
    public form: FormGroup;
    public clients:Client[];
    public server :Server;

    constructor(public dialogRef: MatDialogRef<ServersDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data,
                public fb: FormBuilder) {
        this.form = this.fb.group({
            id: null,
            name: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
            url: null,
            client_id: [null,Validators.required],
            ip: null,
            git_token: null,
            ssh_host: null,
            ssh_user: null,
            ssh_pass: null,
            url_host: null,
            db_host: null,
            db_user: null,
            db_pass: null,
            status: 0,
            start: [null],
            deadline: null,

        });
    }

    ngOnInit() {

this.server=this.data.server;
this.clients=this.data.clients;

        if (this.server) {

            this.form.patchValue(this.server);
           this.form.controls['status'].setValue(this.server.status);


        } else {
            this.server = new Server();
        }
        this.form.updateValueAndValidity();
        console.log(this.form);
    }


    close(): void {
        this.dialogRef.close();
    }
}
