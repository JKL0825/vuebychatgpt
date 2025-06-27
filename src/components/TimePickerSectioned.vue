<template>
    <div class="time-picker-sectioned">
        <div v-for="section in sections" :key="section.label" class="section mb-4">
            <h6 class="section-label text-muted mb-2">{{ section.label }}</h6>
            <div class="time-slot-group">
                <button v-for="slot in section.slots" :key="slot" :class="{
                    'time-slot-button': true,
                    selected: modelValue === slot,
                    disabled: isDisabled(slot)
                }" @click="select(slot)">
                    <span class="text-md">{{ slot }}</span>
                </button>

            </div>
        </div>
    </div>
</template>

<script setup>
import Button from 'primevue/button'
import { computed } from 'vue'

const props = defineProps({
    sections: {
        type: Array,
        required: true
    },
    modelValue: String,
    disabledSlots: {
        type: Array,
        default: () => []
    }
})

const emit = defineEmits(['update:modelValue'])

function isDisabled(slot) {
    return props.disabledSlots.includes(slot)
}

function select(slot) {
    if (!isDisabled(slot)) emit('update:modelValue', slot)
}
</script>

<style scoped>
.time-slot-group {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.section-label {
    font-size: 0.85rem;
    font-weight: 500;
}

.time-slot-button {
    appearance: none;
    background-color: transparent;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    box-sizing: border-box;
    color: rgba(0, 0, 0, 0.75);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    font-family: "GT America", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-size: 16px;
    font-weight: 400;
    height: 48px;
    min-width: 0;
    padding: 5px 0;
    margin: 0 5px 10px;
    text-align: center;
    text-transform: none;
    outline: none;
    width: 180px;
    transition: all 0.2s ease-in-out;

    /* 讓字體更滑順 */
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
}

.time-slot-button.selected {
    background-color: #e86d00;
    border-color: #e86d00;
}

.time-slot-button.disabled {
    background-color: #f2f2f2;
    border-color: #ccc;
    color: #999;
    pointer-events: none;
}

.time-slot-button:hover {
    background-color: #f17100;
    /* 比主色稍深 */
    border-color: #f17100;
    transition: background-color 0.2s, border-color 0.2s;


}
</style>