import { Directive, ElementRef, OnInit, OnDestroy, Renderer2, Input } from '@angular/core';
import { timer, Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

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
   * The tick speed for calling the update of the gradient
   */
  @Input()
  tickSpeed = 16;

  /**
   * The color indices, these indicate where in the color table to load from
   * The order is as follows:
   *   Current left, Next left, Current right, Next right
   */
  @Input()
  colorIndices = [0, 1, 2, 3];

  /**
   * The multiplier for the gradient speed
   */
  @Input()
  gradientSpeed = 0.002;

  private step$ = new BehaviorSubject<number>(0);

  private componentDestroyed$ = new Subject<boolean>();

  private gradientRunning$ = new BehaviorSubject<boolean>(true);

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    /**
     * Combine the timer and gradient running to trigger rendering
     */
    combineLatest(timer(0, this.tickSpeed), this.gradientRunning$)
      .pipe(
        takeUntil(this.componentDestroyed$),
        tap(([_, gradientRunning]) => gradientRunning && this.render())
      )
      .subscribe();

    /**
     * Set up the change in pallate as a side effect of the step changing
     */
    this.step$
      .pipe(
        takeUntil(this.componentDestroyed$),
        tap((step: number) => {
          if (step >= 1) {
            this.step$.next((step %= 1));
            this.colorIndices[0] = this.colorIndices[1];
            this.colorIndices[2] = this.colorIndices[3];
            // pick two new target color indices
            // do not pick the same as the current one
            this.colorIndices[1] = this.getNewColour(1);
            this.colorIndices[3] = this.getNewColour(3);
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.gradientRunning$.next(false);
    this.componentDestroyed$.next(true);

    this.gradientRunning$.complete();
    this.componentDestroyed$.complete();
  }

  private createColor(index: number, step: number, value1: RGBValue, value2: RGBValue) {
    const red = Math.round(index * value1[0] + step * value2[0]);
    const green = Math.round(index * value1[1] + step * value2[1]);
    const blue = Math.round(index * value1[2] + step * value2[2]);
    return `rgb(${red}, ${green}, ${blue})`;
  }

  private getNewColour(index: number) {
    return (this.colorIndices[index] + Math.floor(1 + Math.random() * (this.colors.length - 1))) % this.colors.length;
  }

  private generateColour() {
    const step = this.step$.value;
    const c0_0: RGBValue = this.colors[this.colorIndices[0]];
    const c0_1: RGBValue = this.colors[this.colorIndices[1]];
    const c1_0: RGBValue = this.colors[this.colorIndices[2]];
    const c1_1: RGBValue = this.colors[this.colorIndices[3]];

    const stepIndex = 1 - step;
    const color1 = this.createColor(stepIndex, step, c0_0, c0_1);
    const color2 = this.createColor(stepIndex, step, c1_0, c1_1);

    return [color1, color2];
  }

  /**
   * Start the directive gradient animation
   */
  public start(): void {
    this.gradientRunning$.next(true);
  }

  /**
   * Stop the directive gradient animation
   */
  public stop(): void {
    this.gradientRunning$.next(false);
  }

  /**
   * Update the gradient animation
   */
  public render() {
    const [color1, color2] = this.generateColour();

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

    let result = this.step$.value + this.gradientSpeed;
    if (Number.isNaN(result)) {
      result = 0;
    }
    this.step$.next(result);
  }
}
