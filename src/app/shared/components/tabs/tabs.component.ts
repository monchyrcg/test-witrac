import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Tab } from '../../interfaces/tab.interface';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
})

export class TabsComponent implements OnInit {

    public tabs: Tab[] = [];

    constructor(
        private location: Location
    ) { }

    ngOnInit(): void {

    }

    addTabs(tab: Tab) {
        /* if (this.tabs.length == 0) {
            tab.isActive = true;
        } */
        this.tabs.push(tab);
    }

    selectTab(tab: Tab) {
        for (let tab of this.tabs) {
            tab.isActive = false;
        }
        tab.isActive = true;

        const path = this.location.path().split('?')[0];
        this.location.replaceState(path + "?tab=" + tab.slug);
    }

    selectTabMobile(index: number) {
        this.selectTab(this.tabs[index]);
    }
}