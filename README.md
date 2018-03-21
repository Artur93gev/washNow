# Wash Now

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

  For creating/removing a new module/component you must use generator (.generator.sh) commands.
  
  # create module
    ./.generator.sh module `moduleName`
  # remove module
    ./.generator.sh remove module `moduleName`
  # create component
    ./.generator.sh component `componentName`
  # remove component
    ./.generator.sh remove component `componentName`

  # NOTE
    This bash commands will create only folder structure and files, there will not be code default snippets in them.
    For module create/remove it will always be created in `modules` directory of the project.
    The component will be created and searched for removing in the current directory where the command will be runned.
    You can make the generator command an external command on your PC to use from any path.

## Build

  For building the application in test and production environments you can use build (build.sh) commands

  # production build

    build prod

  This will create production build in specified production directory

  # production staging

    build staging

  This will create staging build in specified staging directory

  # NOTE

    By default build (if you use just `build`) tool will use staging argument.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
