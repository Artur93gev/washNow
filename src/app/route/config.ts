import { NgModule } from "@angular/core";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { Authorize } from "../services/authorize";
import { AppComponent } from "../controller";
import { PageNotFound } from "../platform/components/pageNotFound";

// resolvers

import {
  CarWashesResolver,
  ServicesResolver,
  CarsResolver,
  ManagersResolver,
} from "../services/resolvers";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "car-washes",
  },
  {
    path: "login",
    loadChildren: "app/modules/login/app#LoginModule",
  },
  {
    path: "car-washes",
    loadChildren: "app/modules/carWashes/app#CarWashesModule",
    canLoad: [Authorize],
    canActivate: [Authorize],
    resolve: {
      data: CarWashesResolver,
    },
  },
  {
    path: "services",
    loadChildren: "app/modules/services/app#ServicesModule",
    canLoad: [Authorize],
    canActivate: [Authorize],
    resolve: {
      data: ServicesResolver,
    },
  },
  {
    path: "cars",
    loadChildren: "app/modules/cars/app#CarsModule",
    canLoad: [Authorize],
    canActivate: [Authorize],
    resolve: {
      data: CarsResolver,
    },
  },
  {
    path: "managers",
    loadChildren: "app/modules/managers/app#ManagersModule",
    canLoad: [Authorize],
    canActivate: [Authorize],
    resolve: {
      data: ManagersResolver,
    },
  },
  {
    path: "**",
    component: PageNotFound,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoute {}
