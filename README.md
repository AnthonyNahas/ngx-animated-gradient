<p align="center">
  <img height="256px" width="256px" style="text-align: center;" src="https://cdn.rawgit.com/anthonynahas/ngx-animated-gradient/master/demo/src/assets/logo.svg">
</p>

# ngx-animated-gradient - Angular Directivated that animated the gardient background

[![npm version](https://badge.fury.io/js/ngx-animated-gradient.svg)](https://badge.fury.io/js/ngx-animated-gradient),
[![Build Status](https://travis-ci.org/anthonynahas/ngx-animated-gradient.svg?branch=master)](https://travis-ci.org/anthonynahas/ngx-animated-gradient)
[![Coverage Status](https://coveralls.io/repos/github/anthonynahas/ngx-animated-gradient/badge.svg?branch=master)](https://coveralls.io/github/anthonynahas/ngx-animated-gradient?branch=master)
[![dependency Status](https://david-dm.org/anthonynahas/ngx-animated-gradient/status.svg)](https://david-dm.org/anthonynahas/ngx-animated-gradient)
[![devDependency Status](https://david-dm.org/anthonynahas/ngx-animated-gradient/dev-status.svg?branch=master)](https://david-dm.org/anthonynahas/ngx-animated-gradient#info=devDependencies)
[![Greenkeeper Badge](https://badges.greenkeeper.io/anthonynahas/ngx-animated-gradient.svg)](https://greenkeeper.io/)

## Demo

View all the directives in action at https://anthonynahas.github.io/ngx-animated-gradient

## Dependencies
* [Angular](https://angular.io) (*requires* Angular 2 or higher, tested with 2.0.0)

## Installation
Install above dependencies via *npm*. 

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



## License

Copyright (c) 2019 Anthony Nahas. Licensed under the MIT License (MIT)

