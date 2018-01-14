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


  public QUESTIONNAIRE: QuestionnaireModel;
  public initialDomains: AnswerModel[] = [];
  public domainPhase: boolean;
  private questionBehaviour:BehaviorSubject<QuestionModel> = new BehaviorSubject(new QuestionModel());
  private options: RequestOptions;
  searchResults$: Observable<SearchResultModel[]> = Observable.of(null);
  suitableCloudService$: Observable<AnswerModel[]> = Observable.of(null);
  private question_of_domains: QuestionModel = new QuestionModel;

  constructor(
    private http: Http,
    private jsonp: Jsonp) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: headers });

      this.question_of_domains.questionURI = "SKIP"
      this.question_of_domains.questionLabel = "Please, select the domain(s) of the questions";
      this.question_of_domains.answerList = this.initialDomains;
      this.question_of_domains.answerType = "http://ikm-group.ch/archiMEO/questionnaire#MultiSelection";
      this.question_of_domains.domainLabel = "Introduction";
      this.question_of_domains.questionID = 3.5;
      let skippedAnswers: AnswerModel[] = [];
      let skippedAnswer: AnswerModel = new AnswerModel;
      skippedAnswer.answerLabel="SKIP";
      skippedAnswer.answerID="SKIP";
      skippedAnswers.push(skippedAnswer);
      this.question_of_domains.annotationRelation = "SKIP";
      this.question_of_domains.givenAnswerList = skippedAnswers;

  }


    public setupNewQuestionnaire() {
      this.QUESTIONNAIRE = new QuestionnaireModel();
      this.domainPhase = false;
      this.initialDomains = [];
        this.queryDomains();
        this.suitableCloudService$ = Observable.of(null);
    }

    private queryDomains(): void {
        this.http.get(EndpointSettings.getQuestionDomainsEndpoint())
            .map(response => response.json()).subscribe(
            data => {
                console.log('Domain received: ' + JSON.stringify(data));
                //this.csField$ = Observable.of(data);
                for (let i = 0; i < data.length; i++){
                    if (data[i].answerLabel !== "Functional" && data[i].answerLabel !== "NotSortedYet"){
                        this.initialDomains.push(data[i]);
                    }
                }

                console.log('Elements parsing with success!');
                this.question_of_domains.answerList = this.initialDomains;

            }, error => console.log('Could not query cloudservice fields'));

    }

    public get listenForQuestions(){
        this.http.post(EndpointSettings.getNextQuestionEndpoint(), this.QUESTIONNAIRE)
            .map(response => response.json()).subscribe(
            data => {

                //console.log("Results from querying next question: " + JSON.stringify(data));

                this.QUESTIONNAIRE.completedQuestionList.push(data);
                console.log(this.QUESTIONNAIRE);
                this.questionBehaviour.next(this.QUESTIONNAIRE.completedQuestionList[this.QUESTIONNAIRE.currentQuestionIndex]);
                this.QUESTIONNAIRE.completedQuestionList[this.QUESTIONNAIRE.currentQuestionIndex].questionID = this.QUESTIONNAIRE.currentQuestionIndex;


            }, error => {
                console.log('Could not query next question');
                this.QUESTIONNAIRE.completed = true;
            });

        return this.questionBehaviour.asObservable();

    }

    public search(ns: string, term: string, classes: boolean) {

    //console.log("search received: " +ns +" :: " + term + " :: " + classes);
    let search = new URLSearchParams()
    search.set('ns', ns);
    search.set('search', term);
    search.set('search_for_classes', classes.toString());

    this.http.get(EndpointSettings.getSearchEndpoint(), { search })
      .map(response => response.json()).subscribe(
      data => {

        //console.log("searchResults " +JSON.stringify(data));
        this.searchResults$ = Observable.of(data);


      }, error => console.log('Could not query services'));
  }

    public queryCloudServices(): void {
        let myParams = new URLSearchParams()
        myParams.append('questionList',JSON.stringify(this.QUESTIONNAIRE.completedQuestionList))
        this.http.get(EndpointSettings.getSuitableCloudServicesEndpoint(), { search: myParams })
            .map(response => response.json()).subscribe(
            data => {

                console.log("Results from querying suitable cloud services: " +JSON.stringify(data));
                this.suitableCloudService$ = Observable.of(data);

            }, error => console.log('Could not query services'));
    }

    public updateQuestionnaire(): void{
        console.log(this.QUESTIONNAIRE);
        console.log(this.QUESTIONNAIRE.currentQuestionIndex);


        if (this.QUESTIONNAIRE.completedQuestionList.length == 3 && !this.domainPhase){
            console.log("Ask for the domain question");
            //this.QUESTIONNAIRE.selectedDomainList = this.initialDomains;
            this.domainPhase = true;



            //this._questionList.push(question_of_domains);
           // this.QUESTIONNAIRE.completedQuestionList.push(question_of_domains);
            this.questionBehaviour.next( this.question_of_domains);
        }else {
            this.domainPhase = false;
            this.QUESTIONNAIRE.currentQuestionIndex++;

            console.log("Ask for the next question");


            this.http.post(EndpointSettings.getNextQuestionEndpoint(), this.QUESTIONNAIRE)
                .map(response => response.json()).subscribe(
                data => {

                    console.log("Results from querying next question: " + JSON.stringify(data));

                    this.QUESTIONNAIRE.completedQuestionList.push(data);
                    console.log(this.QUESTIONNAIRE);
                    this.questionBehaviour.next(this.QUESTIONNAIRE.completedQuestionList[this.QUESTIONNAIRE.currentQuestionIndex]);
                    this.QUESTIONNAIRE.completedQuestionList[this.QUESTIONNAIRE.currentQuestionIndex].questionID = this.QUESTIONNAIRE.currentQuestionIndex;

                }, error => {
                    console.log('Could not query next question');
                    this.QUESTIONNAIRE.completed = true;
                });

        }
        console.log("Ask for suitable services");
        this.queryCloudServices();
        //console.log(this.QUESTIONNAIRE);

    }

    getQuestionList(): QuestionModel[] {
        return this.QUESTIONNAIRE.completedQuestionList;
    }

    getQuestionIndex(): number {
        return this.QUESTIONNAIRE.currentQuestionIndex;
    }

    public showPreviousQuestion(): void {

        if (this.QUESTIONNAIRE.currentQuestionIndex == 2 && this.domainPhase){

            this.domainPhase = false;
            this.questionBehaviour.next(this.QUESTIONNAIRE.completedQuestionList[this.QUESTIONNAIRE.currentQuestionIndex]);
            this.QUESTIONNAIRE.selectedDomainList = [];
        } else if (this.QUESTIONNAIRE.currentQuestionIndex == 3 && !this.domainPhase) {
            this.domainPhase = true;
            this.questionBehaviour.next(this.question_of_domains);
            this.QUESTIONNAIRE.currentQuestionIndex--;
            this.QUESTIONNAIRE.completedQuestionList.splice(this.QUESTIONNAIRE.currentQuestionIndex+1,1);
            this.QUESTIONNAIRE.completedQuestionList[this.QUESTIONNAIRE.currentQuestionIndex].givenAnswerList.splice(1,1);
        }else{
        this.QUESTIONNAIRE.currentQuestionIndex--;
        this.questionBehaviour.next(this.QUESTIONNAIRE.completedQuestionList[this.QUESTIONNAIRE.currentQuestionIndex]);
        this.QUESTIONNAIRE.completedQuestionList.splice(this.QUESTIONNAIRE.currentQuestionIndex+1,1);
        this.QUESTIONNAIRE.completedQuestionList[this.QUESTIONNAIRE.currentQuestionIndex].givenAnswerList.splice(1,1);
        console.log(this.QUESTIONNAIRE);
        }
    }
}
