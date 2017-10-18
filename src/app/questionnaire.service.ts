import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Http, Headers, Response, RequestOptions, URLSearchParams, Jsonp} from '@angular/http';
import { EndpointSettings } from './_settings/endpoint.settings';
import { QuestionnaireModel} from './_models/questionnaire.model';
import {QuestionModel} from './_models/question.model';
import {ServiceModel} from './_models/service.model';
import 'rxjs/add/operator/toPromise';
import {SearchResultModel} from './_models/searchresult.model';
import 'rxjs/add/observable/throw';
import {AnswerModel} from './_models/answer.model';


@Injectable()
export class QuestionnaireService {
  private options: RequestOptions;

  private questionBehaviour:BehaviorSubject<QuestionModel> = new BehaviorSubject(new QuestionModel());
  setupPhase: boolean;
  questionList: QuestionModel[] = [];
  questionIndex: number;
  searchResults$: Observable<SearchResultModel[]> = Observable.of(null);
  public initialDomains: AnswerModel[] = [];
  suitableCloudService$: Observable<AnswerModel[]> = Observable.of(null);

  constructor(
    private http: Http,
    private jsonp: Jsonp) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: headers });
  }


    public setupNewQuestionnaire() {
      this.initialDomains = [];
        this.setupPhase = true;
        this.questionList = [];
        this.queryDomains();
        this.questionIndex = -1;
        this.suitableCloudService$ = Observable.of(null);
    }

    private queryDomains(): void {
        this.http.get(EndpointSettings.getQuestionDomainsEndpoint())
            .map(response => response.json()).subscribe(
            data => {
                console.log('Domain received: ' + JSON.stringify(data));
                //this.csField$ = Observable.of(data);
                for (let i = 0; i < data.length; i++){
                    this.initialDomains.push(data[i]);
                }
                console.log('Elements parsing with success!');

            }, error => console.log('Could not query cloudservice fields'));

    }

  //public get selectedQItem() {
   //return this.qItemBehaviour.asObservable();
   //}

    public get updateQuestionnaire() {

      if (this.setupPhase){

        var question_of_domains: QuestionModel = new QuestionModel();
        question_of_domains.questionLabel = "Please, select the domain(s) of the questions";
        question_of_domains.answerList = this.initialDomains;
        question_of_domains.answerType = "http://ikm-group.ch/archiMEO/questionnaire#MultiSelection";
        question_of_domains.domainLabel = "Introduction";
        question_of_domains.questionID = -1;
        //this._questionList.push(question_of_domains);
          this.questionBehaviour.next( question_of_domains);
          return this.questionBehaviour.asObservable();
      } else {
          this.questionBehaviour.next(this.questionList[this.questionIndex]);
          console.log("come hai fatto a finire qui?!?")
      }

    }

  public search(ns: string, term: string, classes: boolean) {

    console.log("search received: " +ns +" :: " + term + " :: " + classes);
    let search = new URLSearchParams()
    search.set('ns', ns);
    search.set('search', term);
    search.set('search_for_classes', classes.toString());

    this.http.get(EndpointSettings.getSearchEndpoint(), { search })
      .map(response => response.json()).subscribe(
      data => {

        console.log("searchResults " +JSON.stringify(data));
        this.searchResults$ = Observable.of(data);


      }, error => console.log('Could not query services'));
  }

  public nextQuestion(): void {

        if (this.setupPhase){
            this.queryQuestionsFromDomains()
            this.questionIndex = -1;
            this.setupPhase = false;

        } else {
            this.questionIndex = this.questionIndex+1;
            this.questionBehaviour.next(this.questionList[this.questionIndex]);
            console.log(this.questionIndex +" of " + this.questionList.length);
            console.log(this.questionList);
        }
      this.queryCloudServices();
    }
    public queryQuestionsFromDomains(): void {
        let myParams = new URLSearchParams()
            myParams.append('domains',JSON.stringify(this.initialDomains))
        this.http.get(EndpointSettings.getQuestionsFromDomainsEndpoint(), { search: myParams })
            .map(response => response.json()).subscribe(
            data => {

                console.log("Results from querying questions from domains: " +JSON.stringify(data));
                for (let i = 0; i < data.length; i++){
                    this.questionList.push(data[i]);
                }
            this.nextQuestion();


            }, error => console.log('Could not query services'));
    }

    public queryCloudServices(): void {
        let myParams = new URLSearchParams()
        myParams.append('questionList',JSON.stringify(this.questionList))
        this.http.get(EndpointSettings.getSuitableCloudServicesEndpoint(), { search: myParams })
            .map(response => response.json()).subscribe(
            data => {

                console.log("Results from querying suitable cloud services: " +JSON.stringify(data));
                this.suitableCloudService$ = Observable.of(data);

            }, error => console.log('Could not query services'));
    }

    get getQuestionList(): QuestionModel[] {
        return this.questionList;
    }

    get getQuestionIndex(): number {
        return this.questionIndex;
    }


}
