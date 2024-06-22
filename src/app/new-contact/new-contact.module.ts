import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewContactRoutingModule } from './new-contact-routing.module';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [
    CreateContactComponent,
    SidenavComponent
  ],
  imports: [
    CommonModule,
    NewContactRoutingModule,
    MatSidenavModule,
    MatListModule
  ]
})
export class NewContactModule { }
