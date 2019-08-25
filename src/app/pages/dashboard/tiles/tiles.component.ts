import {Component, Input, OnInit} from '@angular/core';
import {Data} from "../data";

@Component({
    selector: 'app-tiles',
    templateUrl: './tiles.component.html',
    styleUrls: ['./tiles.component.scss']
})

export class TilesComponent implements OnInit {


    @Input() stats: Data;

    constructor() {
    }

    ngOnInit() {
        console.log(this.stats);
    }

}
