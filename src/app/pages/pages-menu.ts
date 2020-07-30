import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
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
        title: 'My Training',
        link: '/pages/training/my-training',
      },
      {
        title: 'Sport Services',
        link: '/pages/training/sport-services',
      },
    ]
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
