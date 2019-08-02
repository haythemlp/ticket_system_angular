import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Server } from './server';

@Injectable({
  providedIn: 'root'
})
export class ServersService {


    public appUrl="http://127.0.0.1:8000/api/servers";
    public token =localStorage.getItem('token');
    constructor(public http:HttpClient) { }



    public  getSevers(): Observable<Server[]> {
     

return  this.http.get<Server[]>(this.appUrl+'?token='+this.token);

    }
   
 

    addSever(server:Server){	    
        return this.http.post(this.appUrl, server);
    }

    updateSever(server:Server){
        return this.http.put(this.appUrl, server);
    }

    deleteSever(id: number) {
        return this.http.delete(this.appUrl + "/" + id);
    } 
}
