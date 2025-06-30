<template>
  <div class="home-view">
    <!-- 內容區域 -->
    <div class="content-area">
      <!-- 歡迎訊息 -->
      <div class="welcome-section">
        <h1 class="welcome-title">歡迎來到餐廳預約系統</h1>
        <p class="welcome-subtitle">請使用路由導航到餐廳頁面</p>
        <div class="demo-links">
          <router-link to="/restaurant/1" class="demo-link">
            🍽️ 查看 Plants 餐廳
          </router-link>
          <router-link to="/restaurant/2" class="demo-link">
            🌊 查看海景餐廳
          </router-link>
          <router-link to="/restaurant/3" class="demo-link">
            🍕 查看 Italian Corner
          </router-link>
        </div>
      </div>

      <!-- 路由內容 -->
      <router-view />
    </div>
  </div>
</template>

<script setup>
// 移除對已刪除組件的引用
// import HomeContent from '@/components/HomeContent.vue' // 已刪除

</script>

<style scoped>
.home-view {
  min-height: 100vh;
  padding: 2rem;
}

.content-area {
  max-width: 1200px;
  margin: 0 auto;
}

.welcome-section {
  text-align: center;
  padding: 3rem 0;
}

.welcome-title {
  font-size: 2.5rem;
  color: #ff6c00;
  margin-bottom: 1rem;
  font-weight: 700;
}

.welcome-subtitle {
  font-size: 1.25rem;
  color: #666;
  margin-bottom: 2rem;
}

.demo-links {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.demo-link {
  display: inline-block;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #ff6c00, #e55a00);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(255, 108, 0, 0.3);
}

.demo-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 108, 0, 0.4);
}

/* 響應式設計 */
@media (max-width: 768px) {
  .welcome-title {
    font-size: 2rem;
  }

  .welcome-subtitle {
    font-size: 1.1rem;
  }

  .demo-links {
    flex-direction: column;
    align-items: center;
  }

  .demo-link {
    width: 100%;
    max-width: 300px;
  }
}
</style>