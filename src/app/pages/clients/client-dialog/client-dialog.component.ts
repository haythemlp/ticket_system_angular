import { Component,Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Client,Contact} from "../client";

@Component({
  selector: 'app-client-dialog',
  templateUrl: './client-dialog.component.html',
  styleUrls: ['./client-dialog.component.scss']
})
export class ClientDialogComponent implements OnInit {
    public form: FormGroup;

    public types=["petit","moyen","grand"];



    constructor(public dialogRef: MatDialogRef<ClientDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public client: Client,
                public fb: FormBuilder) {
        this.form = this.fb.group({
            id: null,
            name: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
            num_contrat:null,
            npa:null,
            address:null,
            localite:null,
            type:null,
            num_emp:null,
            nrc:null,
            email:null,
            tel:null,
            mobile:null,
            

        });
    }

    ngOnInit() {
        if (this.client) {

            this.form.patchValue(this.client);

        } else {
            this.client = new Client();
        }
        this.form.updateValueAndValidity();
    }


    close(): void {
        this.dialogRef.close();
    }
}
