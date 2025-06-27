<template>
    <div class="restaurant-view-wrapper">
        <RestaurantTemplate :restaurant="restaurantData" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import RestaurantTemplate from '../components/RestaurantTemplate.vue'
import { getRestaurantById } from '../data/restaurants.js'

const route = useRoute()
const restaurantData = ref({})

onMounted(() => {
    // 從路由參數獲取餐廳 ID，如果沒有就使用預設的 'plants'
    const restaurantId = route.params.id || 'plants'
    restaurantData.value = getRestaurantById(restaurantId)
})
</script>

<!-- 樣式已移至 src/assets/css/restaurant-view.css -->