import {Injectable} from '@angular/core';

declare var $;

@Injectable()

export class Modal {

    public modalName: string;

    public open(param: string) {
        this.modalName = '#' + param;
        $(this.modalName).modal('show');

    }

    public close(param: string) {
        const name = '#' + param;
        $(name).modal('hide');
    }

    public currentClose() {
        $(this.modalName).modal('hide');
    }


}