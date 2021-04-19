import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrierModuleRoutingModule } from './career-module-routing.module';
import { AddComponent, ContactsComponent, DisplayContactComponent, EditComponent, FormComponent, HomeComponent } from './components';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    HomeComponent,
    AddComponent,
    ContactsComponent,
    DisplayContactComponent,
    EditComponent,
    FormComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    CarrierModuleRoutingModule,
    ReactiveFormsModule
  ]
})
export class CarrierModuleModule { }
