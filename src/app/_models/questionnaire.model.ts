import {QuestionModel} from './question.model';
import {AnswerModel} from "./answer.model";

export class QuestionnaireModel {
  public completed: boolean;
  public completedQuestionList: QuestionModel[];
  public currentQuestionIndex: number;
  public selectedDomainList: AnswerModel[];

    constructor() {
        this.completed = false;
        this.completedQuestionList = [];
        this.currentQuestionIndex = 0;
        this.selectedDomainList = [];
    }
}
