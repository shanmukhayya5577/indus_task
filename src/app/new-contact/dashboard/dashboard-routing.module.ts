import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDataComponent } from './add-data/add-data.component';
import { GetDataComponent } from './get-data/get-data.component';

const routes: Routes = [
  {path:'',redirectTo:'/contact/create/add-data',pathMatch:'full'},
  {path:'add-data',component:AddDataComponent},
  {path:'get-data',component:GetDataComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
