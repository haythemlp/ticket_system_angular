import { Component, OnInit, ViewEncapsulation, ViewChild, HostListener,ElementRef ,ChangeDetectorRef} from '@angular/core';
import { FormGroup, FormBuilder, Validators,FormArray,FormControl} from '@angular/forms';
import { MatDialog, MatRadioChange} from '@angular/material';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import {TicketsService} from './tickets.service';
import {Ticket,Reply} from './ticket';
import {SnackbarService} from '../../services/snackbar.service';
import {ConfirmationComponent} from '../../shared/confirmation/confirmation.component';
import {TicketReplyComponent} from './ticket-reply/ticket-reply.component';



 
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
  public editableTicket:Ticket =null;
  public newTicket: boolean;
  public replyTicket: boolean;
    public spiner: boolean = false;
 
  public showSearch:boolean = false;
  public searchText: string;
   public replyForm:FormGroup;


  constructor(private ticketsService:TicketsService,public appSettings:AppSettings,public dialog: MatDialog, 
              public snackBar: SnackbarService,private ref: ChangeDetectorRef ) { 

  }



  ngOnInit() {


     this.getTickets();  
    if(window.innerWidth <= 992){
      this.sidenavOpen = false;
    }





  }


public getTickets(){


   this.ticketsService.getTickets().subscribe(data => {
           
          this.ticketList=Ticket.list(data.tickets);
          this.clients=data.clients;
          this.serversList=data.servers;
          this.questions=data.questions;
          this.types=data.types;


 this.spiner= true;

 this.getAllTickets();  

   if (this.ticket) {
                 this.viewDetail(this.ticket.id);
                }


        });
 
   }

    scroll(el: HTMLElement) {el.scrollIntoView({behavior:"smooth"});


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

  public compose(data:Ticket){
    this.editableTicket=data;
    this.ticket = null;
    this.replyTicket=false;
    this.newTicket = true;
    



  }







  

  
  public changeType(status) {
        this.ticketsService.editType(status,this.ticket.id).subscribe(() => {
            this.getTickets();
         
              this.ticket = null;


        });
    }


 public addTicket(ticket) {
        this.ticketsService.addTicket(ticket).subscribe(data => {
         this.getTickets();
           this.newTicket=false;        });
    }

    public updateTicket(ticket) {
        this.ticketsService.updateTicket(ticket).subscribe(() => {
            this.getTickets();
             this.newTicket=false;


        });
    }



// Reply 

replyDialog(ticktReply :Reply){

  if (!ticktReply) {
    ticktReply= new Reply(null,this.ticket.id,null);
  }


 const dialogRef = this.dialog.open(TicketReplyComponent, {
           width:"700px",
            data: ticktReply
        });
        dialogRef.afterClosed().subscribe(reply => {
            if (reply) {

            (reply.id) ? this.updateReply(reply) : this.addReply(reply);

           
            }
        });
}


   public addReply(reply) {
        this.ticketsService.addReply(reply).subscribe(data => {
            this.getTickets();
            this.replyTicket=false;
        });
    }
  public updateReply(reply) {
        this.ticketsService.updateReply(reply).subscribe(() => {
            this.getTickets();  

        });
    }
     public deleteReply(reply) {


  const dialogRef = this.dialog.open(ConfirmationComponent, {
            width: '350px',
            data: 'Do you confirm the deletion of this data?'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {

              

              this.ticketsService.deleteReply(reply.id).subscribe(() =>  this.getTickets());
                    
               
            }
        });


        
    }


}
