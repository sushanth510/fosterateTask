import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrierModuleRoutingModule } from './career-module-routing.module';
import { AddComponent, ContactsComponent, DisplayContactComponent, EditComponent, FormComponent, HomeComponent } from './components';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

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
    ReactiveFormsModule,
    NgxSkeletonLoaderModule.forRoot(),
  ]
})
export class CarrierModuleModule { }
