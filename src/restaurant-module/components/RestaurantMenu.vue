<template>
    <div class="restaurant-menu">
        <div class="menu-container">
            <div class="menu-card">
                <h3 class="menu-title">{{ restaurant.menuTitle || '餐廳菜單' }}</h3>
                <div class="menu-tabs">
                    <button v-for="(category, index) in restaurant.menuCategories" :key="index"
                        :class="['menu-tab', { active: activeTab === index }]" @click="activeTab = index">
                        {{ category.name }}
                    </button>
                </div>
                <div class="menu-content">
                    <div v-if="restaurant.menuCategories && restaurant.menuCategories.length > 0">
                        <p class="menu-description">
                            {{ restaurant.menuCategories[activeTab]?.name }} 系列
                        </p>
                        <p class="menu-note">
                            詳細菜單內容請洽詢店家或電話預約時詢問
                        </p>
                    </div>
                    <div v-else class="no-menu">
                        <p>菜單資訊請洽詢店家</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
    restaurant: {
        type: Object,
        required: true
    }
})

const activeTab = ref(0)
</script>

<style scoped>
.restaurant-menu {
    margin: 2rem 0;
}

.menu-container {
    max-width: 800px;
    margin: 0 auto;
}

.menu-card {
    background: #fff;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.menu-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #ff6c00;
    margin-bottom: 1.5rem;
    text-align: center;
}

.menu-tabs {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid #eee;
    overflow-x: auto;
}

.menu-tab {
    padding: 0.75rem 1.5rem;
    border: none;
    background: none;
    color: #666;
    font-weight: 500;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: all 0.3s ease;
    white-space: nowrap;
}

.menu-tab:hover {
    color: #ff6c00;
}

.menu-tab.active {
    color: #ff6c00;
    border-bottom-color: #ff6c00;
}

.menu-content {
    padding: 1rem 0;
}

.menu-description {
    font-size: 1.1rem;
    color: #333;
    margin-bottom: 1rem;
}

.menu-note {
    color: #666;
    font-size: 0.9rem;
    line-height: 1.5;
}

.no-menu {
    text-align: center;
    color: #666;
    padding: 2rem 0;
}

/* 響應式設計 */
@media (max-width: 768px) {
    .menu-card {
        padding: 1.5rem;
        margin: 0 1rem;
    }

    .menu-title {
        font-size: 1.25rem;
    }

    .menu-tabs {
        padding-bottom: 0.5rem;
    }

    .menu-tab {
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
    }
}
</style>