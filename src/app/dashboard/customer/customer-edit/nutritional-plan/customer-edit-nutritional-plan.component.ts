import { Component, OnInit } from "@angular/core";
import { CdkDrag, CdkDragDrop, copyArrayItem } from "@angular/cdk/drag-drop";
import { Subscription } from "rxjs";

@Component({
    selector: "customer-edit-nutritional-plan",
    templateUrl: "./customer-edit-nutritional-plan.component.html",
    styleUrls: ["./customer-edit-nutritional-plan.component.scss"]
})
export class CustomerEditNutritionalPlanComponent implements OnInit {

    items = [];

    dishes = [
        {
            id: 1,
            type: 3,
            name: "Arroz Cubana"
        },
        {
            id: 2,
            type: 3,
            name: "Cocido"
        },
        {
            id: 3,
            type: 3,
            name: "Tortilla"
        },
        {
            id: 4,
            type: 3,
            name: "Pescado frito"
        },
    ];
    menus = [
        {
            id: 1,
            type: 2,
            name: 'Menu 1',
            dishes: this.dishes
        },
        {
            id: 2,
            type: 2,
            name: 'Menu 2'
        },
        {
            id: 3,
            type: 2,
            name: 'Menu 3'
        },
        {
            id: 4,
            type: 2,
            name: 'Menu 4'
        },
    ];
    products = [
        {
            id: 1,
            type: 1,
            name: "Levanat"
        },
        {
            id: 2,
            type: 1,
            name: "Sobres"
        },
        {
            id: 3,
            type: 1,
            name: "Pastillas"
        },
        {
            id: 4,
            type: 1,
            name: "Natillas"
        },
        {
            id: 1,
            type: 1,
            name: "Levanat"
        },
        {
            id: 2,
            type: 1,
            name: "Sobres"
        },
        {
            id: 3,
            type: 1,
            name: "Pastillas"
        },
        {
            id: 4,
            type: 1,
            name: "Natillas"
        },
        {
            id: 1,
            type: 1,
            name: "Levanat"
        },
        {
            id: 2,
            type: 1,
            name: "Sobres"
        },
        {
            id: 3,
            type: 1,
            name: "Pastillas"
        },
        {
            id: 4,
            type: 1,
            name: "Natillas"
        },
    ];

    breakfasts = [];
    lunchs = [];
    meals = [];
    snacks = [];
    dinners = [];
    complements = [];

    listProductsSubscription: Subscription = null;
    page = 1;
    per_page = 1599;

    name: string;

    loading: boolean = false;
    constructor() { }

    ngOnInit(): void {
        this.items = this.menus;
    }

    changeType(value) {
        this.items = this.returnArray(value);
    }

    private returnArray(value) {
        switch (value) {
            case '1':
                return this.products;
                break;
            case '2':
                return this.menus;
                break;
            case '3':
                return this.dishes;
                break;
        }
    }

    noReturnPredicate() {
        return false;
    }

    drop(event: CdkDragDrop<object[]>) {
        if (event.container.id !== event.previousContainer.id) {
            if (event.item.data.type == 2) {
                this.loading = true;
                setTimeout(() => {
                    this.generateMenu(event.item.data.dishes);
                }, 800);
            } else {
                copyArrayItem(
                    event.previousContainer.data,
                    event.container.data,
                    event.previousIndex,
                    event.currentIndex
                );
            }
        }
    }

    private generateMenu(dishes) {
        this.breakfasts.push(dishes[0]);
        this.lunchs.push(dishes[1]);
        this.dinners.push(dishes[2]);
        this.loading = false;
    }

    isType(item: CdkDrag<any>) {
        return item.data.type == 1;
    }

    deleteElement(body) {
        this[body.type] = this[body.type].filter(function (value, index, arr) {
            if (value.id !== body.event.id) {
                return value;
            }
        });
    }
}