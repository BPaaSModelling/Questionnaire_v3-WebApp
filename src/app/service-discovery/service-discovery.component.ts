import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import { ServiceModel } from '../_models/service.model';
import { QuestionModel } from '../_models/question.model';
import { QuestionnaireService } from '../questionnaire.service';
import { Observable } from 'rxjs/Observable';
import {forEach} from '@angular/router/src/utils/collection';
import {transition, trigger, useAnimation} from "@angular/animations";
import {fadeInDown, flash, flipInY, slideInDown} from "ng-animate/lib";

@Component({
  selector: 'service-discovery',
  templateUrl: './service-discovery.component.html',
  styleUrls: ['./service-discovery.component.css'],
  // providers: [QuestionnaireService]
    animations: [
        trigger('entrance_difference', [transition('* => *', useAnimation(flash))])
    ],
})
export class ServiceDiscoveryComponent implements OnInit, OnChanges {

    ent: boolean = false;

    ngOnChanges(changes: SimpleChanges): void {

            if (this.ent) {
            this.ent = false;
        } else {
            this.ent = true;
        }

    }



  constructor(
    private qService: QuestionnaireService
  ) {
  }

  ngOnInit() {
  }

}
