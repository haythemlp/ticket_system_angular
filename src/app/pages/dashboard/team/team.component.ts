import { Component, OnInit,Input } from '@angular/core';
import {environment} from "../../../../environments/environment.prod";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  public mediaUrl = environment.mediaUrl;
  public url = environment.url;
  @Input() team;
  constructor() { }

  ngOnInit() {
  }



}
