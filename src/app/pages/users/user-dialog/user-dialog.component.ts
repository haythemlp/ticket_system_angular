import {Component, Inject, OnInit,ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import {User} from '../user.model';

@Component({
    selector: 'app-user-dialog',
    templateUrl: './user-dialog.component.html',
    styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {

 @ViewChild("fileInput") fileInput;   
  public civils=['Monsieur','Madame'];
     public fonctions=['web developer','ceo','secretaire'];
        public comps=['php','mysql','java'];


    public form: FormGroup;
    public passwordHide: boolean = true;
 

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
            is_active: false,
            civilite:null,
            fonction:null,
            tel:null,
            mobile:null,
            date_birth:null,
            competance:null,
            avatar:null,

        });
    }

    ngOnInit() {
        if (this.user) {
            console.log(this.user);

this.user.competance=JSON.parse(this.user.competance);
            this.form.patchValue(this.user);


        } else {
            this.user = new User();
            this.form.controls["password"].setValidators(Validators.required);
        }
        this.form.updateValueAndValidity();
   
    }

    close(): void {
        this.dialogRef.close();
    }

    upload(){
let fi = this.fileInput.nativeElement;
if (fi.files && fi.files[0]) {
    let fileToUpload = fi.files[0];
 
  this.form.controls["avatar"].setValue(fileToUpload);

      }

             
    }

}
