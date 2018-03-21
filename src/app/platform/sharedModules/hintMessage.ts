import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { HintMessage} from '../components/hintMessage/index';

@NgModule({
    declarations : [
        HintMessage
    ],
    imports: [
        MatIconModule
    ],
    exports : [
        HintMessage,
    ],
    providers : [
    ]
})

export class HintMessageModule { }