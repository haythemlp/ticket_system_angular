import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import {AppSettings} from '../../../../app.settings';
import {Settings} from '../../../../app.settings.model';
import {MenuService} from '../menu.service';
import {Menu} from '../menu.model';

@Component({
    selector: 'app-vertical-menu',
    templateUrl: './vertical-menu.component.html',
    styleUrls: ['./vertical-menu.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [MenuService]
})
export class VerticalMenuComponent implements OnInit {
    public role = 'admin';
    public user = JSON.parse(localStorage.getItem('user'));

    @Input('menuItems') menuItems;
    @Input('menuParentId') menuParentId;
    parentMenu: Array<any>;
    public settings: Settings;

    constructor(public appSettings: AppSettings, public menuService: MenuService) {
        this.settings = this.appSettings.settings;
    }

    ngOnInit() {

        this.generateMenu();
    }

    public generateMenu() {

        this.parentMenu = this.menuItems.filter(item => item.parentId == this.menuParentId);

    }


    onClick(menuId) {
        this.menuService.toggleMenuItem(menuId);
        this.menuService.closeOtherSubMenus(this.menuItems, menuId);
    }

    checkRole(menu: Menu) {

        const listMenu = JSON.parse(this.user.role.menu);

        let a = listMenu.indexOf(+menu.id);

        return a != -1 ? true : false;


    }


}
