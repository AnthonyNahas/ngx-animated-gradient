import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NgxAnimatedGradientDirective} from './ngx-animated-gradient.directive';


// Export module's public API
export {NgxAnimatedGradientDirective} from './ngx-animated-gradient.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [NgxAnimatedGradientDirective],
  declarations: [NgxAnimatedGradientDirective]
})
export class NgxAnimatedGradientModule {

}
