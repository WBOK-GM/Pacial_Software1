import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { MenuPageComponent } from './app/pages/menu-page/menu-page.component';

bootstrapApplication(MenuPageComponent, appConfig)
  .catch(err => console.error(err));
