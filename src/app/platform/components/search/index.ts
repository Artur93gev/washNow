import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';


import { constructDependencies } from "@angular/core/src/di/reflective_provider";

@Component({
    selector: 'search',
    templateUrl: './view/index.html',
    styleUrls: ['./sass/index.scss'],
    inputs: ['options', 'type', 'criterion', 'isTranslated'],
    outputs: ['list']
})

export class Search implements OnChanges {

    private data: any[];
    public style: any;
    private text: string;
    public criterion: string;
    public placeHolder: string;
    private defaultKey: string = 'name';

    @Input() options: any;
    @Input() type: any;
    @Input() isTranslated: boolean;
    @Output() list: EventEmitter<any> = new EventEmitter;

    ngOnChanges(changes: any) {
        if (changes.options.currentValue) {
            this.data = changes.options.currentValue.list;
            this.criterion = changes.options.currentValue.criterion || this.defaultKey;
            this.placeHolder = changes.options.currentValue.placeHolder;
            this.changes(this.text);
        }
        if (changes.isTranslated) {
            this.isTranslated = changes.isTranslated.currentValue;
        }
        if (changes.type && changes.type.currentValue) {
            this.style = changes.type.currentValue;
        }
    }

    public changes(text = ''): void {
        this.broadcast(
            this.data.filter(item => item[this.criterion].toUpperCase().includes(text.toUpperCase()))
        )
    }

    protected broadcast(data: any[]): void {
        this.list.next(data);
    }
}