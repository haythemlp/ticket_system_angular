import { Component, OnInit,Inject } from '@angular/core';
import {Ticket,Reply} from '../ticket'
import { FormGroup, FormBuilder, Validators,FormArray,FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';


@Component({
  selector: 'app-ticket-reply',
  templateUrl: './ticket-reply.component.html',
  styleUrls: ['./ticket-reply.component.scss']
})
export class TicketReplyComponent implements OnInit {

	   public form:FormGroup;

  constructor(public dialogRef: MatDialogRef<TicketReplyComponent>,public formBuilder: FormBuilder,@Inject(MAT_DIALOG_DATA) public reply :Reply) { }

  ngOnInit() { 



  	this.form = this.formBuilder.group({
  		'id':null,
      'ticket_id': [null, Validators.required],   
      'body': [null, Validators.required]
    }); 

 this.form.patchValue(this.reply);
        this.form.updateValueAndValidity() ;


        console.log(this.form.value)
  }


  close(): void {
        this.dialogRef.close();
    }

 


}
