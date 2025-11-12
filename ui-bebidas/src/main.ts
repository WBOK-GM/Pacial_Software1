import { bootstrapApplication } from '@angular/platform-browser';
import { MenuPageComponent } from './app/pages/menu-page/menu-page.component';

bootstrapApplication(MenuPageComponent)
  .catch(err => console.error(err));
