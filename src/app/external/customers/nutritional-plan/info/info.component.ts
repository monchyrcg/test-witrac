import { Input } from "@angular/core";
import { Output } from "@angular/core";
import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
    selector: "app-nutritional-plan-info",
    templateUrl: "./info.component.html",
    //styleUrls: ["./nutritional-plan.component.scss"]
})
export class NutritionalPlanInfoComponent implements OnInit, OnDestroy {

    @Input() meal;
    @Output() closeModal;

    ngOnInit(): void {

    }

    closeModalF() {
        this.closeModal();
    }

    ngOnDestroy(): void {
        //throw new Error("Method not implemented.");
    }

}