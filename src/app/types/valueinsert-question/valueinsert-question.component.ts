import {Component, OnInit, Input} from '@angular/core';
import {QuestionnaireItemComponent} from "../../questionnaire-item/questionnaire-item.component";
import {QuestionnaireService} from "../../questionnaire.service";
import {QuestionModel} from "../../_models/question.model";
import {AnswerModel} from "../../_models/answer.model";

@Component({
  selector: 'valueinsert-question',
  templateUrl: './valueinsert-question.component.html',
  styleUrls: ['./valueinsert-question.component.css']
})
export class ValueinsertQuestionComponent implements OnInit {
  @Input() qItem: QuestionModel;
  private answerValue: string;
  private comparisonAnswerCode: string;

  constructor(
    private parent: QuestionnaireItemComponent,
    private qService: QuestionnaireService
  ) { }

  ngOnInit() {
  }

  private handleOperationsSingleSelect(answerCode): void {
    this.comparisonAnswerCode = answerCode;
    console.log("set comparisonAnswer " + this.comparisonAnswerCode);
  }

  private nextQuestion(): void {

      const givenAnswer: AnswerModel = new AnswerModel;
      givenAnswer.answerID = this.answerValue;
      givenAnswer.answerLabel = this.answerValue;
      this.qService.QUESTIONNAIRE.completedQuestionList[this.qService.QUESTIONNAIRE.currentQuestionIndex].givenAnswerList.push(givenAnswer);
      this.qService.QUESTIONNAIRE.completedQuestionList[this.qService.QUESTIONNAIRE.currentQuestionIndex].comparisonAnswer = this.comparisonAnswerCode;
      this.answerValue = null;
      this.comparisonAnswerCode = null;
      this.qService.updateQuestionnaire();
  }
    private previousQuestion(): void {
        this.answerValue = null;
        this.comparisonAnswerCode = null;
        this.qService.showPreviousQuestion();
    }
}
