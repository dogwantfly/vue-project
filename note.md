## 卡關點

### ArticleModal.vue
☞ CKEditor 編輯時點擊 link 選項會與 bootstrap modal 的 focus 衝突，導致無法輸入 url

解決方式參考：https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/css.html#bootstrap-modals

在 modal 設定：

```
this.modal = new Modal(this.$refs.modal, {
  focus: false
})
```
以及在 `.ck.ck-balloon-panel` 設定 `z-index` (需大於 modal 的 `z-index`)

---
☞  設定 CKEditor 的上傳圖片功能

使用 CKEditor 提供的 adapter 結構，加上課程提供的上傳圖片 API

方法參考：
https://ckeditor.com/docs/ckeditor5/latest/framework/guides/deep-dive/upload-adapter.html

https://stackoverflow.com/questions/59190905/vuejs-ckeditor5-upload-images

Erica 同學的做法：
https://github.com/ericacadu/panya/blob/master/src/scripts/uploadAdapter.js 

https://github.com/ericacadu/panya/blob/master/src/components/AdminArticleModal.vue

實作於 `myUploadAdapter.js` 及 `ArticleModal.vue`

## 補充註解
### filters.js

```
export function currency (num) {
  const n = parseInt(num, 10)
  const result = `${n.toFixed(0).replace(/./g, (c, i, a) => (i && c !== '.' && ((a.length - i) % 3 === 0) ? `,${c}`.replace(/\s/g, '') : c))}`
  return result
}
```
c 為每個字元、i 為順序、a 為全部字元，例如：n 為 10000，c -> 1 0 0 0 0、i -> 0 1 2 3 4、a -> 10000

### Products.vue
```
computed: {
    filterProducts () {
      return this.products.filter(product => product.category.match(this.selectedCategory))
    }
  },
```
this.products 在 data 的初始值若不是設定陣列`[]`，這裏 filter 會出錯

- 選擇全部產品時分頁 pagination 調整，參考：https://hsiangfeng.github.io/vue/20190729/2401395670/