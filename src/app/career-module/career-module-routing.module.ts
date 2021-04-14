import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddComponent ,EditComponent,HomeComponent} from './components';



const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"home/:id",component:HomeComponent},
  
  {path:"add",component:AddComponent},
  {path:"",redirectTo:"home",pathMatch:"full"},
  {path:"edit",component:EditComponent},
  {path:"edit/:id",component:EditComponent}
  
  
  
  
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarrierModuleRoutingModule { }
