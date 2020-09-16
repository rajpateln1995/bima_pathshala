import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'home',
    link: '/pages/home',
    home: true,
  },
  {
    title: 'Users',
    icon: 'people',
    children: [
      // {
      //   title: 'Sanchalak',
      //   link: '/pages/users/sanchalak',
      // },
      {
        title: 'Guru',
        link: '/pages/users/guru',
      },
      {
        title: 'Shishya',
        link: '/pages/users/shishya',
      },
    ],
  },
  {
      title: 'Our Courses',
      icon: 'award',
      link: '/pages/courses/all-courses',
      home: true,
  },
  {
    title: 'Document / Articles',
    icon: 'file',
    link: '/pages/document/documents',
    home: true,
  },
  {
    title: 'Videos',
    icon: 'video',
    link: '/pages/videos/all-videos',
    home: true,
  },
  {
    title: 'Sessions',
    icon: 'book-open',
    link: '/pages/sessions/all-sessions',
    home: true,
  },
  {
    title: 'Expense Manager',
    icon: 'credit-card',
    link: '/pages/expense-manager/all-expenses',
    home: true,
  },
  // {
  //   title: 'MIS Report(S)',
  //   icon: 'pie-chart',
  //   link: '',
  //   home: true,
  // },
  // {
  //   title: 'Config',
  //   icon: 'settings',
  //   link: '',
  //   home: true,
  // }

];
