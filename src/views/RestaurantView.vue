<template>
    <div class="restaurant-view-wrapper">
        <RestaurantTemplate :restaurant="restaurantData" v-if="restaurantData.id" />
        <div v-else class="loading-state">
            <p>載入餐廳資料中...</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import RestaurantTemplate from '../restaurant-module/components/RestaurantTemplate.vue'
import { getRestaurantById } from '../restaurant-module/data/restaurants.js'

const route = useRoute()
const restaurantData = ref({})

onMounted(() => {
    // 從路由參數獲取餐廳 ID，如果沒有就使用預設的 1 (Plants)
    const restaurantId = parseInt(route.params.id) || 1
    restaurantData.value = getRestaurantById(restaurantId)
})
</script>

<style scoped>
.restaurant-view-wrapper {
    min-height: 100vh;
    background: #fff;
}

.loading-state {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
    color: #666;
    font-size: 1.1rem;
}
</style>

<!-- 樣式已移至 src/assets/css/restaurant-view.css -->