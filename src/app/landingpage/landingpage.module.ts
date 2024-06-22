import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingpageRoutingModule } from './landingpage-routing.module';
import { LandingAgencyComponent } from './landing-agency/landing-agency.component';
import { ServicesComponent } from './services/services.component';
import { OurStoryComponent } from './our-story/our-story.component';


@NgModule({
  declarations: [
    LandingAgencyComponent,
    ServicesComponent,
    OurStoryComponent
  ],
  imports: [
    CommonModule,
    LandingpageRoutingModule
  ], 
  exports:[
    LandingAgencyComponent,
    ServicesComponent,
    OurStoryComponent
  ]
})
export class LandingpageModule { }
