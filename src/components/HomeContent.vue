<template>
    <div class="home-content">
        <div class="hero-section">
            <h1 class="hero-title">歡迎來到金晚 GoldenBowl</h1>
            <p class="hero-subtitle">品味生活，從這裡開始</p>

            <!-- 餐廳選擇 -->
            <div class="restaurant-selection">
                <h3>選擇餐廳</h3>
                <div class="restaurant-cards">
                    <router-link v-for="(restaurant, id) in restaurants" :key="id" :to="`/${id}`"
                        class="restaurant-card">
                        <div class="restaurant-icon">{{ getRestaurantIcon(id) }}</div>
                        <h4>{{ restaurant.name }}</h4>
                        <p>{{ getRestaurantDescription(id) }}</p>
                        <div class="restaurant-hours">{{ restaurant.businessHours }}</div>
                    </router-link>
                </div>
            </div>

            <div class="hero-features">
                <div class="feature-card">
                    <div class="feature-icon">🍽️</div>
                    <h3>精緻料理</h3>
                    <p>新鮮食材，用心烹調</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">⭐</div>
                    <h3>優質服務</h3>
                    <p>貼心服務，舒適用餐</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">📍</div>
                    <h3>絕佳位置</h3>
                    <p>交通便利，環境優雅</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { restaurants } from '@/data/restaurants.js'

// 餐廳圖標映射 - 使用數字 ID
const getRestaurantIcon = (id) => {
    const iconMap = {
        1: '🌱',  // Plants
        2: '🌊',  // 海景餐廳
        3: '🍝'   // Italian Corner
    }
    return iconMap[id] || '🍽️'
}

// 餐廳描述映射 - 使用數字 ID
const getRestaurantDescription = (id) => {
    const descriptionMap = {
        1: '健康蔬食料理',
        2: '海景與美食的完美結合',
        3: '道地義式料理'
    }
    return descriptionMap[id] || '美味餐點'
}
</script>

<!-- 樣式已移至 src/assets/css/home-content.css -->