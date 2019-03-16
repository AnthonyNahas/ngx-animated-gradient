import { NxAnimatedGradientDemoPage } from './app.po';

describe('ngx-animated-gradient-demo App', () => {
  let page: NxAnimatedGradientDemoPage;

  beforeEach(() => {
    page = new NxAnimatedGradientDemoPage ();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
