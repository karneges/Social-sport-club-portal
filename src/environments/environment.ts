/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  API_BASE_URL: 'http://localhost:4000/api/v1',
  API_BASE_URL_SOCKET: 'http://localhost:4000',
  // API_BASE_URL: 'http://41a545fafe23.ngrok.io/api/v1',
  // API_BASE_URL_SOCKET: 'http://41a545fafe23.ngrok.io'
  STRAVA_AUTH_URL : 'http://www.strava.com/oauth/authorize?client_id=48158&response_type=code&'
    + 'redirect_uri=http://localhost:4200/pages/training/strava&approval_prompt=force&scope=activity:read_all'
};
