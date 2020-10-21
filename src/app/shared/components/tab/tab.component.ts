import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Tab } from '../../interfaces/tab.interface';
import { TabsComponent } from '../tabs/tabs.component';

@Component({
    selector: 'app-tab',
    templateUrl: './tab.component.html',
    // styleUrls: ['./customer-edit.component.scss']
})
export class TabComponent implements OnInit, Tab {

    @Input() title: string;
    public isActive: boolean = false;

    constructor(
        public tabsComponent: TabsComponent
    ) { }

    ngOnInit(): void {
        this.tabsComponent.addTabs(this);
    }
}