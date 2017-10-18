import {Component, OnInit, Input} from '@angular/core';
import { ServiceModel } from '../_models/service.model';
import { QuestionModel } from '../_models/question.model';
import { QuestionnaireService } from '../questionnaire.service';
import { Observable }     from 'rxjs/Observable';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'service-discovery',
  templateUrl: './service-discovery.component.html',
  styleUrls: ['./service-discovery.component.css'],
  // providers: [QuestionnaireService]
})
export class ServiceDiscoveryComponent implements OnInit {
  constructor(
    private qService: QuestionnaireService
  ) {
  }

  ngOnInit() {
  }

}
