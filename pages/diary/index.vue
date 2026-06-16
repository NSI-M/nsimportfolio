<script setup lang="ts">
import { ref, computed } from 'vue'

// 1. Nuxt Contentから記事の日付とリンク先を取得
const { data: availableDates } = await useAsyncData('diary-dates', async () => {
  // select('date', 'path') で必要なフィールドだけ取得し、軽量化します
  const articles = await queryCollection('diary').select('date', 'path').all()
  
  // カレンダーの日付と照合しやすいように「YYYY-MM-DD」形式の文字列を作成
  return articles.map(article => {
    const d = new Date(article.date)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    
    return {
      dateStr: `${year}-${month}-${day}`, // 比較用の文字列
      path: article.path                  // 記事へのリンク用
    }
  })
})

// 2. カレンダーの表示月を管理する状態
const today = new Date()
const currentYear = ref(today.getFullYear())
const currentMonth = ref(today.getMonth()) // 0が1月、11が12月

// 3. カレンダーのマス目を生成する算出プロパティ
const calendarDays = computed(() => {
  const days = []
  const firstDay = new Date(currentYear.value, currentMonth.value, 1)
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0)
  
  // 1日の曜日まで空白（null）で埋める
  for (let i = 0; i < firstDay.getDay(); i++) {
    days.push(null)
  }
  
  // 当月の日付データを生成
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const monthStr = String(currentMonth.value + 1).padStart(2, '0')
    const dayStr = String(i).padStart(2, '0')
    const dateString = `${currentYear.value}-${monthStr}-${dayStr}`
    
    // 取得した記事データの中に、この日付があるかチェック
    const article = availableDates.value?.find(a => a.dateStr === dateString)
    
    days.push({
      day: i,
      dateString,
      hasArticle: !!article, // 記事があれば true
      path: article?.path    // 記事があればパスを入れる
    })
  }
  
  return days
})

// 月を切り替える関数
const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}
</script>

<template>
  <Headertop/>
  <div class="flexbox">
    <div class="calendar-container">
        <div class="calendar-header">
        <button @click="prevMonth">＜</button>
        <h2>{{ currentYear }}/ {{ currentMonth + 1 }}</h2>
        <button @click="nextMonth">＞</button>
        </div>

        <div class="calendar-grid">
        <div class="weekday">Sun</div>
        <div class="weekday">Mon</div>
        <div class="weekday">Tue</div>
        <div class="weekday">Wed</div>
        <div class="weekday">Thu</div>
        <div class="weekday">Fri</div>
        <div class="weekday">Sat</div>

        <div 
            v-for="(item, index) in calendarDays" 
            :key="index"
            class="day-cell"
            :class="{ 'has-article': item?.hasArticle }"
        >
            <template v-if="item">
            <NuxtLink v-if="item.hasArticle" :to="item.path" class="day-link">
                {{ item.day }}
            </NuxtLink>
            
            <span v-else>{{ item.day }}</span>
            </template>
        </div>
        </div>
    </div>
  </div>
  <footern/>
</template>

<style scoped>
.calendar-container {
  max-width: 400px;
  margin: 0 auto;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  text-align: center;
}

.weekday {
  padding: 8px 0;
}

.day-cell {
  padding: 10px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0); /* デフォルトの暗めの背景 */
  color: rgba(0, 0, 0, 0.4);            /* デフォルトの暗めの文字色 */
}

/* 記事がある日付のスタイル（明るくハイライト） */
.day-cell.has-article {
  background-color: rgba(0, 0,0, 0); /* 明るい青背景 */
  color: rgba(255, 255, 255, 1);
  font-weight: bold;
}

.day-cell.has-article .day-link {
  color: white; /* リンクの文字色を白くする */
  text-decoration: none;
  display: block;
}

.day-cell.has-article:hover {
  background-color: rgba(0, 0, 0, 0.7); /* ホバー時に少し色を変える */
}
</style>