import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BreadCrumb } from '../../interfaces/breadcumb.interface';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent implements OnInit {

    static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';
    readonly home = { icon: 'pi pi-home', url: 'home' };
    menuItems: any[] = [];

    constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.createBreadcrumbs();
    }

    private createBreadcrumbs() {
        let routerUrl: string, routerList: Array<any>, target: any;

        this.router.events.subscribe((router: any) => {
            routerUrl = router.urlAfterRedirects;
            if (routerUrl && typeof routerUrl === 'string') {

                // target = this.menu;
                this.menuItems.length = 0;

                routerList = routerUrl.slice(1).split('/');
                routerList.forEach((router, index) => {
                    /* target = target.find(page => {
                        console.log(page);
                        page.path.slice(2) === router;
                    }); */

                    this.menuItems.push({
                        name: router,

                        // path: (index === 0) ? target.path : `${this.menuItems[index - 1].path}/${target.path.slice(2)}`
                    });

                    // if (index + 1 !== routerList.length) {
                    //     target = target.children;
                    // }
                });
            }
        });
    }
}