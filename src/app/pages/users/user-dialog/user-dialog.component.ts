import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../user.model';

@Component({
    selector: 'app-user-dialog',
    templateUrl: './user-dialog.component.html',
    styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
    public form: FormGroup;
    public passwordHide: boolean = true;
    public colors = [
        {value: 'gradient-purple', viewValue: 'Purple'},
        {value: 'gradient-indigo', viewValue: 'Indigo'},
        {value: 'gradient-teal', viewValue: 'Teal'},
        {value: 'gradient-blue', viewValue: 'Blue'},
        {value: 'gradient-orange', viewValue: 'Orange'},
        {value: 'gradient-green', viewValue: 'Green'},
        {value: 'gradient-pink', viewValue: 'Pink'},
        {value: 'gradient-red', viewValue: 'Red'},
        {value: 'gradient-amber', viewValue: 'Amber'},
        {value: 'gradient-gray', viewValue: 'Gray'},
        {value: 'gradient-brown', viewValue: 'Brown'},
        {value: 'gradient-lime', viewValue: 'Lime'}
    ];

    constructor(public dialogRef: MatDialogRef<UserDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public user: User,
                public fb: FormBuilder) {
        this.form = this.fb.group({
            id: null,
            username: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
            password: [null, Validators.compose([Validators.minLength(5)])],
            firstname: null,
            lastname: null,
            email: [null, Validators.compose([Validators.required, Validators.email])],
            isActive: '0'

        });
    }

    ngOnInit() {
        if (this.user) {
            console.log(this.user);
            this.form.patchValue(this.user);


        } else {
            this.user = new User();
            this.form.controls["password"].setValidators(Validators.required);
        }
        this.form.updateValueAndValidity();
        console.log(this.form);
    }

    close(): void {
        this.dialogRef.close();
    }

}
