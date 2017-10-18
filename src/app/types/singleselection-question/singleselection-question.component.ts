import {Component, OnInit, Input, NgModule} from '@angular/core';
import {QuestionModel} from "../../_models/question.model";
import {QuestionnaireItemComponent} from "../../questionnaire-item/questionnaire-item.component";
import {QuestionnaireService} from "../../questionnaire.service";
import {AnswerModel} from "../../_models/answer.model";

@Component({
  selector: 'singleselection-question',
  templateUrl: './singleselection-question.component.html',
  styleUrls: ['./singleselection-question.component.css']
})
export class SingleselectionQuestionComponent implements OnInit {
  @Input() qItem: QuestionModel;

  private givenAnswer: AnswerModel;

  constructor(
    private parent: QuestionnaireItemComponent,
    private qService: QuestionnaireService
  ) { }

  ngOnInit() {
  }

  private handleSingleSelect(answerCode): void {
    this.givenAnswer = answerCode;
  }

  private nextQuestion(): void {
    //Object.assign(this.qItem.givenAnswerList,[this.answerCode]);

    //this.qService.updateQuestionnaire();
    this.qService.questionList[this.qService.questionIndex].givenAnswerList.push(this.givenAnswer);
    this.givenAnswer = null;
    this.qService.nextQuestion();
  }

}
