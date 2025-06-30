<template>
    <div class="restaurant-banner">
        <img :src="restaurant.image" :alt="restaurant.name + '店面圖片'" class="banner-image" />
        <div class="banner-overlay">
            <div class="banner-content">
                <h2 class="restaurant-name">{{ restaurant.name }}</h2>
            </div>
        </div>
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

<style scoped>
.restaurant-banner {
    position: relative;
    width: 100%;
    height: 300px;
    margin-bottom: 2rem;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.banner-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.banner-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom,
            rgba(0, 0, 0, 0.3) 0%,
            rgba(0, 0, 0, 0.1) 50%,
            rgba(0, 0, 0, 0.5) 100%);
    display: flex;
    align-items: flex-end;
}

.banner-content {
    padding: 2rem;
    width: 100%;
}

.restaurant-name {
    color: white;
    font-size: 2rem;
    font-weight: 700;
    margin: 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

/* 響應式設計 */
@media (max-width: 768px) {
    .restaurant-banner {
        height: 250px;
        margin-bottom: 1.5rem;
    }

    .banner-content {
        padding: 1.5rem;
    }

    .restaurant-name {
        font-size: 1.5rem;
    }
}

@media (max-width: 480px) {
    .restaurant-banner {
        height: 200px;
    }

    .restaurant-name {
        font-size: 1.25rem;
    }
}
</style>