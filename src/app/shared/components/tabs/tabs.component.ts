import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Tab } from '../../interfaces/tab.interface';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    // styleUrls: ['./customer-edit.component.scss']
})

export class TabsComponent implements OnInit {

    public tabs: Tab[] = [];

    constructor() { }

    ngOnInit(): void {

    }

    addTabs(tab: Tab) {
        if (this.tabs.length == 0) {
            tab.isActive = true;
        }
        this.tabs.push(tab);
    }

    selectTab(tab: Tab) {
        for (let tab of this.tabs) {
            tab.isActive = false;
        }

        tab.isActive = true;
    }
}