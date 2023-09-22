import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Módulos
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';

import { AppComponent } from './app.component';
import { NotFound404Component } from './not-found404/not-found404.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFound404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
