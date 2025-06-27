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
                        <DatePicker v-model="date" placeholder="請選擇" dateFormat="yy/mm/dd" />
                    </div>
                </div>
                <div>
                    可接受1-6位訂位（含大人與小孩）・超過6人的訂位，請使用電話預約
                    <a href="tel:0227845677" class="main-color">02-2784-5677</a>
                </div>
            </div>
        </div>
        <hr />
        <TimePickerSectioned v-model="selectedTime" :sections="[
            { label: '中午', slots: ['12:00', '12:30', '13:00'] },
            { label: '下午', slots: ['14:00', '14:30', '15:00'] },
            { label: '晚上', slots: ['18:00', '18:30', '19:00'] }
        ]" :disabledSlots="['14:30', '18:00']" />

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
import { ref } from 'vue'
import Swal from 'sweetalert2'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import DatePicker from 'primevue/datepicker'
import Select from 'primevue/select'
import '@/assets/css/style.css'
import '@/assets/css/reservationform.css'
import TimePickerSectioned from '@/components/TimePickerSectioned.vue'

const date = ref(null)
const name = ref('')
const phone = ref('')
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

const submit = () => {
    if (!date.value || !name.value || !phone.value) {
        Swal.fire({
            icon: 'warning',
            title: '請填寫完整資訊',
            text: '預約時間、姓名與電話為必填項目。',
        })
        formRef.value?.scrollIntoView({ behavior: 'smooth' })
        return
    }

    // 格式化日期為 yyyy-mm-dd 格式
    const formatDate = (date) => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    const formattedDate = formatDate(date.value)

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