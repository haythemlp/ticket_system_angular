import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {Agenda} from "../agenda";
import {AgendaService} from "../agenda.service";
import {ConfirmationComponent} from "../../../shared/confirmation/confirmation.component";

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
    public update = true;


    constructor(public dialogRef: MatDialogRef<AgendaDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public event: Agenda, private dialog: MatDialog,
                public fb: FormBuilder, private service: AgendaService) {
        this.form = this.fb.group({
            id: null,
            title: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
            text: '',
            start: [null, Validators.required],
            end: [null, Validators.required],
            color: null
        });
    }

    ngOnInit() {

        this.update = true;
        if (this.event) {
            this.update = !this.event.id;
            this.form.patchValue(this.event);

        } else {
            this.event = Agenda.new();


        }
        this.form.updateValueAndValidity();
    }


    close(): void {
        this.dialogRef.close();
    }


    delete = () => {
        const dialogRef = this.dialog.open(ConfirmationComponent, {
            width: '350px',
            data: 'Do you confirm delete?'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.service.delete(this.event.id).subscribe(() => this.dialogRef.close());
            }
        });
    }


}
