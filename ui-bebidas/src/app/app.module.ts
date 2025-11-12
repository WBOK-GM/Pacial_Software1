import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BebidaCardComponent } from './components/bebida-card/bebida-card.component';
import { BebidaFormComponent } from './components/bebida-form/bebida-form.component';
import { BebidaListComponent } from './components/bebida-list/bebida-list.component';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';

@NgModule({
  declarations: [
    BebidaCardComponent,
    BebidaFormComponent,
    BebidaListComponent,
    MenuPageComponent,
    AdminPageComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule
  ],
  bootstrap: [MenuPageComponent]
})
export class AppModule { }
