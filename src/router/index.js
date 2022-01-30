import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '',
        name: 'Index',
        component: () => import('../views/Index.vue')
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('../views/Products.vue')
      },
      {
        path: 'product/:productId',
        name: 'Product',
        component: () => import('../views/Product.vue')
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('../views/Cart.vue')
      },
      {
        path: 'cartinfo',
        name: 'Cartinfo',
        component: () => import('../views/CartInfo.vue')
      },
      {
        path: 'checkout/:orderId',
        name: 'Checkout',
        component: () => import('../views/CheckOut.vue')
      },
      {
        path: 'checkoutsuccess/:orderId',
        name: 'CheckoutSuccess',
        component: () => import('../views/CheckOutSuccess.vue')
      },
      {
        path: 'blogs',
        name: 'Blogs',
        component: () => import('../views/Blogs.vue')
      },
      {
        path: 'blog/:blogId',
        name: 'Blog',
        component: () => import('../views/Blog.vue')
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('../views/Orders.vue')
      },
      {
        path: 'about',
        name: 'About',
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
    redirect: '/dashboard/charts',
    component: () => import('../views/dashboard/Dashboard.vue'),
    children: [
      {
        path: 'charts',
        name: 'DashboardCharts',
        component: () => import('../views/dashboard/Charts.vue')
      },
      {
        path: 'products',
        name: 'DashboardProducts',
        component: () => import('../views/dashboard/Products.vue')
      },
      {
        path: 'orders',
        name: 'DashboardOrders',
        component: () => import('../views/dashboard/Orders.vue')
      },
      {
        path: 'coupons',
        name: 'DashboardCoupons',
        component: () => import('../views/dashboard/Coupons.vue')
      },
      {
        path: 'articles',
        name: 'DashboardArticles',
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
  linkActiveClass: '',
  linkExactActiveClass: 'active'
})

export default router
