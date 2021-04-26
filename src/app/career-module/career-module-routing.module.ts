import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent , EditComponent, HomeComponent } from './components';
const routes: Routes = [
  {path:"",redirectTo:"home",pathMatch:"full"},
  {path:"home",component:HomeComponent},
  {path:"home/:id",component:HomeComponent},
  {path:"home/edit/:id",component:EditComponent},
  {path:"add",component:AddComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarrierModuleRoutingModule { }
