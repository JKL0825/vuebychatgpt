<template>
    <div class="restaurant-map">
        <h4 class="text-orange mt-4">地圖</h4>
        <div class="ratio ratio-16x9 mb-4">
            <iframe :src="mapUrl" allowfullscreen :title="restaurant.name + '地圖'"></iframe>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    restaurant: {
        type: Object,
        required: true
    }
})

const mapUrl = computed(() => {
    return `https://www.google.com/maps?q=${encodeURIComponent(props.restaurant.address)}&output=embed`
})
</script>

<!-- 樣式已移至 src/assets/css/restaurant-view.css -->