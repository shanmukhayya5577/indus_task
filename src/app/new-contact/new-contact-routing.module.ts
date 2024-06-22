import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { SidenavComponent } from './sidenav/sidenav.component';

const routes: Routes = [
  {path:"",component:SidenavComponent,
    children:[
    {path:'create',loadChildren:()=>import('./dashboard/dashboard.module').then(m=>m.DashboardModule)},
   ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewContactRoutingModule { }
