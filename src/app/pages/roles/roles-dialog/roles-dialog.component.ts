import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Roles} from '../roles';
import {Menu} from '../../../theme/components/menu/menu.model';
import {verticalMenuItems} from '../../../theme/components/menu/menu';

@Component({
    selector: 'app-roles-dialog',
    templateUrl: './roles-dialog.component.html',
    styleUrls: ['./roles-dialog.component.scss']
})
export class RolesDialogComponent implements OnInit {
    public form: FormGroup;
    public menu: Menu[] = verticalMenuItems;

    constructor(public dialogRef: MatDialogRef<RolesDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public role,
                public fb: FormBuilder) {

        this.form = this.fb.group({
            id: null,
            name: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
            menu: [null, Validators.required],
        });
    }

    ngOnInit() {
        if (this.role) {

            this.role.menu = this.role.menu ? JSON.parse(this.role.menu) : [];

            this.form.patchValue(this.role);

        } else {
            this.role = new Roles();
        }
        this.form.updateValueAndValidity();
    }


    close(): void {
        this.dialogRef.close();
    }
}
