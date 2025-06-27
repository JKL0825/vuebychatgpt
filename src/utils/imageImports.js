// 圖片導入方法示例

// 方法1: 直接導入單個圖片（推薦）
import restaurantImg from '@/assets/images/restaurant.avif'
import logoImg from '@/assets/logo.svg'

// 方法2: 批量導入圖片
function importAll(r) {
    let images = {};
    r.keys().map((item, index) => {
        images[item.replace('./', '')] = r(item);
    });
    return images;
}

// 使用 Vite 的 import.meta.glob 批量導入
const images = import.meta.glob('@/assets/images/*', {
    eager: true
})

// 方法3: 動態導入函數
export const getImageUrl = (imageName) => {
    return new URL(`../assets/images/${imageName}`, import.meta.url).href
}

// 方法4: 使用 public 目錄（不推薦用於組件圖片）
// 放在 public/images/ 目錄下的圖片可以直接使用 "/images/filename.jpg"

// 導出常用圖片
export const commonImages = {
    restaurant: restaurantImg,
    logo: logoImg
}

// 導出所有圖片（如果有多張）
export const allImages = images

// 使用示例：
// 1. 在組件中直接使用：
// import { commonImages } from '@/utils/imageImports'
// <img :src="commonImages.restaurant" alt="餐廳圖片" />

// 2. 動態使用：
// <img :src="getImageUrl('restaurant.avif')" alt="餐廳圖片" />

// 3. 在 data 中使用：
// data() {
//   return {
//     restaurantImage: commonImages.restaurant
//   }
// } 