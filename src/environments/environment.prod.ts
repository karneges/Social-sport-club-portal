/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
export const environment = {
  production: true,
  API_BASE_URL: 'http://34.90.137.161/api/v1',
  API_BASE_URL_SOCKET: 'http://34.90.137.161',
  // API_BASE_URL: 'http://41a545fafe23.ngrok.io/api/v1',
  // API_BASE_URL_SOCKET: 'http://41a545fafe23.ngrok.io'
  STRAVA_AUTH_URL : 'http://www.strava.com/oauth/authorize?client_id=48158&response_type=code&'
    + 'redirect_uri=http://localhost:4200/pages/training/sport-services/strava&approval_prompt=force&scope=activity:read_all'
};
