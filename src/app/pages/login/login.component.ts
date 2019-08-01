import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {emailValidator} from '../../theme/utils/app-validators';
import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {


    public form: FormGroup;
    public settings: Settings;

    constructor(public appSettings: AppSettings, public fb: FormBuilder, public router: Router, private authService: AuthService) {
        this.settings = this.appSettings.settings;
        this.form = this.fb.group({
            'email': [null, Validators.compose([Validators.required, emailValidator])],
            'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
            'rememberMe': false
        });
    }

    public onSubmit(values: Object): void {
        if (this.form.valid) {

            this.authService.login({email: 'haythamov@gmail.com', password: '12345678'});
            //this.router.navigate(['/']);
        }
    }

    ngAfterViewInit() {
        this.settings.loadingSpinner = false;
    }
}
