import {Component} from '@angular/core';
import {AppSettings} from './app.settings';
import {Settings} from './app.settings.model';
import {SnackbarService} from './services/snackbar.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public settings: Settings;

    constructor(public appSettings: AppSettings, public snackBar: SnackbarService) {
        this.settings = this.appSettings.settings;
    }

    ngOnInit() {
    }
}
