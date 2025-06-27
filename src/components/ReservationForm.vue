<template>
    <div ref="formRef" style="width: 100%; margin: 0 auto;">
        <div class="row align-items-end guest-date-row">
            <div class="col guest-col">
                <label>用餐人數</label>
                <div class="guest-select-group">
                    <Select v-model="selectedGuest" :options="guests" optionLabel="name" placeholder="請選擇用餐人數" checkmark
                        :highlightOnSelect="false" class="w-full md:w-56" />
                    <Select v-model="selectChild" :options="children" optionLabel="name" placeholder="請選擇用餐人數" checkmark
                        :highlightOnSelect="false" class="w-full md:w-56" />

                    <div class="col date-col">
                        <label>用餐日期</label>
                        <DatePicker v-model="date" placeholder="請選擇" dateFormat="yy/mm/dd" :minDate="minDate"
                            :selectableDate="isDateSelectable" />
                    </div>
                </div>
                <div class="date-hint">
                    <small class="text-muted">
                        <i class="pi pi-info-circle"></i>
                        僅顯示有時間段的可預約日期・可接受1-6位訂位（含大人與小孩）・超過6人請電話預約
                        <a href="tel:0227845677" class="main-color">02-2784-5677</a>
                    </small>
                </div>
            </div>
        </div>
        <hr />
        <div class="mb-3">
            <h5 class="text-orange">選擇用餐時間</h5>
            <div v-if="loading" class="text-center py-3">
                <i class="pi pi-spinner pi-spin"></i> 載入時間段中...
            </div>
            <div v-else-if="!date" class="text-muted py-3">
                請先選擇用餐日期
            </div>
            <div v-else-if="timeSections.length === 0" class="text-muted py-3">
                <i class="pi pi-info-circle"></i> 當日暫無可用時間段
            </div>
            <TimePickerSectioned v-else v-model="selectedTime" :sections="timeSections"
                :disabledSlots="disabledTimeSlots" />
        </div>
        <h4 class="text-orange mb-3">預約訂位</h4>
        <!-- 姓名 -->
        <div class="mb-3">
            <label class="form-label">姓名</label>
            <InputText id="nameInput" v-model="name" class="form-control" placeholder="請輸入姓名" />
        </div>

        <!-- 電話 -->
        <div class="mb-3">
            <label class="form-label">電話</label>
            <InputText v-model="phone" class="form-control" placeholder="請輸入電話" />
        </div>

        <!-- 備註 -->
        <div class="mb-3">
            <label class="form-label">備註</label>
            <InputText v-model="note" class="form-control" placeholder="(選填)" />
        </div>

        <Button label="送出預約" icon="pi pi-check" class="primary-btn" @click="submit" />
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import Swal from 'sweetalert2'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import DatePicker from 'primevue/datepicker'
import Select from 'primevue/select'
import '@/assets/css/style.css'
import '@/assets/css/reservationform.css'
import TimePickerSectioned from '@/components/TimePickerSectioned.vue'
import {
    getTimeSlotsForDate,
    groupTimeSlotsByPeriod,
    formatDateToString
} from '@/utils/timeSlotUtils.js'

// 定義 props 接收餐廳 ID
const props = defineProps({
    restaurantId: {
        type: String,
        required: true
    }
})

const date = ref(null)
const name = ref('')
const phone = ref('')
const email = ref('')
const note = ref('')
const formRef = ref(null)
const selectedTime = ref('')
const minDate = new Date()


const selectedGuest = ref();
const selectChild = ref();
const guests = ref([
    { name: '1 位大人' },
    { name: '2 位大人' },
    { name: '3 位大人' },
    { name: '4 位大人' },
    { name: '5 位大人' }
]);
const children = ref([
    { name: '0 位小孩' },
    { name: '1 位小孩' },
    { name: '2 位小孩' },
    { name: '3 位小孩' },
    { name: '4 位小孩' }
]);

// 後台數據狀態
const timeSlots = ref([]) // 存儲完整的時間段數據
const bookedSlots = ref([]) // 存儲已預訂的時間段
const loading = ref(false)

// 從後台抓取時間段數據
const fetchTimeSlots = async () => {
    loading.value = true
    try {
        // 實際 API 調用
        // const response = await fetch(`/api/restaurants/${props.restaurantId}/time-slots`)
        // const data = await response.json()

        // 暫時使用本地 JSON 文件模擬
        // 動態導入 JSON 文件
        const { default: data } = await import('@/data/timeslots_30d.json')

        // 過濾出當前餐廳的時間段
        // 直接使用數字 ID，與 JSON 中的 restaurantId 對應
        const restaurantIdNum = parseInt(props.restaurantId) || 1
        timeSlots.value = data.filter(slot => slot.restaurantId === restaurantIdNum)

        // 同時獲取已預訂的時間段（這裡模擬一些已預訂的時間）
        await fetchBookedSlots()

        console.log('餐廳ID:', props.restaurantId, '→', restaurantIdNum)
        console.log('抓取到的時間段數量:', timeSlots.value.length)
    } catch (error) {
        console.error('抓取時間段失敗:', error)
        timeSlots.value = []
    } finally {
        loading.value = false
    }
}

// 從後台抓取已預訂的時間段
const fetchBookedSlots = async () => {
    try {
        // 實際 API 調用
        // const response = await fetch(`/api/restaurants/${props.restaurantId}/booked-slots`)
        // const data = await response.json()

        // 模擬一些已預訂的時間段
        const restaurantIdNum = parseInt(props.restaurantId) || 1
        bookedSlots.value = [
            { restaurantId: restaurantIdNum, date: '2025-06-27', startTime: '12:00' },
            { restaurantId: restaurantIdNum, date: '2025-06-27', startTime: '19:00' },
            { restaurantId: restaurantIdNum, date: '2025-06-28', startTime: '13:00' },
        ]
    } catch (error) {
        console.error('抓取已預訂時間段失敗:', error)
        bookedSlots.value = []
    }
}

// 獲取可選擇的日期（有時間段的日期）
const availableDates = computed(() => {
    if (timeSlots.value.length === 0) return new Set()

    const today = new Date()

    // 包含今天以後所有有時間段的日期，不限制月份
    return new Set(
        timeSlots.value
            .map(slot => slot.date)
            .filter(dateStr => {
                const slotDate = new Date(dateStr)
                return slotDate >= today
            })
    )
})

// 判斷日期是否可選擇的函數
const isDateSelectable = (date) => {
    if (!date) return false

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const dateString = `${year}-${month}-${day}`

    return availableDates.value.has(dateString)
}

// 根據選中的日期獲取當天的時間段
const todayTimeSlots = computed(() => {
    return getTimeSlotsForDate(timeSlots.value, date.value)
})

// 將時間段按時間分組（午餐、下午、晚餐等）
const timeSections = computed(() => {
    return groupTimeSlotsByPeriod(todayTimeSlots.value)
})

// 已預訂的時間段（不可選擇）
const disabledTimeSlots = computed(() => {
    if (!date.value || bookedSlots.value.length === 0) return []

    const selectedDateStr = formatDateToString(date.value)
    return bookedSlots.value
        .filter(booking => booking.date === selectedDateStr)
        .map(booking => booking.startTime)
})

// 監聽日期變化，重置選中的時間
watch(date, () => {
    selectedTime.value = ''
})



// 組件掛載時抓取數據
onMounted(() => {
    fetchTimeSlots()
})

const submit = () => {
    if (!date.value || !selectedTime.value || !name.value || !phone.value) {
        Swal.fire({
            icon: 'warning',
            title: '請填寫完整資訊',
            text: '預約日期、時間、姓名與電話為必填項目。',
        })
        formRef.value?.scrollIntoView({ behavior: 'smooth' })
        return
    }

    const formattedDate = formatDateToString(date.value)

    Swal.fire({
        title: '請確認您的預約資訊',
        html: `
        <b>日期：</b> ${formattedDate}<br/>
        <b>時間：</b> ${selectedTime.value}<br/>
        <b>姓名：</b> ${name.value}<br/>
        <b>電話：</b> ${phone.value}<br/>
        <b>備註：</b> ${note.value || '無'}`,
        showCancelButton: true,
        confirmButtonText: '確認送出',
        cancelButtonText: '返回修改'
    }).then(result => {
        if (result.isConfirmed) {
            Swal.fire('預約成功！', '我們將儘快與您聯絡確認，謝謝！', 'success')
            date.value = null
            name.value = ''
            phone.value = ''
            note.value = ''
        }
    })
}
</script>

<style src="@/assets/css/reservationform.css"></style>
<!-- src/
├── App.vue                     ← 主要容器 + 導覽列
├── main.js                     ← 套件註冊 & 啟動點
├── router/
│   └── index.js                ← Vue Router 設定
├── views/
│   └── RestaurantView.vue      ← 店家畫面 + 包含 <ReservationForm />
├── components/
│   └── ReservationForm.vue     ← 抽出訂位表單元件 -->