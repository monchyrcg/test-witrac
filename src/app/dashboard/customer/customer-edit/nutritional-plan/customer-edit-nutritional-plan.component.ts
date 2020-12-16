import { Component, OnInit } from "@angular/core";
import { CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { fil } from "date-fns/locale";
import { filter } from "rxjs/operators";

@Component({
    selector: "customer-edit-nutritional-plan",
    templateUrl: "./customer-edit-nutritional-plan.component.html",
    styleUrls: ["./customer-edit-nutritional-plan.component.scss"]
})
export class CustomerEditNutritionalPlanComponent implements OnInit {

    items = [];

    menus = [
        {
            id: 1,
            type: 2,
            name: 'Menu 1'
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
    products = [
        {
            id: 1,
            type: 1,
            name: "Carrots"
        },
        {
            id: 2,
            type: 1,
            name: "Tomatoes"
        },
        {
            id: 3,
            type: 1,
            name: "Onions"
        },
        {
            id: 4,
            type: 1,
            name: "Apples"
        },
        {
            id: 5,
            type: 1,
            name: "Avocados"
        },
        {
            id: 6,
            type: 1,
            name: "Oranges"
        },
        {
            id: 7,
            type: 1,
            name: "Bananas"
        },
    ];

    breakfasts = [];
    lunchs = [];
    meals = [];
    snacks = [];
    dinners = [];

    ngOnInit(): void {
        this.items = this.products;
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

    drop(event: CdkDragDrop<string[]>) {
        if (event.container.id !== event.previousContainer.id) {
            copyArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        }
    }

    deleteElement(type, event) {
        this[type] = this[type].filter(function (value, index, arr) {
            if (value.id !== event.id) {
                return value;
            }
        });
    }
}