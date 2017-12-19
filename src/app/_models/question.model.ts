import {AnswerModel} from './answer.model';

export class QuestionModel {

  questionLabel: string;
  questionURI: string;
  questionID: number;
  answerList: AnswerModel[];
  answerDatatype: string;
  givenAnswerList: AnswerModel[];
  searchNamespace: string;
  comparisonOperationAnswers: AnswerModel[];
  comparisonAnswer: string;
  searchOnClassesInsteadOfInstances: boolean;
  answerType: string;
  domainLabel: string;
  annotationRelation: string;
  ruleToApply: string;


}
