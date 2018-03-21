import { Component, OnChanges, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'hint-message',
    templateUrl: './view/index.html',
    styleUrls: ['./sass/index.scss'],
    inputs: ['text', 'type']
})

export class HintMessage implements OnChanges {

    @Input() text:string;
    @Input() type:string;

    public hintText:any;
    public hintType:any;

    ngOnChanges(init:any) {
        this.hintText = init.text.currentValue;
        this.hintType = init.type.currentValue;
    }
}
