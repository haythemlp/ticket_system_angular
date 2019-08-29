export class Ticket {

    public id: number;
    public client_id: number;
    public server_id: number;
    public type_id: number;
    public client: string;
    public server: string;
    public sujet: string;
    public body: string;
    public type: number;
    public status: string;
    public questions: [];
    public created_at: Date;
    public selected: boolean;
    public replies: [];

    static list = (data) => {

        let tickets = [];


        for (var i = 0; i < data.length; i++) {
            let t = data[i];

            let ticket = new Ticket();
            ticket.id = parseInt(t.id);
            ticket.client_id = t.client_id;
            ticket.server_id = t.server_id;
            ticket.sujet = t.sujet;
            ticket.body = t.body;
            ticket.created_at = t.created_at;
            ticket.client = t.client.name;
            ticket.status = t.status;
            ticket.type = t.type.text;
              ticket.type_id = t.type_id;
            ticket.questions = (t.questions) ? JSON.parse(t.questions) : [];
            ticket.selected = false;
            ticket.replies = t.replies;

            tickets.push(ticket);

        }

        return tickets;
    };


}

export class Question {

    public id: number;
    public text: string;

}

export class Category {

    public id: number;
    public text: string;


}


export class Reply {

public id:number;
public user_id: number;
public ticket_id: number;
public body:string;


    constructor(id:number,ticket_id:number,body:string){

        this.id=id;
        this.ticket_id=ticket_id;
        this.body=body;
    }
}
