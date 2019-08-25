import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {disk_space} from '../dashboard.data';

@Component({
    selector: 'app-tickets-chart',
    templateUrl: './tickets-chart.component.html'
})
export class TicketsChartComponent implements OnInit {

    @Input() ticket;
    public data: any[];
    public showLegend = false;
    public gradient = true;
    public colorScheme = {
        domain: ['#2F3E9E', '#D22E2E', '#378D3B', '#378DDD']
    };
    public showLabels = true;
    public explodeSlices = true;
    public doughnut = false;
    @ViewChild('resizedDiv') resizedDiv: ElementRef;
    public previousWidthOfResizedDiv: number = 0;

    constructor() {
    }

    ngOnInit() {
        this.data = disk_space;
    }

    public onSelect(event) {
        console.log(event);
    }

    ngAfterViewChecked() {
        if (this.previousWidthOfResizedDiv != this.resizedDiv.nativeElement.clientWidth) {
            setTimeout(() => this.data = [...disk_space]);
        }
        this.previousWidthOfResizedDiv = this.resizedDiv.nativeElement.clientWidth;
    }

}
