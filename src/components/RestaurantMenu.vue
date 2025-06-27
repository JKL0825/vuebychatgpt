<template>
    <div class="restaurant-menu">
        <div class="md:w-1/2">
            <div class="card">
                <div class="font-semibold text-xl mb-4">{{ menuTitle }}</div>
                <Tabs value="0">
                    <TabList>
                        <Tab v-for="(category, index) in menuCategories" :key="index" :value="index.toString()">
                            {{ category.name }}
                        </Tab>
                    </TabList>
                </Tabs>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    menuTitle: {
        type: String,
        default: 'TabMenu'
    },
    menuCategories: {
        type: Array,
        default: () => [
            { name: 'Header I' },
            { name: 'Header II' },
            { name: 'Header III' }
        ]
    }
})
</script>

<!-- 樣式已移至 src/assets/css/restaurant-view.css -->