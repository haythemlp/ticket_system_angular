import { Component, OnInit ,Input} from '@angular/core';
import { FormGroup, FormBuilder, Validators,FormArray,FormControl} from '@angular/forms';
import {TicketsService} from '../tickets.service';
import {TicketsComponent} from '../tickets.component';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.scss']
})
export class NewTicketComponent implements OnInit {

	 public form:FormGroup;
	    public replyForm:FormGroup;
	    @Input() questions:Array<any>;
	    @Input() clients:Array<any>;
	     @Input() serversList:Array<any>;
	     public servers:Array<any>;
	     @Input() types:Array<any>;
	     @Input() editableTicket;


  constructor( public formBuilder: FormBuilder,private service:TicketsService ,public ticketsComponent:TicketsComponent) { }

  get addDynamicElement() {
  return this.form.get('answers') as FormArray
}

addItems() {
  this.addDynamicElement.push(this.formBuilder.control(false))
}

clientSelect(){

const client_id=this.form.controls['client_id'].value;

if (client_id) {
  
this.servers=this.serversList.filter(servers=>servers.client_id==client_id);

}
}

  ngOnInit() {
  	    this.form = this.formBuilder.group({
  	   id:null,
      'client_id': [null, Validators.required],
      'server_id': [null, Validators.required],
      'type_id':[null, Validators.required],
      'sujet': [null, Validators.required],    
      'body': [null, Validators.required],
      'answers':this.formBuilder.array([])
    });  

    


     for(var i = 0; i < this.questions.length; ++i) {
     	this.addItems();
     	
     }

     if (this.editableTicket) {
     	let answers=[];


this.servers=this.serversList.filter(servers=>servers.client_id==this.editableTicket.client_id);

for (var i = 0; i < this.editableTicket.questions.length; ++i) {
	const q=this.editableTicket.questions[i];
	console.log(q);
	answers.push(q.value);
               }


     	 this.form.patchValue(this.editableTicket);
      this.form.controls['answers'].setValue(answers)


     }





  }


  public onSubmit(ticket){
    console.log(ticket)

    var answers=[]
    for (var i =0 ;  i < this.questions.length; i++) {
      var question= this.questions[i];
      answers.push({name:question.text,value:ticket.answers[i]})

    }

    ticket.answers=answers;
    if (this.form.valid) {
     
(ticket.id) ? this.ticketsComponent.updateTicket(ticket) : this.ticketsComponent.addTicket(ticket);

      this.form.reset();     
    }
  }
  

}
