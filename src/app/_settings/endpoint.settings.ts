export class EndpointSettings {

  //private static ENDPOINT       : string = 'http://wildfly10-lemming.rhcloud.com/BPaaS-Questionnaire-WebService-0.0.2-SNAPSHOT';


  private static ENDPOINT       : string = 'http://localhost:8080';
  //private static ENDPOINT       : string = 'https://bpaas-modelling.herokuapp.com:14673';



  private static QUESTIONNAIRE  : string = '/questionnaire';
  private static SEARCH         : string = '/search?';
  private static CSELEMENTS     : string = '/cloudservice/cselements';
  private static ADDCS          : string = '/cloudservice/addcs';
  private static QUESTIONDOMAINS: string = '/getDomains';
  private static NEXTQUESTION: string = '/getNextQuestion';
  private static SUITABLECLOUDSERVICES: string = '/getSuitableCloudservices';

  public static getSearchEndpoint(): string {
    return EndpointSettings.ENDPOINT + EndpointSettings.SEARCH;
  }
  public static getCloudServiceElementsEndpoint(): string {
    return EndpointSettings.ENDPOINT + EndpointSettings.CSELEMENTS;
  }
  public static getAddCloudServiceEndpoint(): string {
    return EndpointSettings.ENDPOINT + EndpointSettings.ADDCS;
  }
  public static getQuestionDomainsEndpoint(): string {
    return EndpointSettings.ENDPOINT + EndpointSettings.QUESTIONNAIRE + EndpointSettings.QUESTIONDOMAINS;
  }
  public static getNextQuestionEndpoint(): string {
    return EndpointSettings.ENDPOINT + EndpointSettings.QUESTIONNAIRE + EndpointSettings.NEXTQUESTION;
  }
  public static getSuitableCloudServicesEndpoint(): string {
    return EndpointSettings.ENDPOINT + EndpointSettings.QUESTIONNAIRE + EndpointSettings.SUITABLECLOUDSERVICES;
  }

}
