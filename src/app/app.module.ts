import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import {ReactiveFormsModule} from '@angular/forms'

import {RouterModule} from '@angular/router';

import { CarrierModuleModule } from './career-module/career-module.module';
import {AppComponent,NavigationComponent} from './components'
// import {HomeComponent,AddComponent,ContactsComponent,DisplayContactComponent,DetailsModificationComponent,FormComponent,EditComponent,ContactsDataService} from './career-module'

@NgModule({
  declarations: [
    AppComponent,
    // HomeComponent,
    // AddComponent,
    // ContactsComponent,
    // DisplayContactComponent,
    // DetailsModificationComponent,
    // FormComponent,
    // EditComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    CarrierModuleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
