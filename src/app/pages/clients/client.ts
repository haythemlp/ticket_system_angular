export class Client {

    id: number;
    name: string;
    num_contrat: string;
    npa: string;
    address: string;
    localite: string;
    type: string;
    num_emp: string;
    nrc: string;
    email: string;
    tel: string;
    mobile: string;

    contacts: Contact[];

}


export class Contact {

    id: number;
    fname: string;
    lname: string;
    fonction: string;
    email: string;
    tel: string;
    mobile: string;
    client_id: number;
    birth_date: Date;


}
