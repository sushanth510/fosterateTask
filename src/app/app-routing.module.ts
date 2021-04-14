import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { AddComponent } from './career-module/components/add/add.component';
// import { EditComponent } from './career-module/components/edit/edit.component';
// import { HomeComponent } from './career-module/components/home/home.component';

const routes: Routes = [
  // {path:"home",component:HomeComponent},
  // {path:"home/:id",component:HomeComponent},
  
  // {path:"add",component:AddComponent},
  // {path:"",redirectTo:"home",pathMatch:"full"},
  // {path:"edit",component:EditComponent},
  // {path:"edit/:id",component:EditComponent}

  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
