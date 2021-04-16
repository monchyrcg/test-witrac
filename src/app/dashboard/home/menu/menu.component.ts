import { Component } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})

export class MenuComponent {

    isOpenMobile = true;
    showSmallNavBar = false;

    constructor(

    ) { }

    changeValue(value?) {
        this.isOpenMobile = value ? value : !this.isOpenMobile;
    }

    smallNavBar() {
        this.showSmallNavBar = !this.showSmallNavBar;
    }
}