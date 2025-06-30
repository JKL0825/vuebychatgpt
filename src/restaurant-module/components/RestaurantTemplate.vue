<template>
    <div class="restaurant-container">
        <!-- 餐廳橫幅 -->
        <RestaurantBanner :restaurant="restaurant" />

        <!-- 預約按鈕 -->
        <div class="text-center my-4">
            <p>立即預約享受美食</p>
            <!-- 使用事件冒泡或 $emit 來處理滾動 -->
            <button class="btn btn-warning text-white" @click="scrollToReservation">
                🍽️ 立即預約
            </button>
        </div>

        <!-- 餐廳資訊 -->
        <RestaurantInfo :restaurant="restaurant" />

        <!-- 餐廳菜單 -->
        <RestaurantMenu :restaurant="restaurant" />

        <!-- 地圖 -->
        <RestaurantMap :restaurant="restaurant" />

        <!-- 預約表單 -->
        <div id="reservation-section">
            <ReservationForm :restaurant-id="restaurant.id.toString()" />
        </div>

        <!-- 頁腳 -->
        <RestaurantFooter :restaurant="restaurant" />
    </div>
</template>

<script setup>
import RestaurantBanner from './RestaurantBanner.vue'
import RestaurantInfo from './RestaurantInfo.vue'
import RestaurantMenu from './RestaurantMenu.vue'
import RestaurantMap from './RestaurantMap.vue'
import ReservationForm from './ReservationForm.vue'
import RestaurantFooter from './RestaurantFooter.vue'

// 接收餐廳資料
defineProps({
    restaurant: {
        type: Object,
        required: true
    }
})

const scrollToReservation = () => {
    const element = document.getElementById('reservation-section')
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
    }
}
</script>

<style scoped>
.restaurant-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.text-center {
    text-align: center;
}

.my-4 {
    margin: 1.5rem 0;
}

.btn {
    display: inline-block;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 16px;
}

.btn-warning {
    background-color: #ff6c00;
    color: white;
}

.btn-warning:hover {
    background-color: #e55a00;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 108, 0, 0.3);
}

.text-white {
    color: white !important;
}

#reservation-section {
    scroll-margin-top: 80px;
    /* 為了smooth scroll留空間 */
}
</style>