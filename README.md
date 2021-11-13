# Chord

## 專案簡介
提供吉他、電吉他、烏克麗麗、吉他配件等樂器的購買平台，主要以 Vue 框架練習開發前端

### Demo
https://dogwantfly.github.io/vue-project/#/

## 主要功能

### 前台
- 商品陳列、分類陳列、單一商品介紹、隨機商品陳列
- 購物車（加入、調整數量、刪除單筆或全部購物車項目）
- 套用優惠券
- 結帳、訂單查詢
- 部落格（文章陳列、單一文章查看）

### 後台
- 管理者登入 / 登出、驗證登入狀態
- 後台相關管理(CRUD)
  - 產品管理
  - 訂單管理
  - 優惠券管理
  - 文章管理
- 提供資料搜尋、排序

## 使用技術 / 套件
| 技術        | 簡述                       |
| ---------------- | -------------------------- |
| Vue Cli 3        | 以 Vue.js 開發 SPA 網站    |
| VueRouter        | 以 Vue.js 開發 SPA 網站、路由設計  |
| VueComponents    | 將重複使用的模組整理為元件 | 
| ESlint(Standard) | 優化程式碼品質、維持風格統一 |
| Bootstrap 5      | 開發 UI 介面  |



| 套件         | 簡述                       |
| ---------------- | -------------------------- |
| Vue-axios| 串接 API   |
| Vee-validate| 表單驗證  |
| Swiper| 商品、顧客評價輪播 | 
| Vue-loading-overlay | 讀取元件 |
| Ckeditor5| 編輯文章內容介面 |
| Mitt| 跨元件傳遞資料 |

## 如何執行專案

將下載專案 Zip 檔或將專案 Clone 至本地端
### 安裝專案 dependencies
```
npm install
```

### 編譯及執行專案（Development 模式）
```
npm run serve
```

### 編譯及壓縮（Production 模式）
```
npm run build
```

### 分析程式碼除錯
```
npm run lint
```

### 客製相關設定
See [Configuration Reference](https://cli.vuejs.org/config/).


## 使用、參考來源

### API 提供

[hexshool-vue3-course-api](https://github.com/hexschool/vue3-course-api-wiki/wiki)

### 圖片來源

Unsplash、iconfinder、Bootstrap icon

### 版型設計樣式參考

Dribble、themeforest