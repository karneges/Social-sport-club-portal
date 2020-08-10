import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS_AUTH: NbMenuItem[] = [
  {
    title: 'general',
    icon: 'home-outline',
    link: '/pages/general',
    home: true,
    pathMatch: 'prefix'
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Training',
    icon: 'trending-up-outline',
    children: [
      {
        title: 'My Training Statistics',
        link: '/pages/training/my-training',
      },
      {
        title: 'Sport Services',
        link: '/pages/training/sport-services',
      },
    ]
  },
];
export const MENU_ITEMS_UN_AUTH: NbMenuItem[] = [
  {
    title: 'general',
    icon: 'home-outline',
    link: '/pages/general',
    home: true,
    pathMatch: 'prefix'
  },
  {
    title: 'Auth',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: 'auth/login',
      },
      {
        title: 'Register',
        link: 'auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
];
