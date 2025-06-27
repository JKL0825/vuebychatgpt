import {
  createRouter,
  createWebHistory
} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RestaurantView from '../views/RestaurantView.vue'

const routes = [{
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: '金晚 GoldenBowl | 歡迎光臨'
    }
  },
  {
    path: '/restaurant',
    name: 'restaurant',
    component: RestaurantView,
    meta: {
      title: '金晚 GoldenBowl | 立即點餐！inline 線上訂餐'
    }
  },
  {
    path: '/restaurant/:id',
    name: 'restaurantDetail',
    component: RestaurantView,
    meta: {
      title: '金晚 GoldenBowl | 餐廳詳情'
    }
  },
  {
    path: '/:id',
    name: 'restaurantById',
    component: RestaurantView,
    meta: {
      title: '金晚 GoldenBowl | 餐廳詳情'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 全域監聽：根據路由設定頁面標題
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '金晚 GoldenBowl'
  next()
})

export default router