import { Component, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CustomerService } from 'src/app/shared/services/customer.service';



@Component({
    selector: 'app-appointment',
    templateUrl: './appointment.component.html',
    // styleUrls: ['./appointment.component.scss'],
})

export class AppointmentComponent implements OnInit, OnDestroy {

    @Input() title: string;
    @Input() text_button_create: string;
    @Output() closeModal;

    searchText = '';
    characters = [
        'Ant-Man',
        'Aquaman',
        'Asterix',
        'The Atom',
        'The Avengers',
        'Batgirl',
        'Batman',
        'Batwoman',
        'Black Canary',
        'Black Panther',
        'Captain America',
        'Captain Marvel',
        'Catwoman',
        'Conan the Barbarian',
        'Daredevil',
        'The Defenders',
        'Doc Savage',
        'Doctor Strange',
        'Elektra',
        'Fantastic Four',
        'Ghost Rider',
        'Green Arrow',
        'Green Lantern',
        'Guardians of the Galaxy',
        'Hawkeye',
        'Hellboy',
        'Incredible Hulk',
        'Iron Fist',
        'Iron Man',
        'Marvelman',
        'Robin',
        'The Rocketeer',
        'The Shadow',
        'Spider-Man',
        'Sub-Mariner',
        'Supergirl',
        'Superman',
        'Teenage Mutant Ninja Turtles',
        'Thor',
        'The Wasp',
        'Watchmen',
        'Wolverine',
        'Wonder Woman',
        'X-Men',
        'Zatanna',
        'Zatara',
    ]

    private subscription = new Subscription();

    constructor(
        private customerService: CustomerService
    ) { }


    ngOnInit(): void {

    }

    closeModalF() {
        this.closeModal();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}