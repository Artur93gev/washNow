// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import env from './type';

export const environment: env = {
    hostUrl: 'http://server5616.cloudapp.net:3000/api/',
    production: false,
    name: 'default',
};
