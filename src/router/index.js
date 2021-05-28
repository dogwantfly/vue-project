import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        // 子路徑可不加 /
        path: 'products',
        component: () => import('../views/Products.vue')
      },
      {
        // 子路徑可不加 /
        path: 'cart',
        component: () => import('../views/Cart.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        // 子路徑可不加 /
        path: 'products',
        component: () => import('../views/dashboard/Products.vue')
      }
    ]
  }
  // {
  //   path: '/newpage',
  //   name: '新增頁面',
  //   component: () => import('../views/NewPage.vue'),
  //   children: [
  //     {
  //       // 子路徑可不加 /
  //       path: 'a',
  //       component: () => import('../views/ComponentA.vue')
  //     },
  //     {
  //       path: 'b',
  //       component: () => import('../views/ComponentB.vue')
  //     },
  //     {
  //       path: 'dynamicrouter/:id',
  //       component: () => import('../views/DynamicRouter.vue')
  //     },
  //     {
  //       path: 'dynamicrouterbyprops/:id',
  //       component: () => import('../views/DynamicRouterByProps.vue'),
  //       props: (route) => {
  //         console.log(route)
  //         return {
  //           id: route.params.id
  //         }
  //       }
  //     },
  //     {
  //       path: 'routerNavigation',
  //       component: () => import('../views/RouterNavigation.vue')
  //     },
  //     {
  //       path: 'namedview',
  //       component: () => import('../views/NamedView.vue'),
  //       children: [
  //         {
  //           path: 'a2b',
  //           components: {
  //             left: () => import('../views/ComponentA.vue'),
  //             right: () => import('../views/ComponentB.vue')
  //           }
  //         },
  //         {
  //           path: 'b2c',
  //           components: {
  //             left: () => import('../views/ComponentB.vue'),
  //             right: () => import('../views/ComponentC.vue')
  //           }
  //         }
  //       ]
  //     }
  //   ]
  // },
  // // 404 頁面
  // {
  //   path: '/:pathMatch(.*)*',
  //   component: () => import('../views/NotFound.vue')
  // },
  // // 重新導向
  // {
  //   path: '/newPage/:pathMatch(.*)*',
  //   redirect: {
  //     name: 'Home'
  //   }
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active'
})

export default router
