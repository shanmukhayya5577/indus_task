import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'landing/agency', pathMatch: 'full' },
  {
    path:"landing",
    loadChildren: () => import('./landingpage/landingpage.module').then(m => m.LandingpageModule)
  },
  {
    path:"contact",
    loadChildren: () => import('./new-contact/new-contact.module').then(m => m.NewContactModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
