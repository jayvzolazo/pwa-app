import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';


@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    RouterModule,
    HomePageRoutingModule
  ]
})
export class HomePageModule { }
