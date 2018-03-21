import {
  Component,
  OnInit,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';

import { Observable, Subscription } from 'rxjs/Rx';

import {
  Connection,
  Dispatcher,
  Toaster,
} from '@platform/services';
import { Services } from '@platform/resources';



import { ServicesService } from '../../services';


@Component({
  templateUrl: './view/index.html',
  styleUrls: ['./sass/index.scss']
})

export class ServicesDetailes implements OnInit {
  
  public service: any = {};
  public isEdit: boolean;
  public formGroup: FormGroup;

  constructor(
    private router: Router,
    private toaster: Toaster,
    private services: Services,
    private dispatcher: Dispatcher,
    private connection: Connection,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private servicesService: ServicesService,
  ) {
    this.isEdit = !!this.servicesService.activeService;
    if (this.isEdit) {
      this.service = this.servicesService.activeService;
    }
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: [
        this.service.name || '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
        ]),
      ],
      description: [
        this.service.description || '',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
        ]),
      ],
      avg_duration: [
        this.service.avg_duration || '',
        Validators.compose([
          Validators.required,
          Validators.min(0),
        ]),
      ],
      category: [
        this.service.category || '',
        Validators.required,
      ],
    });
  }

  public goBackToServicesCards(event?: Event): void {
    event && event.stopPropagation();
    this.router.navigate(['services']);
  }

  public submit(event?: Event): void {
    event && event.stopPropagation();
    const callBack = this.isEdit ?
      this.services.updateItem(this.service._id, this.formGroup.value) :
      this.services.create(this.formGroup.value);

    callBack.subscribe((res: any) => {
      if (res && res.value) {
        this.goBackToServicesCards();
      }
    });
  }
}