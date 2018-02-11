import {Component, OnInit, OnDestroy, Input, OnChanges, AfterViewInit, AfterContentInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { EndpointSettings } from '../_settings/endpoint.settings';
import { QuestionnaireService } from '../questionnaire.service';
import {QuestionModel} from '../_models/question.model';
import {BehaviorSubject, Observable } from "rxjs";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {SearchResultModel} from "../_models/searchresult.model";
import {transition, trigger, useAnimation} from "@angular/animations";
import {bounce, fadeInDown, flip, flipInY, lightSpeedIn} from "ng-animate/lib";

@Component({
  selector: 'questionnaire-item',
  templateUrl: './questionnaire-item.component.html',
  styleUrls: ['./questionnaire-item.component.css'],
    animations: [
        trigger('entrance_title', [transition('* => *', useAnimation(flip))]),
        trigger('entrance_options', [transition('* => *', useAnimation(lightSpeedIn))])
    ],

})
export class QuestionnaireItemComponent implements OnInit, OnChanges {
  @Input() qItem: QuestionModel;
  ent: boolean = false;
  private SINGLESELECTION     : string = 'http://ikm-group.ch/archiMEO/questionnaire#SingleSelection';
  private SEARCHSELECTION  : string = 'http://ikm-group.ch/archiMEO/questionnaire#SearchSelection';
  private VALUEINSERT         : string = 'http://ikm-group.ch/archiMEO/questionnaire#ValueInsert';
  private MULTISELECTION      : string = 'http://ikm-group.ch/archiMEO/questionnaire#MultiSelection'

  constructor(private qService: QuestionnaireService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void{
    if (this.ent){
      this.ent = false;
    } else {
      this.ent = true;
    }
  }

  /*public handleSingleSelect(answerID:string):void{
    this.qService.test(this.qItem);
    this.qItem.givenAnswerList = [answerID];
    this.qService.test(this.qItem);
  }*/

}
