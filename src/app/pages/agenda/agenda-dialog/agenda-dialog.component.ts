import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Agenda} from "../agenda";

@Component({
    selector: 'app-agenda-dialog',
    templateUrl: './agenda-dialog.component.html',
    styleUrls: ['./agenda-dialog.component.scss']
})
export class AgendaDialogComponent implements OnInit {
    public form: FormGroup;

    public types = [
        {text: 'vacation', value: 'blue'},
        {text: 'interview', value: 'red'},
        {text: 'grand', value: 'green'}
    ];


    constructor(public dialogRef: MatDialogRef<AgendaDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public event: Agenda,
                public fb: FormBuilder) {
        this.form = this.fb.group({
            id: null,
            title: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
            start: null,
            end: null,
            color: null
        });
    }

    ngOnInit() {
        if (this.event) {

            this.form.patchValue(this.event);

        } else {
            this.event = Agenda.new();
        }
        this.form.updateValueAndValidity();
    }


    close(): void {
        this.dialogRef.close();
    }


}
