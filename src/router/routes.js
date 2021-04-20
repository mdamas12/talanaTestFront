
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      {
        name: 'Register',
        path: '/register',
   
        component: () => import('pages/users/UserCreate.vue'),
      },
      {
        name: 'Winner',
        path: '/winner',
   
        component: () => import('pages/users/UserWinner.vue'),
      },
      
      {
        name: 'Verify',
        path: '/verify/:id',
        component: () => import('pages/users/UserVerify.vue')
      },

    ]
  },

  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
