import { BmePage } from './app.po';

describe('bme App', () => {
  let page: BmePage;

  beforeEach(() => {
    page = new BmePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
