/* Code style requirements
0. Appllication
1. HTML
2. SASS/CSS
3. JS
0)
* Every file must have an intuitive name of its action and responsablity
* Every file except application input statement must be in its folder
* Every folder must have intuitive name of its action in abstract way
** If nessecary you can restructure the folder into two or more folders(also about responsablity)
* In whole application word separation must be in 1 tab = 2 spaces.
1)
* Every line must contain only and only one operator or Hypertext
* Be attended to put between html tag attributes only one space
* The value of each attribute (also Angular attribute) must have its value in "" charts
(ex. title="test" name="test")
* All filenames must be in snake-case
2)
* Every style name must be intuitive, describable and constructorial(ex. if we are writing style
  for tabs of head part on new it can be news-header-block-tab-part-container)
    * Each style puted on DOM elements must be setted by classes.Never by tagName or other
  * Separate line after and before each className is required(except the first classname of current file)
  * All stylenames and filenames must be in snake-case
  * Be attended to the styles of the same classes to have their ':' operator in one line

  3)
  * Each operator(+, -, *, /, =/===/====, if, for, while, etc...) that requires must be one space separeted from its call
  and the call itself must be one space separated from the operator body
  (ex.
    if (a) {
      for (let i = 0; i < 5; i++) {
        ....
      }
    }
    * All variables and filenames must be in camelCase except constants(they must be in UPPERCASE)
    and classname(they must be in CapitalizedCamelCase)
    * Each functional and actional block must be separeted from the others by one line
    at list and comment describing the sense of thinking
    * Every comment that contains only one line must be written in '//' style
    * Every comment that contains two or more lines of explanation must have
    /*
    *
    *\'/'
    this style every line coming with * and must have header(title)
    * Each service, function, logic written incode must have explanation(description)
    * Each object must have this syntax
    {
      name : 'test',
      age : 'test',
      minCountValue : 'test'
    }
    except import statement which is not object, it is destructure
    * Each array must have this syntax
    [
      1,
      'test',
      2,
      'test'
    ]
    except Decorators and Route Config
    * Function expressions must be ended with ';' operator but function declarations didn't
    * In the other cases never put ';' operator after '}'
    */

import {
  Router,
  NavigationEnd,
  NavigationStart,
  NavigationCancel
} from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA,Component, Inject } from "@angular/core";

import { Observable } from "rxjs/Rx";

import {
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule, 
    MatSnackBarModule,
    MatExpansionModule,
    MatTooltipModule,
    MatIconModule,

    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from "@angular/material";

// environment

import { environment } from "../environments/environment";

// shared modules

import { LoaderModule } from "@platform/sharedModules";
// import { SharedModule } from "./shared/shared.module";

// module components

import { PageNotFound } from "@platform/components/pageNotFound";
import { PersonalHeader } from "./components/personalHeader";
import { Wiseboard } from "./components/wiseboard";
import { AppComponent } from "./controller";
import { AppRoute } from "./route/config";

// route guards

import { Authorize } from "./services/authorize";

// main used services

import {
  ErrorHandler,
  Connection,
  Dispatcher,
  Settings,
  Toaster,
} from "@platform/services";

// module resolvers

import {
  ServicesResolver,
  ManagersResolver,
  CarsResolver,
  CarWashesResolver,
} from "./services/resolvers";

// application resources

import {
  WasherServices,
  WorkingDays,
  CarWashes,
  Services,
  Managers,
  Washers,
  Cars,
} from '@platform/resources';

// 3-rd party integrations

import {
  GMaps,
} from '@platform/thirdParty';

// constants needed in root module

import { menuItems } from '@platform/constants';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFound,
    Wiseboard,
    PersonalHeader,
  ],
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatMenuModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatSidenavModule,
    MatIconModule,
    
    // SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoute,
    LoaderModule,
  ],
  providers: [
    Authorize,
    Settings,
    Connection,
    ErrorHandler,
    Dispatcher,
    Toaster,
    ServicesResolver,
    ManagersResolver,
    CarsResolver,
    CarWashesResolver,
    WasherServices,
    WorkingDays,
    CarWashes,
    Services,
    Managers,
    Washers,
    Cars,
    GMaps,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
  constructor(
    private router: Router,
    private settings: Settings,
    private dispatcher: Dispatcher,
  ) {
    if (this.settings.token && this.settings.user) {
      this.dispatcher.broadcast('login');
      const activeTab = menuItems.find(item => window.location.href.includes(item.url));
      if (activeTab) {
        this.settings.tab = activeTab.url;
        this.router.navigate([this.settings.tab]);
      }
    } else {
      this.router.navigate(['login']);
    }
  }
}
