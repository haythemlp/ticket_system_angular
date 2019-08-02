import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Server} from "../server";


@Component({
    selector: 'app-servers-dialog',
    templateUrl: './servers-dialog.component.html',
    styleUrls: ['./servers-dialog.component.scss']
})
export class ServersDialogComponent implements OnInit {
    public form: FormGroup;

    constructor(public dialogRef: MatDialogRef<ServersDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public server: Server,
                public fb: FormBuilder) {
        this.form = this.fb.group({
            id: null,
            name: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
            url: null,
            company: null,
            ceo: null,
            ip: null,
            git_token: null,
            ssh_host: null,
            ssh_user: null,
            ssh_pass: null,
            url_host: null,
            db_host: null,
            db_user: null,
            db_pass: null,
            status: null,
            start: [null],
            deadline: null,

        });
    }

    ngOnInit() {
        if (this.server) {

            this.form.patchValue(this.server);


        } else {
            this.server = new Server();
        }
        this.form.updateValueAndValidity();
        console.log(this.server);
    }


    close(): void {
        this.dialogRef.close();
    }
}