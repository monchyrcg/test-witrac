import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})

export class AppComponent {

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('fr');
  }
}
