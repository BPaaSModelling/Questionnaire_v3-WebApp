import {Component, OnInit, Input} from '@angular/core';
import {QuestionModel} from "../../_models/question.model";
import {QuestionnaireService} from "../../questionnaire.service";
import {SearchResultModel} from "../../_models/searchresult.model";
import {QuestionnaireItemComponent} from "../../questionnaire-item/questionnaire-item.component";
import {AnswerModel} from "../../_models/answer.model";

@Component({
  selector: 'search-question',
  templateUrl: './search-question.component.html',
  styleUrls: ['./search-question.component.css']
})
export class SearchQuestionComponent implements OnInit {
  @Input() qItem: QuestionModel;

  private givenAnswer: AnswerModel = new AnswerModel;

  constructor(
    private qService: QuestionnaireService) { }

  ngOnInit() {
  }

  private search(term): void {
    let a = this.qService.search(this.qItem.searchNamespace, term, this.qItem.searchOnClassesInsteadOfInstances);
    console.log("%%%%% " + JSON.stringify(a));
  }

  private handleSearchSelect(item): void {
    this.givenAnswer.answerID = item.uri;
    this.givenAnswer.answerLabel = item.label;
    this.qService.searchResults$ = null;
  }

  private nextQuestion(): void {
//    Object.assign(this.qItem.givenAnswerList,[this.answerCode]);
//    this.answerCode = null;
//    this.answerLabel = null;
    //this.qService.updateQuestionnaire();
    this.qService.QUESTIONNAIRE.completedQuestionList[this.qService.QUESTIONNAIRE.currentQuestionIndex].givenAnswerList.push(this.givenAnswer);
    this.givenAnswer = new AnswerModel;
      this.qService.updateQuestionnaire();
  }

}
