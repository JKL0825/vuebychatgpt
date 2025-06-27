<template>
    <div class="reservation-banner">
        <img :src="restaurant.image" :alt="restaurant.name + '店面圖片'" class="banner-img" />
    </div>

    <!-- 店名 -->
    <h2 class="text-orange">{{ restaurant.name }}</h2>
</template>

<script setup>
defineProps({
    restaurant: {
        type: Object,
        required: true
    }
})
</script>

<!-- 樣式已移至 src/assets/css/restaurant-view.css -->