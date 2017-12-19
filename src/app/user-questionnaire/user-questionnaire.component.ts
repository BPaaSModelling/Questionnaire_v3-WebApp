import { Component, OnInit } from '@angular/core';
import {QuestionnaireService} from '../questionnaire.service';
import {QuestionModel} from '../_models/question.model';

@Component({
  selector: 'app-user-questionnaire',
  templateUrl: './user-questionnaire.component.html',
  styleUrls: ['./user-questionnaire.component.css']
})
export class UserQuestionnaireComponent implements OnInit {
  private question: QuestionModel;

  constructor(private qService: QuestionnaireService) {
    this.qService.setupNewQuestionnaire();

    this.qService.askForDomainQuestion.subscribe(
        data => {
          this.question = data;
        });
    // this.qItem = qService.selectedQItem();
  }

  ngOnInit() {
  }

  private startNewQuestionnaire(): void {
    console.log('start New Questionnaire');
    this.qService.setupNewQuestionnaire();
      this.qService.askForDomainQuestion.subscribe(
          data => {
              this.question = data;
          });
  }
}
