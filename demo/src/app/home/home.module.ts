import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxAnimatedGradientModule} from 'ngx-animated-gradient';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {MarkdownModule} from 'ngx-markdown';

@NgModule({
  imports: [
    CommonModule,
    NgxAnimatedGradientModule,
    MarkdownModule.forChild(),
    HomeRoutingModule,
  ],
  declarations: [HomeComponent],
})
export class HomeModule {
}
