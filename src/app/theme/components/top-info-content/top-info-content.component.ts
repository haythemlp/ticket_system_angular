import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from '../../utils/app-validators';
import {environment} from "../../../../environments/environment.prod";
import {User} from '../../../pages/users/user.model';

@Component({
  selector: 'app-top-info-content',
  templateUrl: './top-info-content.component.html',
  styleUrls: ['./top-info-content.component.scss']
})
export class TopInfoContentComponent implements OnInit {

    public mediaUrl: string = environment.mediaUrl;
    public url: string = environment.url;
     public user: User;

  @Input('showInfoContent') showInfoContent:boolean = false;
  @Output() onCloseInfoContent: EventEmitter<any> = new EventEmitter();
  contactForm: FormGroup;
  controls = [
    { name: 'Notifications', checked: true },
    { name: 'Tasks', checked: true },
    { name: 'Events', checked: false },
    { name: 'Downloads', checked: true },
    { name: 'Messages', checked: true },
    { name: 'Updates', checked: false },
    { name: 'Settings', checked: true }
  ]
  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
            this.user = JSON.parse(localStorage.getItem('user'));
    this.contactForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, emailValidator])],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  public onContactFormSubmit(values:Object):void {
    if (this.contactForm.valid) {
      console.log(values);
    }
  }

  public closeInfoContent(event){
    this.onCloseInfoContent.emit(event);
  }

}
