import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        // 子路徑可不加 /
        path: '',
        component: () => import('../views/Index.vue')
      },
      {
        path: 'products',
        component: () => import('../views/Products.vue')
      },
      {
        path: 'product/:productId',
        component: () => import('../views/Product.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/Cart.vue')
      },
      {
        path: 'checkout/:orderId',
        component: () => import('../views/CheckOut.vue')
      },
      {
        path: 'blogs',
        component: () => import('../views/Blogs.vue')
      },
      {
        path: 'blog/:blogId',
        component: () => import('../views/Blog.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/Orders.vue')
      },
      {
        path: 'about',
        component: () => import('../views/About.vue')
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
        path: '',
        component: () => import('../views/dashboard/Products.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/dashboard/Orders.vue')
      },
      {
        path: 'coupons',
        component: () => import('../views/dashboard/Coupons.vue')
      },
      {
        path: 'articles',
        component: () => import('../views/dashboard/Articles.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: {
      name: 'Home'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active'
})

export default router
