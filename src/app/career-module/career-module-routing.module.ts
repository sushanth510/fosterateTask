import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent ,EditComponent, HomeComponent } from './components';
const routes: Routes = [
  {path:"",redirectTo:"home",pathMatch:"full"},
  {path:"home",component:HomeComponent},
  {path:"home/:id",component:HomeComponent},
  {path:"add",component:AddComponent},
  {path:"edit/:id",component:EditComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarrierModuleRoutingModule { }
