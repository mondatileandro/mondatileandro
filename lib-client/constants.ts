export const Routes = {
  SITE: {
    HOME: '/',
    POST: '/post/',
    DRAFTS: '/post/drafts/',
    CREATE: '/post/create/',
    REGISTER: '/auth/register/',
    LOGIN: '/auth/login/',
    SETTINGS: '/settings/',
    USERS: '/users/',
  },
  API: {
    POSTS: '/api/posts/',
    USERS: '/api/users/',
    PROFILE: '/api/users/profile/',
    SESSION: '/api/auth/session/',
  },
  STATIC: {
    AVATARS: '/uploads/avatars/',
    HEADERS: '/uploads/headers/',
  },
} as const;

export const themes = [
  'theme-light',
  'theme-dark',
  'theme-blue',
  'theme-red',
  'theme-green',
  'theme-black',
];
