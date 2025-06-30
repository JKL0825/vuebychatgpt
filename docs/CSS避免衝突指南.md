# CSS 避免衝突指南

## 問題分析

目前專案的 CSS 架構容易造成樣式衝突：

1. **全域 CSS 導入** - 所有樣式通過 `main.css` 全域導入
2. **通用類名** - 使用通用類名如 `.nav`, `.primary-btn`
3. **大型第三方 CSS** - `style.css` 包含 4434 行樣式
4. **缺乏作用域** - 組件沒有使用 Vue 的 scoped CSS

## 解決方案

### 1. 立即實施：Scoped CSS

```vue
<template>
  <div class="my-component">
    <!-- 組件內容 -->
  </div>
</template>

<style scoped>
/* 這些樣式只會作用於此組件 */
.my-component {
  /* 樣式內容 */
}
</style>
```

### 2. CSS Modules 方案

```vue
<template>
  <div :class="$style.container">
    <button :class="$style.button">按鈕</button>
  </div>
</template>

<style module>
.container {
  padding: 20px;
}

.button {
  background: #007bff;
  color: white;
}
</style>
```

### 3. BEM 命名規範

```css
/* 區塊(Block) - 組件(Component) - 修飾符(Modifier) */
.restaurant-nav {
}
.restaurant-nav__link {
}
.restaurant-nav__link--active {
}

.reservation-form {
}
.reservation-form__input {
}
.reservation-form__button {
}
.reservation-form__button--primary {
}
```

### 4. CSS 變數統一管理

```css
/* src/assets/css/variables.css */
:root {
  --primary-color: #ff6c00;
  --secondary-color: #f8f9fa;
  --border-radius: 8px;
  --spacing-sm: 10px;
  --spacing-md: 20px;
  --spacing-lg: 30px;
}
```

### 5. 專案特定前綴

```css
/* 為所有類名添加專案前綴 */
.vue-restaurant-nav {
}
.vue-restaurant-nav-link {
}
.vue-restaurant-form {
}
.vue-restaurant-button {
}
```

## 實施計劃

### 階段一：緊急隔離 (立即)

- [x] ~~NavigationBar 組件改用 scoped CSS~~ (已移除 NavigationBar 組件)
- [ ] 所有其他組件改用 scoped CSS
- [ ] 移除全域 CSS 導入

### 階段二：樣式重構 (短期)

- [ ] 重構大型 `style.css` 文件
- [ ] 實施 BEM 命名規範
- [ ] 建立 CSS 變數系統

### 階段三：長期維護 (中期)

- [ ] 建立樣式指南
- [ ] 設置 CSS Lint 規則
- [ ] 建立組件樣式庫

## 代碼範例

### 改寫前 (容易衝突)

```css
/* 全域樣式 */
.nav {
  position: fixed;
  background: white;
}
.button {
  padding: 10px;
}
```

### 改寫後 (避免衝突)

```vue
<style scoped>
/* 作用域限制在組件內 */
.nav {
  position: fixed;
  background: white;
}
.button {
  padding: 10px;
}
</style>
```

### 或使用 BEM + 前綴

```css
.vue-restaurant-nav {
  position: fixed;
  background: white;
}
.vue-restaurant-nav__button {
  padding: 10px;
}
```

## 工具建議

### PostCSS 插件

```json
{
  "postcss-prefixwrap": "^1.30.0",
  "postcss-modules": "^4.3.1"
}
```

### CSS-in-JS 替代方案

```bash
npm install styled-components
npm install @emotion/css
```

## 檢查清單

- [x] 所有餐廳組件使用 scoped CSS
- [x] 移除全域 CSS 導入（刪除 style.css, bootstrap.css, debug.css）
- [x] 使用一致的命名規範
- [x] 建立 CSS 變數檔案
- [x] 建立模組化結構
- [x] 建立完整的使用指南文檔
- [x] 創建餐廳模組獨立 package.json

## 🎉 重構完成總結

### ✅ 已刪除的大型 CSS 文件

- `style.css` (74KB, 4434 行) - 第三方 CSS 樣式
- `bootstrap.min.css` (156KB) - Bootstrap 框架
- `debug.css` (49 行) - 除錯樣式
- `reservationform.css` (270 行) - 已改為 scoped CSS
- `home-content.css` (138 行) - 首頁專用樣式

### ✅ 模組化成果

- 創建完整的 `restaurant-module/` 結構
- 所有餐廳組件都有獨立的 scoped CSS
- 建立模組入口點 `index.js`
- 提供完整的使用文檔

### ✅ 樣式隔離

- 移除了超過 **230KB** 的不必要 CSS
- 所有組件樣式都限制在組件作用域內
- 使用 CSS 變數統一主題色彩

## 注意事項

1. **漸進式遷移** - 不要一次性改動所有樣式
2. **保持向後兼容** - 確保現有功能不受影響
3. **團隊協作** - 建立明確的樣式編寫規範
4. **性能考量** - 避免過度嵌套和重複樣式

## 參考資料

- [Vue Scoped CSS 文檔](https://vue-loader.vuejs.org/guide/scoped-css.html)
- [CSS Modules 文檔](https://github.com/css-modules/css-modules)
- [BEM 方法論](http://getbem.com/)
