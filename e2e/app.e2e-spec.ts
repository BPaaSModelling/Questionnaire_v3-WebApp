import { SemanticAnnotationQuestionnaireWebAppPage } from './app.po';

describe('Questionnaire_v3-WebApp App', () => {
  let page: SemanticAnnotationQuestionnaireWebAppPage;

  beforeEach(() => {
    page = new SemanticAnnotationQuestionnaireWebAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
