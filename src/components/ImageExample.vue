<template>
    <div class="image-examples">
        <h3>圖片導入方法示例</h3>

        <!-- 方法1: 直接導入使用 -->
        <div class="example-section">
            <h4>方法1: 直接導入圖片</h4>
            <img :src="restaurantImage" alt="餐廳圖片" class="example-img" />
            <pre><code>
// 在 script 中導入
import restaurantImg from '@/assets/images/restaurant.avif'

// 在 template 中使用
&lt;img :src="restaurantImage" alt="餐廳圖片" /&gt;
      </code></pre>
        </div>

        <!-- 方法2: 使用工具函數 -->
        <div class="example-section">
            <h4>方法2: 動態導入函數</h4>
            <img :src="dynamicImage" alt="動態圖片" class="example-img" />
            <pre><code>
// 使用動態導入函數
&lt;img :src="getImageUrl('restaurant.avif')" alt="動態圖片" /&gt;
      </code></pre>
        </div>

        <!-- 方法3: 使用 public 目錄 -->
        <div class="example-section">
            <h4>方法3: Public 目錄（適合靜態資源）</h4>
            <p>將圖片放在 <code>public/images/</code> 目錄下</p>
            <pre><code>
// 直接使用路徑
&lt;img src="/images/restaurant.jpg" alt="公共圖片" /&gt;
      </code></pre>
        </div>

        <!-- 方法4: 條件渲染圖片 -->
        <div class="example-section">
            <h4>方法4: 條件渲染不同圖片</h4>
            <div class="image-grid">
                <img v-for="(restaurant, key) in restaurants" :key="key" :src="restaurant.image" :alt="restaurant.name"
                    class="example-img small" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
// 方法1: 直接導入
import restaurantImg from '@/assets/images/restaurant.avif'
import { getImageUrl } from '@/utils/imageImports'
import { restaurants } from '@/data/restaurants'

// 響應式數據
const restaurantImage = ref(restaurantImg)
const dynamicImage = ref(getImageUrl('restaurant.avif'))
</script>

<style scoped>
.image-examples {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
}

.example-section {
    margin-bottom: 2rem;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
}

.example-img {
    max-width: 300px;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
    margin: 10px 0;
}

.example-img.small {
    max-width: 150px;
    height: 100px;
    margin: 5px;
}

.image-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

pre {
    background: #f5f5f5;
    padding: 10px;
    border-radius: 4px;
    overflow-x: auto;
}

code {
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
}

h4 {
    color: #ff6c00;
    margin-bottom: 1rem;
}
</style>