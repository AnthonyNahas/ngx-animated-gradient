<p align="center">
  <img height="256px" width="256px" style="text-align: center;" 
  src="https://cdn.jsdelivr.net/gh/AnthonyNahas/ngx-animated-gradient@master/demo/src/assets/logo.svg">
</p>

# ngx-animated-gradient - Angular Directivated that animated the gardient background

[![npm version](https://badge.fury.io/js/ngx-animated-gradient.svg)](https://badge.fury.io/js/ngx-animated-gradient),
[![npm](https://img.shields.io/badge/demo-online-ed1c46.svg)](https://AnthonyNahas.github.io/ngx-animated-gradient)
[![Join the chat at (https://gitter.im/angular-material-extensions/Lobby](https://badges.gitter.im/ngx-auth-firebaseui/Lobby.svg)](https://gitter.im/angular-material-extensions/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/AnthonyNahas/ngx-animated-gradient.svg?branch=master)](https://travis-ci.org/AnthonyNahas/ngx-animated-gradient)
[![dependency Status](https://david-dm.org/AnthonyNahas/ngx-animated-gradient/status.svg)](https://david-dm.org/AnthonyNahas/ngx-animated-gradient)
[![devDependency Status](https://david-dm.org/AnthonyNahas/ngx-animated-gradient/dev-status.svg?branch=master)](https://david-dm.org/AnthonyNahas/ngx-animated-gradient#info=devDependencies)
[![Greenkeeper Badge](https://badges.greenkeeper.io/AnthonyNahas/ngx-animated-gradient.svg)](https://greenkeeper.io/)
[![license](https://img.shields.io/github/license/AnthonyNahas/ngx-animated-gradient.svg?style=flat-square)](https://github.com/AnthonyNahas/ngx-animated-gradient/blob/master/LICENSE)

<p align="center">
  <img alt="ngx-animated-gradien demonstration" style="text-align: center; height: 400px"
   src="https://cdn.jsdelivr.net/gh/AnthonyNahas/ngx-animated-gradient@master/assets/ngx-animated-gradient.gif">
</p>

<p align="center">
  <img alt="ngx-animated-gradien demonstration" style="text-align: center; height: 400px"
   src="https://cdn.jsdelivr.net/gh/AnthonyNahas/ngx-animated-gradient@master/assets/1.png">
</p>

<p align="center">
  <img alt="ngx-animated-gradien demonstration" style="text-align: center; height: 400px"
   src="https://cdn.jsdelivr.net/gh/AnthonyNahas/ngx-animated-gradient@master/assets/2.png">
</p>

<p align="center">
  <img alt="ngx-animated-gradien demonstration" style="text-align: center; height: 400px"
   src="https://cdn.jsdelivr.net/gh/AnthonyNahas/ngx-animated-gradient@master/assets/3.png">
</p>

<p align="center">
  <img alt="ngx-animated-gradien demonstration" style="text-align: center; height: 400px"
   src="https://cdn.jsdelivr.net/gh/AnthonyNahas/ngx-animated-gradient@master/assets/4.png">
</p>


## Demo

View all the directives in action at https://AnthonyNahas.github.io/ngx-animated-gradient

## Dependencies
* [Angular](https://angular.io) (*requires* Angular 2 or higher, tested with 2.0.0)

## Installation

## 1. Install via *ng add*. (Recommended)

Now add the library via the `angular schematics`
```shell
ng add ngx-animated-gradient
```
## 2. Install via *npm*. (Alternative) 

Now install `ngx-animated-gradient` via:
```shell
npm install --save ngx-animated-gradient
```

---
##### SystemJS
>**Note**:If you are using `SystemJS`, you should adjust your configuration to point to the UMD bundle.
In your systemjs config file, `map` needs to tell the System loader where to look for `ngx-animated-gradient`:
```js
map: {
  'ngx-animated-gradient': 'node_modules/ngx-animated-gradient/bundles/ngx-animated-gradient.umd.js',
}
```
---

Once installed you need to import the main module:
```js
import { NgxAnimatedGradientModule } from 'ngx-animated-gradient';
```
The only remaining part is to list the imported module in your application module. The exact method will be slightly
different for the root (top-level) module for which you should end up with the code similar to (notice ` NgxAnimatedGradientModule .forRoot()`):
```js
import { NgxAnimatedGradientModule } from 'ngx-animated-gradient';

@NgModule({
  declarations: [AppComponent, ...],
  imports: [NgxAnimatedGradientModule.forRoot(), ...],  
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

Other modules in your application can simply import ` NgxAnimatedGradientModule `:

```js
import { NgxAnimatedGradientModule } from 'ngx-animated-gradient';

@NgModule({
  declarations: [OtherComponent, ...],
  imports: [NgxAnimatedGradientModule, ...], 
})
export class OtherModule {
}
```

## Usage


```html
<div ngxAnimatedGradient></div>
```

another full example 

```html
<div class="card">
      <div class="card-header">
        ngx-animated-gradient
      </div>
      <div class="card-body" ngxAnimatedGradient style="height: 400px">
      </div>
    </div>
```

| option | bind  |  type  |   default    | description  |
|:-------------------|:--------:|:------:|:------------:|:-------------------------------------------------------------------------------------------------|    
| colors       | Input()  | RGBValue    | (see the code ;)) |  colors to render
| tickSpeed   | Input()  | number| 16 |  The tick speed for calling the update of the gradient
| colorIndices   | Input()  | number[] | [0, 1, 2, 3] | The color indices, these indicate where in the color table to load from
| gradientSpeed   | Input()  | number | 0.002 | The multiplier for the gradient speed


## Contributors

- @tanepiper  

## Credit

This library is an angular directive/version of [this](https://codepen.io/quasimondo/pen/lDdrF) codepen


<a name="other-angular-libraries"/>


## Other Angular Libraries


- [ngx-auth-firebaseui](https://github.com/AnthonyNahas/ngx-auth-firebaseui)
- [@firebaseui/ng-bootstrap](https://github.com/firebaseui/ng-bootstrap)
- [ngx-linkifyjs](https://github.com/AnthonyNahas/ngx-linkifyjs)
- [@angular-material-extensions/password-strength](https://github.com/angular-material-extensions/password-strength)
- [@angular-material-extensions/link-preview](https://github.com/angular-material-extensions/link-preview)
- [@angular-material-extensions/pages](https://github.com/angular-material-extensions/pages)
- [@angular-material-extensions/contacts](https://github.com/angular-material-extensions/contacts)
- [@angular-material-extensions/faq](https://github.com/angular-material-extensions/faq)
- [@angular-material-extensions/jumbotron](https://github.com/angular-material-extensions/jumbotron)
- [@angular-material-extensions/google-maps-autocomplete](https://github.com/angular-material-extensions/google-maps-autocomplete)
- [@angular-material-extensions/combination-generator](https://github.com/angular-material-extensions/combination-generator)

<a name="support"/>

## Support
+ Drop an email to: [Anthony Nahas](mailto:anthony.na@hotmail.de)
+ or open an appropriate [issue](https://github.com/AnthonyNahas/ngx-auth-firebaseui/issues)
+ let us chat on [Gitter](https://gitter.im/ngx-auth-firebaseui/Lobby)
 
 Built by and for developers :heart: we will help you :punch:

---

![jetbrains logo](assets/jetbrains-variant-4_logos/jetbrains-variant-4.png)

This project is supported by [jetbrains](https://www.jetbrains.com/) with 1 ALL PRODUCTS PACK OS LICENSE incl. [webstorm](https://www.jetbrains.com/webstorm)

## License

Copyright (c) 2019 Anthony Nahas. Licensed under the MIT License (MIT)

