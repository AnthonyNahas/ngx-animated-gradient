import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ngxAnimatedGradient]'
})
export class NgxAnimatedGradientDirective implements OnInit {

  colors = [[62, 35, 255],
    [60, 255, 60],
    [255, 35, 98],
    [45, 175, 230],
    [255, 0, 255],
    [255, 128, 0]];

  step = 0;

  // color table indices for:
  // current color left
  // next color left
  // current color right
  // next color right
  colorIndices = [0, 1, 2, 3];

  // transition speed
  gradientSpeed = 0.002;

  constructor(private renderer: Renderer2, private el: ElementRef) {
  }

  ngOnInit(): void {
    console.log('NgxAnimatedGradientDirective init');
    setInterval(() => {
      this.updateGradient();
    }, 10);

  }

  updateGradient() {

    const c0_0 = this.colors[this.colorIndices[0]];
    const c0_1 = this.colors[this.colorIndices[1]];
    const c1_0 = this.colors[this.colorIndices[2]];
    const c1_1 = this.colors[this.colorIndices[3]];

    const istep = 1 - this.step;
    const r1 = Math.round(istep * c0_0[0] + this.step * c0_1[0]);
    const g1 = Math.round(istep * c0_0[1] + this.step * c0_1[1]);
    const b1 = Math.round(istep * c0_0[2] + this.step * c0_1[2]);
    const color1 = 'rgb(' + r1 + ',' + g1 + ',' + b1 + ')';

    const r2 = Math.round(istep * c1_0[0] + this.step * c1_1[0]);
    const g2 = Math.round(istep * c1_0[1] + this.step * c1_1[1]);
    const b2 = Math.round(istep * c1_0[2] + this.step * c1_1[2]);
    const color2 = 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')';

    this.renderer.setStyle(
      this.el.nativeElement,
      'background',
      '-webkit-gradient(linear, left top, right top, from(' + color1 + '), to(' + color2 + '))'
    );

    this.renderer.setStyle(
      this.el.nativeElement,
      'background',
      '-moz-linear-gradient(left, ' + color1 + ' 0%, ' + color2 + ' 100%)'
    );
    // $('#gradient').css({
    //   background: `-webkit-gradient(linear, left top, right top, from(' + ${color1} + '), to(' + ${color2}  + '))`
    // }).css({
    //   background: `-moz-linear-gradient(left, ${color1}  0%, ${color2}   100%)`
    // });

    this.step += this.gradientSpeed;
    if (this.step >= 1) {
      this.step %= 1;
      this.colorIndices[0] = this.colorIndices[1];
      this.colorIndices[2] = this.colorIndices[3];

      // pick two new target color indices
      // do not pick the same as the current one
      this.colorIndices[1] = (this.colorIndices[1]
        + Math.floor(1 + Math.random() * (this.colors.length - 1))) % this.colors.length;
      this.colorIndices[3] = (this.colorIndices[3]
        + Math.floor(1 + Math.random() * (this.colors.length - 1))) % this.colors.length;

    }
  }

}
