<template>
    <div class="home-content">
        <div class="hero-section">
            <h1 class="hero-title">歡迎來到金晚 GoldenBowl</h1>
            <p class="hero-subtitle">品味生活，從這裡開始</p>

            <!-- 餐廳選擇 -->
            <div class="restaurant-selection">
                <h3>選擇餐廳</h3>
                <div class="restaurant-cards">
                    <router-link to="/restaurant/plants" class="restaurant-card">
                        <div class="restaurant-icon">🌱</div>
                        <h4>Plants</h4>
                        <p>健康蔬食料理</p>
                    </router-link>

                    <router-link to="/restaurant/oceanView" class="restaurant-card">
                        <div class="restaurant-icon">🌊</div>
                        <h4>海景餐廳</h4>
                        <p>海景與美食的完美結合</p>
                    </router-link>

                    <router-link to="/restaurant/italianCorner" class="restaurant-card">
                        <div class="restaurant-icon">🍝</div>
                        <h4>Italian Corner</h4>
                        <p>道地義式料理</p>
                    </router-link>
                </div>
            </div>

            <div class="hero-features">
                <div class="feature-card">
                    <div class="feature-icon">🍽️</div>
                    <h3>精緻料理</h3>
                    <p>新鮮食材，用心烹調</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">⭐</div>
                    <h3>優質服務</h3>
                    <p>貼心服務，舒適用餐</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">📍</div>
                    <h3>絕佳位置</h3>
                    <p>交通便利，環境優雅</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>

<!-- 樣式已移至 src/assets/css/home-content.css -->