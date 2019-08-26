import {Component,Input} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router, UrlSegment} from "@angular/router";
import {Title} from '@angular/platform-browser';
import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';
import {MenuService} from '../../theme/components/menu/menu.service';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss'],
    providers: [MenuService]
})
export class BreadcrumbComponent {

     @Input() public breadcrumb:string;

    public pageTitle: string;
    public breadcrumbs: {
        name: string;
        url: string
    }[] = [];

    public settings: Settings;

    constructor(public appSettings: AppSettings,
                public router: Router,
                public activatedRoute: ActivatedRoute,
                public title: Title,
                private menuService: MenuService) {
        this.settings = this.appSettings.settings;
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.breadcrumbs = [];
                this.parseRoute(this.router.routerState.snapshot.root);
                this.pageTitle = "";
                this.breadcrumbs.forEach(breadcrumb => {
                    this.pageTitle += ' > ' + breadcrumb.name;
                })
                this.title.setTitle(this.settings.name + this.pageTitle);
            }
        })
    }

    private parseRoute(node: ActivatedRouteSnapshot) {
        if (node.data['breadcrumb']) {
console.log(this.breadcrumb)

const name=  (this.breadcrumb && node.data['breadcrumb'] =='show' ) ? this.breadcrumb : node.data['breadcrumb']; 

            if (node.url.length) {
                let urlSegments: UrlSegment[] = [];
                node.pathFromRoot.forEach(routerState => {
                    urlSegments = urlSegments.concat(routerState.url);
                });
                let url = urlSegments.map(urlSegment => {
                    return urlSegment.path;
                }).join('/');
                this.breadcrumbs.push({
                    name: name,
                    url: '/' + url
                })
            }
             console.log(node.data['breadcrumb']);
        }
        if (this.breadcrumb,node.firstChild) {
          
            this.parseRoute(node.firstChild);
        }
    }

    public closeSubMenus() {
        // tslint:disable-next-line:triple-equals
        if (this.settings.menu == 'vertical') {
            this.menuService.closeAllSubMenus();
        }
    }


}
