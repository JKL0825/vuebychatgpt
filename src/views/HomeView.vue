<template>
  <div class="home-view">
    <NavigationBar :activeTab="activeTab" @switchTab="handleTabSwitch" />

    <!-- 內容區域，添加頂部間距避免被導航遮擋 -->
    <div class="content-area">
      <!-- 首頁內容 -->
      <div v-show="activeTab === 'home'" class="tab-content">
        <HomeContent />
      </div>
      <router-view />
      <!-- 餐廳頁內容 -->
      <div v-show="activeTab === 'restaurant'" class="tab-content">
        <RestaurantView />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NavigationBar from '@/components/NavigationBar.vue'
import HomeContent from '@/components/HomeContent.vue'
import RestaurantView from '@/views/RestaurantView.vue'

const activeTab = ref('home')

const handleTabSwitch = (tab) => {
  activeTab.value = tab
}
</script>

<!-- 樣式已移至 src/assets/css/home-view.css -->