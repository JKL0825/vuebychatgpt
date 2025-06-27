<template>
    <footer class="text-center text-muted mt-5" style="font-size: 0.9rem">
        {{ copyrightText }}
    </footer>
</template>

<script setup>
defineProps({
    copyrightText: {
        type: String,
        default: '© 2021 Plants All Rights Reserved'
    }
})
</script>

<!-- 樣式已移至 src/assets/css/restaurant-view.css -->