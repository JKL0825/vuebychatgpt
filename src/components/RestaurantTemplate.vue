<template>
    <div class="restaurant-container">
        <!-- 餐廳橫幅 -->
        <RestaurantBanner :restaurant="restaurant" />

        <!-- 餐廳資訊 -->
        <RestaurantInfo :restaurant="restaurant" />

        <div class="text-center my-4">
            <!-- 餐廳菜單 -->
            <RestaurantMenu :menuTitle="restaurant.menuTitle" :menuCategories="restaurant.menuCategories" />

            <!-- 訂位按鈕 -->
            <button class="btn btn-warning text-white" @click="scrollToReservation">
                立即訂位
            </button>
        </div>

        <!-- 訂位表單 -->
        <div ref="reservationSection">
            <ReservationForm :restaurantId="restaurant.id" />
        </div>

        <!-- 地圖 -->
        <RestaurantMap :restaurant="restaurant" />

        <!-- 頁腳 -->
        <RestaurantFooter :copyrightText="restaurant.copyrightText" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import RestaurantBanner from './RestaurantBanner.vue'
import RestaurantInfo from './RestaurantInfo.vue'
import RestaurantMenu from './RestaurantMenu.vue'
import RestaurantMap from './RestaurantMap.vue'
import RestaurantFooter from './RestaurantFooter.vue'
import ReservationForm from './ReservationForm.vue'

defineProps({
    restaurant: {
        type: Object,
        required: true
    }
})

const reservationSection = ref(null)

const scrollToReservation = () => {
    reservationSection.value?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<!-- 樣式已移至 src/assets/css/restaurant-view.css -->