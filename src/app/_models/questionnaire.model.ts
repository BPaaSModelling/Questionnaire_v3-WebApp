import {QuestionModel} from './question.model';

export class QuestionnaireModel {

  public questionList: QuestionModel[];
  public completed: boolean;
  public lastQuestionID: number;
  public currentQuestionDomain: string;
  public completedQuestionDomainList: string[];

}
