import {Injectable, NgZone} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class SnackbarService {

    constructor(public snackBar: MatSnackBar, private zone: NgZone) {
    }


    public open(message, action = 'success') {

        this.zone.run(() => {
            this.snackBar.open(message, 'X', {
                duration: 2000,
                verticalPosition: 'top',
                horizontalPosition: 'end',
                panelClass: ['snackbar', action]
            });
        });
    }

}
