import { Directive, ElementRef, OnInit, OnDestroy, Renderer2, Input } from '@angular/core';
import { timer, Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

/**
 * A `RGBValue` containers the RGB values for a step in the gradient animation
 */
export type RGBValue = [number, number, number];

export type RGBTransition = [string, string];

export enum InterpolationDirection {
  FORWARD,
  BACKWARD
}

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

  private direction = InterpolationDirection.FORWARD;

  private step$ = new BehaviorSubject<number>(0);

  private componentDestroyed$ = new Subject<boolean>();

  private gradientRunning$ = new BehaviorSubject<boolean>(true);

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    combineLatest(timer(0, this.tickSpeed), this.gradientRunning$)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(([_, gradientRunning]) => {
        if (gradientRunning) {
          let result =
            this.direction === InterpolationDirection.FORWARD
              ? this.step$.value + this.gradientSpeed
              : this.step$.value - this.gradientSpeed;

          if (result >= 1) {
            this.direction = InterpolationDirection.BACKWARD;
            result = 1;
          } else if (result <= 0) {
            this.direction = InterpolationDirection.FORWARD;
            result = 0;
          }
          this.step$.next(result);
        }
      });

    /**
     * Combine the timer and gradient running to trigger rendering
     */
    combineLatest(this.step$, this.gradientRunning$)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(([step, gradientRunning]) => gradientRunning && this.render(this.generateColour(step), step));
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

  private generateColour(step: number): RGBTransition {
    const stepIndex = 1 - step;
    const color1 = this.createColor(
      stepIndex,
      step,
      this.colors[this.colorIndices[0]],
      this.colors[this.colorIndices[1]]
    );
    const color2 = this.createColor(
      stepIndex,
      step,
      this.colors[this.colorIndices[2]],
      this.colors[this.colorIndices[3]]
    );

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
   * Set a new palette for the animation
   */
  public newPalette(): void {
    this.colorIndices[0] = this.colorIndices[1];
    this.colorIndices[2] = this.colorIndices[3];
    // pick two new target color indices
    // do not pick the same as the current one
    this.colorIndices[1] = this.getNewColour(1);
    this.colorIndices[3] = this.getNewColour(3);
  }

  /**
   * Update the gradient animation
   */
  public render(renderValue: RGBTransition, step: number) {
    this.renderer.setStyle(
      this.el.nativeElement,
      'background',
      `-webkit-gradient(linear, left top, right top, from(${renderValue[0]}), to(${renderValue[1]}))`
    );

    this.renderer.setStyle(
      this.el.nativeElement,
      'background',
      `-moz-linear-gradient(left, ${renderValue[0]} 0%, ${renderValue[1]} 100%)`
    );
  }
}
