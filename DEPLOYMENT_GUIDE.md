# 餐廳模組部署指南

## 🚀 快速部署

### 1. 複製模組文件

將整個 `src/restaurant-module/` 目錄複製到目標專案中：

```bash
# 複製到目標專案
cp -r src/restaurant-module/ /path/to/target-project/src/
```

### 2. 安裝依賴

在目標專案中安裝必要的依賴：

```bash
npm install primevue@^4.2.0 primeicons@^7.0.0 sweetalert2@^11.14.0
```

### 3. 註冊 PrimeVue

在目標專案的 `main.js` 中配置 PrimeVue：

```javascript
import { createApp } from "vue";
import App from "./App.vue";

// PrimeVue
import PrimeVue from "primevue/config";
import "primevue/resources/themes/aura-light-green/theme.css";
import "primeicons/primeicons.css";

const app = createApp(App);
app.use(PrimeVue);
app.mount("#app");
```

## 📋 使用方式

### 方法一：獨立使用單個組件

```vue
<template>
  <div>
    <RestaurantTemplate :restaurant="selectedRestaurant" />
  </div>
</template>

<script setup>
import { RestaurantTemplate, getRestaurantById } from "@/restaurant-module";

// 獲取餐廳資料
const selectedRestaurant = getRestaurantById(1);
</script>
```

### 方法二：全域註冊（適合多處使用）

```javascript
// main.js
import RestaurantModule from "@/restaurant-module";

const app = createApp(App);
app.use(RestaurantModule);
```

然後在任何組件中使用：

```vue
<template>
  <RestaurantTemplate :restaurant="restaurant" />
  <ReservationForm restaurant-id="1" />
</template>
```

### 方法三：按需導入（推薦）

```vue
<script setup>
import {
  RestaurantTemplate,
  ReservationForm,
  RestaurantBanner,
  getRestaurantById,
} from "@/restaurant-module";
</script>
```

## 🔧 整合到 Vue Router

```javascript
// router/index.js
import { getRestaurantById } from "@/restaurant-module";

const routes = [
  {
    path: "/restaurant/:id",
    name: "Restaurant",
    component: () => import("@/views/RestaurantPage.vue"),
    props: (route) => ({
      restaurant: getRestaurantById(parseInt(route.params.id)),
    }),
  },
];
```

在頁面組件中：

```vue
<!-- views/RestaurantPage.vue -->
<template>
  <RestaurantTemplate :restaurant="restaurant" />
</template>

<script setup>
import { RestaurantTemplate } from "@/restaurant-module";
defineProps(["restaurant"]);
</script>
```

## 🎨 自訂主題色彩

在目標專案的全域 CSS 中覆蓋色彩變數：

```css
/* src/assets/main.css */
:root {
  --primary-color: #your-brand-color;
  --primary-light: #your-light-color;
  --text-orange: #your-accent-color;
}
```

## 📊 資料格式

### 餐廳資料結構

確保你的餐廳資料符合以下格式：

```javascript
const restaurant = {
  id: 1, // 必須：餐廳ID
  name: "餐廳名稱", // 必須：餐廳名稱
  image: "/path/to/image", // 必須：餐廳圖片
  address: "完整地址", // 必須：餐廳地址
  phone: "電話號碼", // 必須：聯絡電話
  businessHours: "營業時間", // 必須：營業時間文字
  menuTitle: "菜單標題", // 可選：菜單標題
  menuCategories: [
    // 可選：菜單分類
    { name: "主餐" },
    { name: "飲品" },
  ],
  copyrightText: "版權文字", // 可選：頁腳版權
};
```

### 時間段資料結構

如果需要預約功能，準備時間段資料：

```json
[
  {
    "restaurantId": 1,
    "date": "2025-06-30",
    "startTime": "12:00",
    "endTime": "13:30",
    "period": "午餐",
    "maxParty": 6,
    "isAvailable": true
  }
]
```

## 🔍 故障排除

### 常見問題

#### 1. PrimeVue 組件無法顯示

```bash
# 確保安裝了 PrimeVue
npm install primevue primeicons
```

#### 2. SweetAlert2 彈窗不顯示

```bash
# 確保安裝了 SweetAlert2
npm install sweetalert2
```

#### 3. 圖片無法顯示

確保餐廳圖片路徑正確，並放在 `public/` 目錄或正確配置資源路徑。

#### 4. 樣式不正確

檢查是否引入了必要的 CSS：

```javascript
import "primevue/resources/themes/aura-light-green/theme.css";
import "primeicons/primeicons.css";
```

## ⚡ 效能優化

### 1. 懶載入組件

```javascript
const RestaurantTemplate = defineAsyncComponent(() =>
  import("@/restaurant-module/components/RestaurantTemplate.vue")
);
```

### 2. 按需載入時間段資料

```javascript
// 只在需要時載入時間段資料
const timeSlots = ref([]);
const loadTimeSlots = async (restaurantId) => {
  const { default: data } = await import(
    "@/restaurant-module/data/timeslots_30d.json"
  );
  timeSlots.value = data.filter((slot) => slot.restaurantId === restaurantId);
};
```

## 📦 打包建議

### Vite 配置

```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      external: ["vue", "primevue", "sweetalert2"],
      output: {
        manualChunks: {
          "restaurant-module": ["./src/restaurant-module/index.js"],
        },
      },
    },
  },
};
```

## 🧪 測試

建議為餐廳模組編寫測試：

```javascript
// tests/restaurant-module.test.js
import { getRestaurantById } from "@/restaurant-module";

describe("Restaurant Module", () => {
  test("should get restaurant by id", () => {
    const restaurant = getRestaurantById(1);
    expect(restaurant).toBeDefined();
    expect(restaurant.id).toBe(1);
  });
});
```

## 📞 支援

如需技術支援或發現問題，請聯繫開發團隊或查看 README.md 文件。
