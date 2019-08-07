import { Component,Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Contact} from "../../client";


@Component({
  selector: 'app-child-dialog',
  templateUrl: './child-dialog.component.html',
  styleUrls: ['./child-dialog.component.scss']
})
export class ChildDialogComponent implements OnInit {
 public form: FormGroup;

    constructor(public dialogRef: MatDialogRef<ChildDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public contact: Contact,
                public fb: FormBuilder) {
        this.form = this.fb.group({
            id: null,
            fname: [null, Validators.compose([Validators.required])],
            lname: [null, Validators.compose([Validators.required])],
            fonction:null,
            email:null,
            tel:null,
            mobile:null,
            birth_date:null,
        });
    }

    ngOnInit() {
        if (this.contact) {

            this.form.patchValue(this.contact);

        } else {
            this.contact = new Contact();
        }
        this.form.updateValueAndValidity();
    }


    close(): void {
        this.dialogRef.close();
    }
}
