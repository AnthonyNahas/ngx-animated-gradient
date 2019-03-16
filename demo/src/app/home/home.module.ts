import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  NgxAnimatedGradientModule  } from 'ngx-animated-gradient';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
    imports: [
        CommonModule,
        NgxAnimatedGradientModule.forRoot(),
        HomeRoutingModule,
    ],
    declarations: [HomeComponent],
})
export class HomeModule { }
