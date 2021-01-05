import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AutocompleteMapService {

    renderExternalScript(locale): HTMLScriptElement {
        // install google maps
        let node = document.createElement('script');
        console.log(locale);
        node.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB1ilL7-RLiGsfPuDbTnNXIVSX0g_WbYeI&libraries=places&language=' + locale;
        node.type = 'text/javascript';
        node.id = 'script_maps';
        node.async = true;
        document.getElementsByTagName('head')[0].appendChild(node);
        return node;
    }

    autoComplete($event): string {
        let postal_code = null;
        const componentForm = {
            postal_code: "short_name",
        };

        $event.address_components.forEach(element => {
            const addressType = element.types[0];

            if (componentForm[addressType]) {
                postal_code = element[componentForm[addressType]];

            }
        });

        return postal_code;
    }
}