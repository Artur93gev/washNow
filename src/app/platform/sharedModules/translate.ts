// import {NgModule} from '@angular/core';
// import {CommonModule} from '@angular/common';
// import {Http} from '@angular/http';
// import {TranslateModule, TranslateService, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';

// export function translateLoader(http: Http) {
//     return new TranslateStaticLoader(http, 'i18n', '.json');
// }

// @NgModule({
//     imports: [
//         CommonModule,
//         TranslateModule
//     ],
//     exports: [
//         CommonModule,
//         TranslateModule
//     ]
// })
// export class TranslateSharedModule {

//     static forRoot() {
//         return {
//             ngModule: TranslateSharedModule,
//             providers: [{
//                 provide: TranslateLoader,
//                 useFactory: translateLoader,
//                 deps: [Http]
//             },
//                 TranslateService,
//                 ],
//         };
//     }
// }
