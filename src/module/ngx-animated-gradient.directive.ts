import { Directive, ElementRef, OnInit, OnDestroy, Renderer2, Input } from '@angular/core';
import { timer, Subject, BehaviorSubject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * A `RGBValue` containers the RGB values for a step in the gradient animation
 */
export type RGBValue = [number, number, number];

@Directive({
  selector: '[ngxAnimatedGradient]'
})
export class NgxAnimatedGradientDirective implements OnInit, OnDestroy {
  /**
   * A list of RGB Value tuples used to define the gradient
   */
  @Input()
  colors: RGBValue[] = [[62, 35, 255], [60, 255, 60], [255, 35, 98], [45, 175, 230], [255, 0, 255], [255, 128, 0]];

  /**
   * The step value used in the animation
   */
  @Input()
  step = 0;

  /**
   * The tick speed for calling the update of the gradient
   */
  @Input()
  tickSpeed = 16;

  // color table indices for:
  // current color left
  // next color left
  // current color right
  // next color right
  @Input()
  colorIndices = [0, 1, 2, 3];

  /**
   * The multiplier for the gradient speed
   */
  @Input()
  gradientSpeed = 1;

  private gradientStopped$ = new BehaviorSubject<boolean>(false);

  private gradientTimer = timer(this.tickSpeed)
      .pipe(takeUntil(this.gradientStopped$))
      .subscribe(() => this.updateGradient());

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.gradientStopped$.next(false);
  }

  ngOnDestroy() {
    this.gradientStopped$.next(true);
    this.gradientStopped$.complete();
  }

  private createColor(index: number, step: number, value1: number, value2: number) {
    return Math.round(index * value1 + step * value2);
  }

  private getColours() {
    const c0_0: RGBValue = this.colors[this.colorIndices[0]];
    const c0_1: RGBValue = this.colors[this.colorIndices[1]];
    const c1_0: RGBValue = this.colors[this.colorIndices[2]];
    const c1_1: RGBValue = this.colors[this.colorIndices[3]];

    const stepIndex = 1 - this.step;
    const r1 = this.createColor(stepIndex, this.step, c0_0[0], c0_1[0]);
    const g1 = this.createColor(stepIndex, this.step, c0_0[1], c0_1[1]);
    const b1 = this.createColor(stepIndex, this.step, c0_0[2], c0_1[2]);
    const color1 = `rgb(${r1}, ${g1}, ${b1})`;

    const r2 = this.createColor(stepIndex, this.step, c1_0[0], c1_1[0]);
    const g2 = this.createColor(stepIndex, this.step, c1_0[1], c1_1[1]);
    const b2 = this.createColor(stepIndex, this.step, c1_0[2], c1_1[2]);
    const color2 = `rgb(${r2}, ${g2}, ${b2})`;

    return [color1, color2];
  }

  public stop(): void {
    this.gradientStopped$.next(true);
  }

  public start(): void {
    this.gradientStopped$.next(false);
  }

  public updateGradient() {
    const [color1, color2] = this.getColours();

    this.renderer.setStyle(
      this.el.nativeElement,
      'background',
      `-webkit-gradient(linear, left top, right top, from(${color1}), to(${color2}))`
    );

    this.renderer.setStyle(
      this.el.nativeElement,
      'background',
      `-moz-linear-gradient(left, ${color1} 0%, ${color2} 100%)`
    );

    this.step += this.gradientSpeed;
    if (this.step >= 1) {
      this.step %= 1;
      this.colorIndices[0] = this.colorIndices[1];
      this.colorIndices[2] = this.colorIndices[3];

      // pick two new target color indices
      // do not pick the same as the current one
      this.colorIndices[1] =
        (this.colorIndices[1] + Math.floor(1 + Math.random() * (this.colors.length - 1))) % this.colors.length;
      this.colorIndices[3] =
        (this.colorIndices[3] + Math.floor(1 + Math.random() * (this.colors.length - 1))) % this.colors.length;
    }
  }
}
