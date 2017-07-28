import { Simpleng2Page } from './app.po';

describe('simpleng2 App', () => {
  let page: Simpleng2Page;

  beforeEach(() => {
    page = new Simpleng2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
