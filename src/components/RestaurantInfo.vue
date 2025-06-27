<template>
    <div class="restaurant-info">
        <!-- 店家資訊 -->
        <ul class="list-unstyled mb-4">
            <li><strong>地址：</strong>{{ restaurant.address }}</li>
            <li><strong>電話：</strong>{{ restaurant.phone }}</li>
        </ul>

        <!-- 營業時間 -->
        <h4 class="text-orange">營業時間</h4>
        <p>{{ restaurant.businessHours }}</p>
    </div>
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