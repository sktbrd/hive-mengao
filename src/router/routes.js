
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/:catchAll(.*)*', component: () => import('pages/IndexPage.vue') },
      { path: '', component: () => import('src/pages/Home.vue') },
      { path: 'posts', component: () => import('src/pages/Home.vue') },
      { path: 'login', component: () => import('pages/LoginPage.vue') },
      { path: 'wallet', component: () => import('pages/UserWallet.vue') },
      { path: 'post', component: () => import('pages/PostPage.vue') },
      { path: 'eth', component: () => import('src/pages/LoginETH.vue') },
      { path: 'profile/:username', component: () => import('pages/Profile.vue') },
      { path: 'quest', component: () => import('pages/QuestStoken.vue') }
    ]
  }

  // Always leave this as last one,
  // but you can also remove it
//  {
//    path: '/:catchAll(.*)*',
//    component: () => import('pages/IndexPage.vue')
//  }
]

export default routes
