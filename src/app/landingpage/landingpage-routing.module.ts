import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingAgencyComponent } from './landing-agency/landing-agency.component';
import { ServicesComponent } from './services/services.component';
import { OurStoryComponent } from './our-story/our-story.component';

const routes: Routes = [
  {path:"agency",component:LandingAgencyComponent},
  {path:"services",component:ServicesComponent},
  {path:"ourstory",component:OurStoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingpageRoutingModule { }
