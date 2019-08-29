import { Component, OnInit,Input,ViewEncapsulation } from '@angular/core';
import {Ticket} from '../ticket'
import { FormGroup, FormBuilder, Validators,FormArray,FormControl} from '@angular/forms';
import {TicketsService} from '../tickets.service';
import { TicketsComponent} from '../tickets.component';

@Component({
  selector: 'app-read-ticket',
  templateUrl: './read-ticket.component.html',
  styleUrls: ['./read-ticket.component.scss']
})
export class ReadTicketComponent implements OnInit {

  public user =JSON.parse(localStorage.getItem("user")) ;

	@Input() ticket :Ticket;


  constructor(public ticketsComponent:TicketsComponent) { }

  ngOnInit() { 

  }


delete(reply){

  this.ticketsComponent.deleteReply(reply);
}

edit(reply){
console.log(reply);
  this.ticketsComponent.replyDialog(reply);
}

 

}
