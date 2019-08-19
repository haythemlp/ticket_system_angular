import { Component, OnInit, ViewEncapsulation, ViewChild, HostListener,ElementRef ,ChangeDetectorRef} from '@angular/core';
import { FormGroup, FormBuilder, Validators,FormArray,FormControl} from '@angular/forms';
import { MatDialog, MatRadioChange} from '@angular/material';


import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import {TicketsService} from './tickets.service';
import {Ticket} from './ticket';
import {SnackbarService} from '../../services/snackbar.service';
import {ConfirmationComponent} from '../../shared/confirmation/confirmation.component';



 
@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
   encapsulation: ViewEncapsulation.None,
  providers: [ TicketsService ]
})
export class TicketsComponent implements OnInit {
	public status:string ='all';
 @ViewChild('sidenav') sidenav: any;
 @ViewChild('reply') replydiv ;
  public settings: Settings;
  public answers:any;
  public sidenavOpen:boolean = true;
  public tickets: Array<Ticket>;
  public ticketList: Array<Ticket>;
  public clients: Array<any>;
  public servers: Array<any>;
  public serversList: Array<any>;
  public questions=[];
  public types=[];
  public ticket: Ticket;
  public newTicket: boolean;
  public replyTicket: boolean;
 
  public showSearch:boolean = false;
  public searchText: string;
  public form:FormGroup;
   public replyForm:FormGroup;

  constructor(private ticketsService:TicketsService,public appSettings:AppSettings, 
              public formBuilder: FormBuilder,public dialog: MatDialog, 
              public snackBar: SnackbarService,private ref: ChangeDetectorRef ) { 

  }

get addDynamicElement() {
  return this.form.get('answers') as FormArray
}

addItems() {
  this.addDynamicElement.push(this.formBuilder.control(false))
}


  ngOnInit() {
 this.getTickets();  

  	 
    if(window.innerWidth <= 992){
      this.sidenavOpen = false;
    }



    this.form = this.formBuilder.group({
      'client_id': [null, Validators.required],
      'server_id': [null, Validators.required],
      'type':[null, Validators.required],
      'sujet': [null, Validators.required],    
      'body': [null, Validators.required],
      'answers':this.formBuilder.array([])
    });  

     this.replyForm = this.formBuilder.group({
      'ticket_id': [null, Validators.required],   
      'body': [null, Validators.required]
    });  


  }


public getTickets(){


   this.ticketsService.getTickets().subscribe(data => {
           
          this.ticketList=Ticket.list(data.tickets);
          this.clients=data.clients;
          this.serversList=data.servers;
          this.questions=data.questions;
          this.types=data.types;
          for (var i = 0; i < this.questions.length; ++i) {
 this.addItems();
}



 this.getAllTickets();  

   if (this.ticket) {
                 this.viewDetail(this.ticket.id);
                }


        });

}

scroll(el: HTMLElement) {
    el.scrollIntoView({behavior:"smooth"});


}

    public getAllTickets(){
    switch (this.status) {
      case 'all': 
        this.tickets = this.ticketsService.getAllTickets(this.ticketList);
        break;
      case 'new':
        this.tickets =  this.ticketsService.getNewTickets(this.ticketList);
        break;
      case 'read':
        this.tickets =  this.ticketsService.getReadTickets(this.ticketList);
        break;
      case 'solved':
        this.tickets =  this.ticketsService.getSolvedTickets(this.ticketList);
        break;
      case 'unsolved':
        this.tickets =  this.ticketsService.getUnsolvedTickets(this.ticketList);
        break;
    
    }   

    console.log(this.tickets);  
  }

  public viewDetail(id){
  	this.replyTicket=false;
    this.ticket = this.ticketsService.getTicket(this.tickets,id); 
    this.tickets.forEach(m => m.selected = false);

    this.ticket.selected = true;
    this.newTicket = false;
    if(window.innerWidth <= 992){
      this.sidenav.close(); 
    }
  }

public delete(){

	const dialogRef = this.dialog.open(ConfirmationComponent, {
            width: '350px',
            data: 'Do you confirm the deletion of this data?'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {

            	this.ticketsService.deleteTicket(this.ticket.id).subscribe(()=>{

            		this.getTickets();


this.snackBar.open('supprimé avec succès', 'success');

            	})
               
                    
               
            }
        });
}

  public compose(){
    this.ticket = null;
    this.replyTicket=false;
    this.newTicket = true;
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
     
(ticket.id) ? this.updateTicket(ticket) : this.addTicket(ticket);

      this.form.reset();     
    }
  }

    public replySubmit(reply){
   
    this.replyTicket=false;
   
   if (this.replyForm.valid) {
     
 (reply.id) ? this.updateReply(reply) : this.addReply(reply);

      this.form.reset();     
    }

     this.replyForm.reset();
  }


 public addTicket(ticket) {
        this.ticketsService.addTicket(ticket).subscribe(data => {


            this.getTickets();
            this.newTicket=false;

            this.snackBar.open('ajouter avec succès', 'success');


        });
    }

    public updateTicket(ticket) {
        this.ticketsService.updateTicket(ticket).subscribe(() => {
            this.getTickets();
            this.snackBar.open('mise à jour avec succès', 'success');


        });
    }



     public addReply(reply) {
        this.ticketsService.addReply(reply).subscribe(data => {


            this.getTickets();
            this.newTicket=false;

            this.snackBar.open('ajouter avec succès', 'success');


        });
    }

    public updateReply(reply) {
        this.ticketsService.updateTicket(reply).subscribe(() => {
            this.getTickets();
            this.snackBar.open('mise à jour avec succès', 'success');


        });
    }
  public changeType(status) {
        this.ticketsService.editType(status,this.ticket.id).subscribe(() => {
            this.getTickets();
            this.snackBar.open('mise à jour avec succès', 'success');
              this.ticket = null;


        });
    }


reply(){

	
	 this.replyForm.controls['ticket_id'].setValue(this.ticket.id);

	this.replyTicket=true;
  this.ref.detectChanges();
   
  console.log(this.replydiv);

 console.log(document.querySelector('#reply')) 

  
  //this.replydiv.nativeElement.scrollIntoView();
}

clientSelect(){

const client_id=this.form.controls['client_id'].value;

if (client_id) {
  
this.servers=this.serversList.filter(servers=>servers.client_id==client_id);

}
}




}
