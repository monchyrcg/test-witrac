import { Input } from "@angular/core";
import { Output } from "@angular/core";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-nutritional-plan-info",
    templateUrl: "./info.component.html"
})
export class NutritionalPlanInfoComponent {

    @Input() meal;
    @Output() closeModal;

    closeModalF() {
        this.closeModal();
    }
}