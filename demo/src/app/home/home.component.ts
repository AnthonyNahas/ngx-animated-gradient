import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import sdk from '@stackblitz/sdk';
import { NgxAnimatedGradientDirective } from 'ngx-animated-gradient';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild(NgxAnimatedGradientDirective) directive: NgxAnimatedGradientDirective;

  constructor(private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle('Home | ngx-animated-gradient');
  }

  ngAfterViewInit() {}

  public startGradient() {
    this.directive.start();
  }

  public stopGradient() {
    this.directive.stop();
  }

  public newPalette() {
    this.directive.newPalette();
  }

  editOnStackBlitz() {
    sdk.openGithubProject('AnthonyNahas/ngx-animated-gradient/tree/master/demo');
  }
}
