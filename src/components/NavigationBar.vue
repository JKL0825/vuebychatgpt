<template>
    <header>
        <nav class="nav">
            <button @click="$emit('switchTab', 'home')" :class="['nav-link', { active: activeTab === 'home' }]">
                🏠 首頁
            </button>
            <button @click="$emit('switchTab', 'restaurant')"
                :class="['nav-link', { active: activeTab === 'restaurant' }]">
                🍽️ 餐廳頁
            </button>
        </nav>
    </header>
</template>

<script setup>
defineProps({
    activeTab: {
        type: String,
        default: 'home'
    }
})

defineEmits(['switchTab'])
</script>

<!-- 樣式已移至 src/assets/css/navigationbar.css -->