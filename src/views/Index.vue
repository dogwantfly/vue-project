<template>
  <main class="index">
    <div class="hero d-flex align-items-center justify-content-center p-5">
      <div class="container h-100">
        <div class="row h-100">
          <div class="col-lg-5 d-flex flex-column align-items-lg-start justify-content-center">
            <h1 class="text-light fs-1 mb-3">
              用吉他<br>
              彈出扣人心弦的旋律
            </h1>
            <h2 class="mb-5">
              帶著一把適合的吉他，踏上屬於你的音樂之旅
            </h2>
            <router-link
              to="/products"
              class="custom-btn btn btn-outline-light rounded-pill px-5 py-3">
              前往逛逛
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="categories position-relative scrollme" id="index-categories">
      <div class="container">
        <p class="position-absolute background-text fw-bold">CATEGORIES</p>
        <h2 class="mb-5">找到想要的樂器或配件 —— </h2>
        <ul class="row g-0">
          <li class="col-md-6">
            <div class="bg-image ratio ratio-16x9" style="background-image: url('https://storage.googleapis.com/vue-course-api.appspot.com/hsinyuuu/1629996922696.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=h%2FFLPes8%2BA7d5XXPCiHVpxVXWqlE%2FgVi%2FIWWo3S1isX9zxNgl%2FKrE8oLHFyDF5Vgl6LeRX8oWIQAcUn3iXGSazMm1hH8N1B2MpZG0YrON5AL2kaFQyLHoB7fUJjYFyznIkiLMsgHft84LLIvFJ2G2xMSFVYUXWdzwel0KVhfPABv7kNx%2F%2FuTvovUGgUUgU8JAfRfFEnXUEx0RvA%2BrFqDgQR1FqwxV%2BVmzvcSlIGtYcKfWFLxPakYVsOyOB5%2Bb4ZeUtiGtsCwi6ZffjnZihxZVV3kkKAlSCv7vT0ZyxYqBM5D%2BPCPL%2Fpv19OaU1CvHUqz9rUU9PtYhCKc1yikQLWG7Q%3D%3D');">
              <a
                href="#"
                @click.prevent="updateCategory('木吉他')"
                class="d-flex align-items-center text-center justify-content-center">
                <h3>
                  木吉他<br>
                  Acoustic Guitar
                </h3>
              </a>
            </div>
          </li>
          <li class="col-md-6">
            <div class="bg-image ratio ratio-16x9" style="background-image: url('https://storage.googleapis.com/vue-course-api.appspot.com/hsinyuuu/1630001055721.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=EWJSACO0ybJ3rgmj8eN3kGyvVFr%2B9cKGDvzlreYMBqke1X3SkvCIUlIeJSwvgdydvKT1%2BkCHwbWvv0CKWM9eJzeEDWQ7T13aGeWu8pNtjSXB%2FqZ1YAGu2CYWF0g2zAnlOLqTM3wq7hFCqurmSe3VTgB8zeoDuQT7ydBCMeeJX86AtX2aKnYuL21ZocDWTWjGF7X4Y%2F2WvynNpYg7MagHeitolYaiak4l8R%2B8GmUrE03a7sTUdH4q6FIVVlOlvKt%2BbLGURSxEsPOsbYFdhHMhMyNTwGiC3F1WIvKEYRr%2F8npS2nkY%2FFuJq23TdOwFDG7uGMbuy9TI2qESXogQW2Efdg%3D%3D');">
              <a
                href="#"
                @click.prevent="updateCategory('烏克麗麗')"
                class="d-flex align-items-center text-center justify-content-center">
                <h3>
                  烏克麗麗<br>
                  Ukulele
                </h3>
              </a>
            </div>
          </li>
          <li class="col-md-6">
            <div class="bg-image ratio ratio-16x9" style="background-image: url('https://storage.googleapis.com/vue-course-api.appspot.com/hsinyuuu/1630000969521.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Bqfd2J7p35NBACpLZecZQIp%2FHjU4%2FabO8omLliU5QB3Y4JPU3%2BG60EYMP8mgm%2BIbhmMw7pbE1ChSPrJ%2FEJENdV4J7%2FEo5cHKpvAjC1%2Bcm5w9m2h67mPpLtANXbbYhNNrgcYPDZZc%2BlTw7jvh%2B5jSJ0nbXAi9mMu51wUcnjw%2FZhD3Sb9UHYe8aNWyQfAIsznRLRsF4zsMqi%2BupMmJHxIwJ5zNc9mRghEbQ3FWyEh2wcSr4f%2BmH6Sch4ek6WvVL7WRuzETJfkNmW3qE1vD%2FpRaYpPwaiPgILyoaNYfCGVWig06WpsrP2Llm%2BtOsVrE986WAlJOr766rSWDIcCH%2FvbKMQ%3D%3D');">
              <a
                href="#"
                @click.prevent="updateCategory('吉他配件')"
                class="d-flex align-items-center text-center justify-content-center">
                <h3>
                  吉他配件<br>
                  Guitar Picks
                </h3>
              </a>
            </div>
          </li>
          <li class="col-md-6">
            <div class="bg-image ratio ratio-16x9" style="background-image: url('https://storage.googleapis.com/vue-course-api.appspot.com/hsinyuuu/1629999853653.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=R18jfjACKnagmGaH48YPcGE3OQ10HtUNUoD4ObavBA359xfVipIdNoi8uERIIOGKDCtXqZQrYLbHAVJC3yxRtKKzMkBKh3BMVINm5wSuiGvqh0yOslOvytccl12f6tbJk%2FQcz23J3sy46D4fqunPGR9PuvDez%2BIbqzZXYc1g7oszbFWcc0Fn3508RlelASeAORlf0JOsiixu%2FPFOhQ1U0IkPBztRV1dvz3QsW7%2BSpZPFH5HfSAdKe8EmaZ%2FgnflQfqCpUWp%2FIOc6XKtbDetr83%2F9UGGPM10UlxT7AUrN7HHMBDhWvn8Ww0U9U%2FfKoiHEO1w9k%2FKbTwkHPFD67ldt2Q%3D%3D');">
              <a
                href="#"
                @click.prevent="updateCategory('電吉他')"
                class="d-flex align-items-center text-center justify-content-center">
                <h3>
                  電吉他<br>
                  Electric Guitar
                </h3>
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="features position-relative scrollme" id="index-features">
      <p class="position-absolute background-text fw-bold">FEATURES</p>
      <div class="container">
        <div class="row">
          <div class="col-lg-6 order-lg-last ms-auto mb-5 mb-lg-0">
            <img src="https://storage.googleapis.com/vue-course-api.appspot.com/hsinyuuu/1630227856280.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=kdSI5N2tY3tTnlr%2Fy7edqED2TrP1VHwwlCDV51ZasXEqRU%2FPrd4ii7WTad6cvJCJDXigdj7sdGhvKgTx1b6wyaivxYzK5qPXUNfALFhlgrCThTk4mMIKZeCxJvyxP9q80e6fFy3h1aO6aX7GWaBdt1itrbUYOoQ0VQJIXornKJE9C7lW7navrycpMtQqJQvjjyA5vHDNWwkdQ6XuJP4QDk2ssLlTmYKqaCBkExFu8e66NkQZKP00KbHvPfaiOTcn5OYrDyprsv34f2Q1ugQhiudQsc0zArkp5OQ3HzSA%2Feho3kmCVuZrnwR3wSmXXGBntk2EXTlWcMdVgnVa28qFmg%3D%3D" alt="Chord features" class="img-fluid">
          </div>
          <div class="col-lg-5">
            <h2 class="mb-5">我們堅持 —— </h2>
            <ul>
              <li class="mb-5">
                <h3 class="mb-4">品質優良且價格合理</h3>
                <p>一個品質好的樂器擁有好的音色，並且會幫助彈奏者創作或演奏，我們會盡力提供這樣的樂器及配件，讓喜歡音樂或創作者可以更放心專心在喜歡的事物上</p>
              </li>
              <li class="mb-5">
                <h3 class="mb-4">注重運送過程</h3>
                <p>
                  在運送過程中會極力保護運送樂器，若在運送過程中樂器遭到損壞也有相關退換貨提賠償措施
                  <br>
                  並會在運送過程盡量減少碳足跡，希望在能力之內兼顧環保減少環境污染
                </p>
              </li>
              <li class="mb-5">
                <h3 class="mb-4">適用所有學習階段及專業人士</h3>
                <p>
                  不管是初學者或是進階學習及專業音樂人都有提供適合的樂器及配件，讓不同學習階段的使用者都可以挑選到適合並且能夠幫助學習彈奏技巧或沈浸在樂器的音色中
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="container scrollme" id="index-lottery">
      <div class="lottery text-center text-lg-start">
        <div class="lottery-info px-3 px-md-5">
          <h3 class="display-6 fw-bold text-secondary">
            享受商品折扣優惠
          </h3>
          <p class="text-danger mb-3" v-if="time > 0">
            優惠倒數 {{ daysLeft }} 天 {{ hoursLeft }} 小時 {{ minutesLeft }} 分 {{ secondsLeft }} 秒
          </p>
          <p class="text-danger small mb-3" v-else>優惠已截止</p>
          <p class="text-muted mb-5">
            感謝祭活動期間快來領取優惠券！
            <br>
          （活動至 {{ $filters.date(expires) }} 截止）
          </p>
          <div>
            <p v-if="discountResult" class="fs-5 text-primary">
              恭喜你獲得優惠碼
            </p>
            <div class="coupon-code fs-2 d-md-flex rounded-3 shadow-sm px-md-4 mb-3 mx-auto"
            v-if="discountResult">
              <div class="coupon-name p-3 mb-0 mx-auto">
                <div class="bg-primary text-light p-1">
                  商品<br class="d-none d-md-inline-block">
                  <span v-if="discountResult === 'firstPrize50'"> 5 折</span>
                  <span v-else-if="discountResult === 'secondPrize60'"> 6 折</span>
                  <span v-else-if="discountResult === 'thirdPrize70'"> 7 折</span>
                  <span v-else-if="discountResult === 'fourthPrize80'"> 8 折</span>
                </div>
              </div>
              <div class="user-select-all flex-grow-1 p-3">
                <p v-if="this.couponsGot.indexOf(this.discountResult) < 0" class="mb-0">
                  {{ discountResult }}
                </p>
                <p class="text-muted mb-0" v-else>已領取</p>
              </div>
            </div>
            <button
              type="button"
              class="btn btn-primary btn-lg w-100"
              @click="getDiscount"
              :disabled="this.couponsGot.indexOf(this.discountResult) >= 0 || this.time <= 0"
              ref="getDiscountBtn">
              <span v-if="this.couponsGot.indexOf(this.discountResult) < 0">點擊領取</span>
              <span v-else-if="this.time <= 0">優惠券已過期</span>
              <span v-else>已領取</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="articles position-relative scrollme" id="index-articles">
      <p class="position-absolute background-text fw-bold">ARTICLES</p>
      <div class="container">
        <h2 class="mb-5">關於樂器我們可以了解 —— </h2>
        <div class="d-flex justify-content-end">
          <router-link to="/blogs" class="btn btn-link articles-link btn-zindex ps-0">
            更多文章
            <i class="bi bi-chevron-right"></i>
          </router-link>
        </div>
        <ul class="row">
          <li
            class="col-md-6 col-lg-4 mb-3"
            v-for="article in articles.slice(0,3)"
            :key="article.id">
            <div class="card border-0">
              <div class="ratio ratio-4x3">
                <img
                  :src="article.image"
                  :alt="article.title"
                  class="img-fluid w-100 object-fit-cover">
              </div>
              <div class="card-body">
                <h5 class="card-title">{{ article.title }}</h5>
                <p class="card-text text-truncate">{{ article.description }}</p>
                <p class="card-text text-muted small">
                  {{ new Date((article.create_at + 8 * 3600) * 1000).toISOString().split('T')[0] }}
                </p>
                <router-link
                  :to="`/blog/${article.id}`"
                  class="btn btn-link stretched-link btn-zindex ps-0">
                  查看內文
                  <i class="bi bi-chevron-right"></i>
                </router-link>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="recommend scrollme" id="index-recommend">
      <div class="container">
        <h2 class="mb-5">聽聽他們的感想 —— </h2>
        <Swiper
          :loop="true"
          :spaceBetween="10"
          class="mySwiper2 text-center"
          :scrollbar="{ draggable: true }"
          :breakpoints="{
            '320': {
              direction: 'vertical',
              slidesPerView: 1.5,
            },
            '768': {
              slidesPerView: 2.3,
              spaceBetween: 30,
              direction: 'horizontal'
            },
            '1024': {
              slidesPerView: 4.1,
              spaceBetween: 30,
            },
          }"
        >
          <SwiperSlide>
            <div class="card text-start rounded-3">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <div class="d-flex align-items-center">
                    <img src="https://storage.googleapis.com/vue-course-api.appspot.com/hsinyuuu/1631012065129.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=QUiMr3S1pHmDeJVjk6oAWw6f9tIj45zQI6rL4OLD8FezgoSfixpvdpZPEW58CAQDEq6Jhn1UvOULD6vH9e3ooRsoCN%2FIvbCUC6KXBVIbHIUXeQzo7U6fwEPZDZR1c23MFy%2F%2ByCI9c%2BBZdSV5j8daFGJYYEKDUe0%2FLNXi3fLaz6%2F1rZfpbxAG02uOI8LAUg8DbyA%2BPbyZz24mqhywOrXe%2F5wq1IfSNC%2FFk9zHZ1Ji7p5TBwUaqJ79xeA6r3QcTruF9zV3OtluCFjwc35vohGNk%2Bc0NVE7rWhKdtFlxSu7PKXOxUQFifzr840rwdGD8zNAlqTmmrIylu0mMLffypT2UA%3D%3D" class="card-avatar object-fit-cover rounded-circle flex-shrink-0" alt="avatar">
                    <div class="flex-grow-1 ms-3">
                      <h5 class="card-text small">許惠一</h5>
                    </div>
                  </div>
                  <span class="badge rounded-pill">
                    4.7
                    <i class="bi bi-star-fill"></i>
                  </span>
                </div>
                <h5 class="card-title">吉他品質優良！</h5>
                <p class="card-text">非常棒的商品！推推！包裝得很小心</p>
                <router-link to="/product/-MalfBlPzNTFAQZdLpkB" class="d-flex justify-content-end">
                  <div class="product">
                    <span class="small mb-0 px-2">Taylor 木吉他- 桃花心木</span>
                    <img src="https://storage.googleapis.com/vue-course-api.appspot.com/hsinyuuu/1639666390864.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=g6WhrxQBUyTM14AVwN3a5zJpMplmWt2DLv3fniekK93yJ4gGKu3ZIFwRCNIqoI%2F5EEm5HcK1KS7c7f7Bzi%2FB29u3dlkIKUzb0HbExzsc%2BRuZmkGaBnKJuzIJcacZcJF5J%2BOiQvSDAUJCk565lUVHj%2BVGWhd3n15b5qPFnujyDBn4YVD42mRbxdKB6S%2BIA4mRJeNPXbleBCs5GHRwe4deHRtmo%2BXcxUixxSaBG3x7if%2BIhiq%2Fl5yHUwwk%2BFuJhss4NvrOSM7lh0squLpudD4rgw0LNFTIaQaLyAYOxnUY2mLHLTAEEG5CeCN57bJrftsmj7kqlWbs80ApEIbRz%2FDDkw%3D%3D" class="card-avatar object-fit-cover flex-shrink-0" alt="Taylor 木吉他- 桃花心木">
                  </div>
                </router-link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div class="card text-start rounded-3">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <div class="d-flex align-items-center">
                    <img src="https://storage.googleapis.com/vue-course-api.appspot.com/hsinyuuu/1631616618686.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Zf3NYkP4GpMaKe1%2FsgO55GuOg4msZf8D%2B1ieo89%2BUo8QMF%2FVKEMIuwpYrvjNnFgTDPRWcviNf%2B%2F2MW1l%2FRkKJuBMStocLVHJ9xgjzwp4Ig9eDT3K%2BqAIl6zx2YIMpLUoPg3AoInSrEB4wzR5F5Eq0qfWhndeNC3ysU5PrcFdUPYb4OJg5V5T5lfZpV7qBeReCXfSg75ALNvo7BMgwUlFNPnqZFzAXTF0YC762zA0CnXYIs%2FS067HxXWxo1OZvVxjpkQRQ%2BJQ0eRXDOyiYV2zs%2BxMZoNHLdrCSzy0M2NRZceB0iH4PNCoHfdNUC4pm%2FN4VEHFfxL8zlqCN4b0o4oq7w%3D%3D" class="card-avatar object-fit-cover rounded-circle flex-shrink-0" alt="avatar">
                    <div class="flex-grow-1 ms-3">
                      <h5 class="card-text small">李玉華</h5>
                    </div>
                  </div>
                  <span class="badge rounded-pill">
                    4.5
                    <i class="bi bi-star-fill"></i>
                  </span>
                </div>
                <h5 class="card-title">出貨速度快！</h5>
                <p class="card-text">下訂後一天多就出貨了，樂器本身也很棒</p>
                <router-link to="/product/-McNWbUPwTssNOuFtmva" class="d-flex justify-content-end">
                  <div class="product">
                    <span class="small mb-0 px-2">Cordoba 可插電烏克麗麗</span>
                    <img src="https://storage.googleapis.com/vue-course-api.appspot.com/hsinyuuu/1639677780961.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=JoS4Gu0GQZQgtISBroN%2FkhYZnLTaE0h6o89FYatgA8a8maTPCQJm%2FFLXx6tJDuTWuSKRgvokglEk7EEy5mksLXmFmKoxHqDKzugMHGoJgR22PTDy8XZgX4urmkUVTRYGyhD3%2FBbCtVUkP92NECqEZemMszPdOXKrBw8AlUtjHbtMWmF8ckNuc82PcyHn9CzHhfFcUwslTJfsUTmAGxMZrSejFoU20YUx78Msg7tgvYrD6bOWxdFlDcfefyyMO%2BR8VyEtq9h%2FMKl4Ss%2B0wMcLE%2BD7Lfy5yu1SBOqsf1PS9StebFLTnbAw5zWls45mQTzyss4u181jr4m%2B7F0OkIw1bw%3D%3D" class="card-avatar object-fit-cover flex-shrink-0" alt="Cordoba 可插電烏克麗麗">
                  </div>
                </router-link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div class="card text-start rounded-3">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <div class="d-flex align-items-center">
                    <img src="https://storage.googleapis.com/vue-course-api.appspot.com/hsinyuuu/1631616852062.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=n%2BW4bqOc%2Fb5gm1XjJ85GJgqeXcwRa7bUP8fC7%2Ba9k%2FuE8v8Lz8ZGEYproC3CDllwJsi%2FPuV8gEPOSxDZZRZw8gADu42NoPNPWI95mcPMNjEcEqLsVod6C1CE2eBXTGTinySJgZmCMniSKT9YUytkt3y9c9OnuVp%2FmhH2mVGq0fhwQvzI5g5515sEu9NC6eDzZMpcxuyImKEkFTkt8dNcipLH2Z9HC05X1CvbqeKzUmkWYK63c1vq7RjpykAyJtin%2FEPjNgfT5e6bAGcBKhXt%2BSfmowCTvKEMY8hDuL%2FlpRRtDjvcHeIqCer6Ka3UBY1yWaCKSepdwT8NH37d%2FkBhGg%3D%3D" class="card-avatar object-fit-cover rounded-circle flex-shrink-0" alt="avatar">
                    <div class="flex-grow-1 ms-3">
                      <h5 class="card-text small">曾筠岑</h5>
                    </div>
                  </div>
                  <span class="badge rounded-pill">
                    5
                    <i class="bi bi-star-fill"></i>
                  </span>
                </div>
                <h5 class="card-title">推電吉他</h5>
                <p class="card-text">這個電吉他的音色很好聽～也很好維護清潔！</p>
                <router-link to="/product/-MbtvucIIQcFJfssvR3Z" class="d-flex justify-content-end">
                  <div class="product">
                    <span class="small mb-0 px-2">Eastman 電吉他</span>
                    <img src="https://storage.googleapis.com/vue-course-api.appspot.com/hsinyuuu/1639679365960.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=MRCcgw4%2BQ47n85Z5%2B6DuCl8gIHzywV%2F0xfRWPm84Z2iWqS3VO%2B5a2AEIXeesp6iH%2BRGOtZm%2BrO4mN%2BNdXemAKOFx0n43RvXdnoRrPLh9hrVTo%2F127cHwkG%2FX4UXvfjpaAQHDwBS28rwngiI3JZfD%2BNr6ay1c%2B8LbqURyTD2w7oh8xJUYphi1BLadOIwGElSOq65QlG38b%2FakhzCIBnqr7G2OsmHrgRqyMpbiysdtbl%2BlGplhS6yk7f%2FM86xdRJSkmrDSV%2FEgxfAIBBs0%2BkOQL4HUKnp7H%2B6Jawm6kLiAfZA63n0HV9wMjjnB0RDWg8tieivznD5QJ7Rcl432waYuDA%3D%3D" class="card-avatar object-fit-cover flex-shrink-0" alt="Eastman 電吉他">
                  </div>
                </router-link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div class="card text-start rounded-3">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <div class="d-flex align-items-center">
                    <img src="https://storage.googleapis.com/vue-course-api.appspot.com/hsinyuuu/1631617632935.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=fwroPr1RpYo7GXpsS1%2FkboFKmeSIHB%2F1hnlTjncsxfXTifaeL8ZVxolam4yY6wDn2Bk2SmDC8HvJLNMJ2gBLmGtSEq3BuaiPpMb8oTeSItRcHMaB4kFO65rtpNBiqUP0HNgglU2sa3W0fDofXTjQpq1uqQgoXS4FH1oXLjJ5ZjWZzZjqRhsKz30Es7X%2FhaySWV1wtSWogC1YaLQVe4ErSNelRjRKisf8oH6Mtg7jDcNlq2XKED%2BXLtOCH4DBLXPcDoreFGkqnWIBk5Etf1BRqqSpfto3jOHAKsmFueIPvdqbkI7wlFj6UBnEaWx9p4L%2FcTKsb4j5fhnn5IOJaB2viQ%3D%3D" class="card-avatar object-fit-cover rounded-circle flex-shrink-0" alt="avatar">
                    <div class="flex-grow-1 ms-3">
                      <h5 class="card-text small">楊寧弘</h5>
                    </div>
                  </div>
                  <span class="badge rounded-pill">
                    4.8
                    <i class="bi bi-star-fill"></i>
                  </span>
                </div>
                <h5 class="card-title">吉他彈片很美～</h5>
                <p class="card-text">買了彈片組，覺得很好用</p>
                <router-link to="/product/-MhJgLHSpSEOsi3r-Sax" class="d-flex justify-content-end">
                  <div class="product text-nowrap">
                    <span class="small mb-0 px-2 text-truncate">Rombo 吉他彈片 Pick-四色收藏組</span>
                    <img src="https://storage.googleapis.com/vue-course-api.appspot.com/hsinyuuu/1639679741441.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=jKw33U3f%2BHvi8ifqvjBg13dXNunIXq4ihNsBZdm%2BdwrKu1VoITT2HoPg%2BAjOSUFIYsJHL04aX5adhye12Vstd3xsRDwoFeR3dc798kw2Pg8NrO8ZGykJYb5LxPaQbQ%2B616d%2BP3R1qrpWggR2ld%2BKFya9yGuPOHIS1PsbzRm0HailT5wFH6hOhxj%2BE0mcTxV3cvyruKa6PszDndwNG2BT3S0BzKRCTj%2Bja09GQkb22sPs62oDBZCmqkNhnLSA6La%2FKDbYr5eAKoFG7jIPeKtocgIkwhDs%2BQ%2Bd7cdiP9iaQ%2BwUKOIjksi4sgF91VlrmsVPhy17i3rbf4JyI4Al5RJGag%3D%3D" class="card-avatar object-fit-cover flex-shrink-0" alt="Rombo 吉他彈片 Pick-四色收藏組">
                  </div>
                </router-link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div class="card text-start rounded-3">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <div class="d-flex align-items-center">
                    <img src="https://storage.googleapis.com/vue-course-api.appspot.com/hsinyuuu/1631616852062.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=n%2BW4bqOc%2Fb5gm1XjJ85GJgqeXcwRa7bUP8fC7%2Ba9k%2FuE8v8Lz8ZGEYproC3CDllwJsi%2FPuV8gEPOSxDZZRZw8gADu42NoPNPWI95mcPMNjEcEqLsVod6C1CE2eBXTGTinySJgZmCMniSKT9YUytkt3y9c9OnuVp%2FmhH2mVGq0fhwQvzI5g5515sEu9NC6eDzZMpcxuyImKEkFTkt8dNcipLH2Z9HC05X1CvbqeKzUmkWYK63c1vq7RjpykAyJtin%2FEPjNgfT5e6bAGcBKhXt%2BSfmowCTvKEMY8hDuL%2FlpRRtDjvcHeIqCer6Ka3UBY1yWaCKSepdwT8NH37d%2FkBhGg%3D%3D" class="card-avatar object-fit-cover rounded-circle flex-shrink-0" alt="avatar">
                    <div class="flex-grow-1 ms-3">
                      <h5 class="card-text small">張雅妹</h5>
                    </div>
                  </div>
                  <span class="badge rounded-pill">
                    5
                    <i class="bi bi-star-fill"></i>
                  </span>
                </div>
                <h5 class="card-title">這裏真的很好買！</h5>
                <p class="card-text">喜歡這把民謠吉他～</p>
                <router-link to="/product/-MbtvucIIQcFJfssvR3Z" class="d-flex justify-content-end">
                  <div class="product">
                    <span class="small mb-0 px-2">Taylor 木吉他-可插電民謠吉他</span>
                    <img src="https://storage.googleapis.com/vue-course-api.appspot.com/hsinyuuu/1640614498286.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=VUV%2B1uDgTwmvL%2F90h67raRh0lgXhGqUn2YMsktPQgS48rSix6woAvFhaJ0UW6X1erVEikRa%2F4x%2F9LVWSdNkRGemSKiP%2BocM%2Bsz00vSfy0o5wM39BFDwqJdl70Y7xY070JYCJQZm%2BNSZek8EevGm57xaPR%2B2G8I9wrYyaQ98QSBG1UVcFlTlDFKAn8V99iz8d587mWs%2BkmJPcAY%2BanD%2BXD2MVJu4TbTdwjNqs%2FowCZilwUZGH8QMDMGL30gRuB1KBYzcERLnFYLU9ktQKPTG0HoBy4yb%2BvY8Q7%2FO2omAbKRR0%2B7xS5Z1ZKpABbz9R6tGWxFymStCBQzv8auWNvP4sZA%3D%3D" class="card-avatar object-fit-cover flex-shrink-0" alt="Taylor 木吉他-可插電民謠吉他">
                  </div>
                </router-link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div class="card text-start rounded-3">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <div class="d-flex align-items-center">
                    <img src="https://storage.googleapis.com/vue-course-api.appspot.com/hsinyuuu/1631617632935.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=fwroPr1RpYo7GXpsS1%2FkboFKmeSIHB%2F1hnlTjncsxfXTifaeL8ZVxolam4yY6wDn2Bk2SmDC8HvJLNMJ2gBLmGtSEq3BuaiPpMb8oTeSItRcHMaB4kFO65rtpNBiqUP0HNgglU2sa3W0fDofXTjQpq1uqQgoXS4FH1oXLjJ5ZjWZzZjqRhsKz30Es7X%2FhaySWV1wtSWogC1YaLQVe4ErSNelRjRKisf8oH6Mtg7jDcNlq2XKED%2BXLtOCH4DBLXPcDoreFGkqnWIBk5Etf1BRqqSpfto3jOHAKsmFueIPvdqbkI7wlFj6UBnEaWx9p4L%2FcTKsb4j5fhnn5IOJaB2viQ%3D%3D" class="card-avatar object-fit-cover rounded-circle flex-shrink-0" alt="avatar">
                    <div class="flex-grow-1 ms-3">
                      <h5 class="card-text small">陳奕君</h5>
                    </div>
                  </div>
                  <span class="badge rounded-pill">
                    4.9
                    <i class="bi bi-star-fill"></i>
                  </span>
                </div>
                <h5 class="card-title">收到貨了～很滿意</h5>
                <p class="card-text">聽說這品牌的烏克麗麗很棒，收到後的確很滿意，也很好看！</p>
                <router-link to="/product/-MhJYCdG0nuB_KAd1Pjv" class="d-flex justify-content-end">
                  <div class="product text-nowrap">
                    <span class="small mb-0 px-2 text-truncate">aNueNue 烏克麗麗</span>
                    <img src="https://storage.googleapis.com/vue-course-api.appspot.com/hsinyuuu/1640615062549.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Fzage7g4x0Ri2iNnpuOZNtDrp%2BOVy%2BTfxonTSLUNQ4zRUOvEciZOWyXc7tQ9IGBV5PvyDELE7eicmGlxtfpcU7aRbJhU5cfDNffrfJSiPxQGvGkbEafN2XLtJFrOmgNepbXVZU7qWO2grG0Wxam3%2BJmZ1kkuyw%2FoRsd%2B02vXLGAN4Kk2SVAiHM%2BkT9yo3FciPjlPi9bahhVzodOuHUfvLQCIy8a%2Bp9G%2BnK6jDJCfYWvfLqmXqzrmNuGHCYzyqJnR5Jg4iHJvLrC%2BZoYyLJ7t%2FBELQUgbZMC3A8L2Ozvky%2B78g6chUfkfWRJSz67VHIBAJ6duLkNUxS4q%2BYWt3yGYvQ%3D%3D" class="card-avatar object-fit-cover flex-shrink-0" alt="aNueNue 烏克麗麗">
                  </div>
                </router-link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div class="card text-start rounded-3">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <div class="d-flex align-items-center">
                    <img src="https://storage.googleapis.com/vue-course-api.appspot.com/hsinyuuu/1631616852062.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=n%2BW4bqOc%2Fb5gm1XjJ85GJgqeXcwRa7bUP8fC7%2Ba9k%2FuE8v8Lz8ZGEYproC3CDllwJsi%2FPuV8gEPOSxDZZRZw8gADu42NoPNPWI95mcPMNjEcEqLsVod6C1CE2eBXTGTinySJgZmCMniSKT9YUytkt3y9c9OnuVp%2FmhH2mVGq0fhwQvzI5g5515sEu9NC6eDzZMpcxuyImKEkFTkt8dNcipLH2Z9HC05X1CvbqeKzUmkWYK63c1vq7RjpykAyJtin%2FEPjNgfT5e6bAGcBKhXt%2BSfmowCTvKEMY8hDuL%2FlpRRtDjvcHeIqCer6Ka3UBY1yWaCKSepdwT8NH37d%2FkBhGg%3D%3D" class="card-avatar object-fit-cover rounded-circle flex-shrink-0" alt="avatar">
                    <div class="flex-grow-1 ms-3">
                      <h5 class="card-text small">郭曼任</h5>
                    </div>
                  </div>
                  <span class="badge rounded-pill">
                    5
                    <i class="bi bi-star-fill"></i>
                  </span>
                </div>
                <h5 class="card-title">幾霸分</h5>
                <p class="card-text">手感很好，一開箱弦距就在正常範圍內</p>
                <router-link
                  to="/product/-Mc4urf48NhY-Fz6JV1d"
                  class="d-flex justify-content-end mb-2">
                  <div class="product">
                    <span class="small mb-0 px-2">Cort 電吉他</span>
                    <img src="https://storage.googleapis.com/vue-course-api.appspot.com/hsinyuuu/1640616912450.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=OsX6eF1rqOQWv%2FNLi1usHdDQgGGYDq%2BxCP%2B3FFQLhmTuq0oEG7kacuz37NCsAH3HQ3CmyekmaS7eHJuZMrKRxd5HxwBoIpfG%2FEnMoLPczwFlyVl0cp3OU%2FT50dzun%2BRPuv%2FghNUdt3jEiiIMsKLSN46sY49CEytF0ehwZ7Azicl0ovcQtmpprsjTz6eAOSZydcUMNCqpt%2FJGGlRknCLbPhhtXWEeaN00hpgxsWRh%2FJUjeQ0zH6n1c9BJGeizCElojeahtZrR1u%2BVm9LE%2F4nv6vCKPaVJkCf3oFQitVHve2CM4gyeoN9TP4JHpPXemQjnesc%2FOeYAbqKxOWvPndDzxQ%3D%3D" class="card-avatar object-fit-cover flex-shrink-0" alt="Cort 電吉他">
                  </div>
                </router-link>
                <router-link to="/product/-MhJYS2_cQQQ3mah9nFL" class="d-flex justify-content-end">
                  <div class="product">
                    <span class="small mb-0 px-2">Rombo 吉他彈片 Pick-墨綠</span>
                    <img src="https://storage.googleapis.com/vue-course-api.appspot.com/hsinyuuu/1640621183113.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=QtjQBgAYzVLwX9cxyBDYJKjNb3oYxoUKB9y7n6%2BwJZGK%2F5vbi9TTpQ8llLCtmKQwASSqqTuRMnwQu%2Fqc8CfpRvjiTo6LfDKLvxAmx0hcYO9vDN%2BTq0bPtjrxxFrnDWbSO0H5RC0x%2FVFjTWvOb2ITy6hmepSGQJc9bKlH1Gq2WwYF4CTGDUQUeRzgRjY1iBQyQH9Off2E53DEYdO6mZn5%2BfkS0bA25wNpADHlleSu4ICYq5YVu%2FxjZh%2FrpQjbRGPMSVxsmHijHhpy4joWYkeJWrKCXN6YirnaGcvAS3ZhKqkmRSDSrEDRSAK92S10Ge6jftLgjuAnPYeSRlb7dA5%2B%2FQ%3D%3D" class="card-avatar object-fit-cover flex-shrink-0" alt="Rombo 吉他彈片 Pick-墨綠">
                  </div>
                </router-link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div class="card text-start rounded-3">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <div class="d-flex align-items-center">
                    <img src="https://storage.googleapis.com/vue-course-api.appspot.com/hsinyuuu/1631617632935.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=fwroPr1RpYo7GXpsS1%2FkboFKmeSIHB%2F1hnlTjncsxfXTifaeL8ZVxolam4yY6wDn2Bk2SmDC8HvJLNMJ2gBLmGtSEq3BuaiPpMb8oTeSItRcHMaB4kFO65rtpNBiqUP0HNgglU2sa3W0fDofXTjQpq1uqQgoXS4FH1oXLjJ5ZjWZzZjqRhsKz30Es7X%2FhaySWV1wtSWogC1YaLQVe4ErSNelRjRKisf8oH6Mtg7jDcNlq2XKED%2BXLtOCH4DBLXPcDoreFGkqnWIBk5Etf1BRqqSpfto3jOHAKsmFueIPvdqbkI7wlFj6UBnEaWx9p4L%2FcTKsb4j5fhnn5IOJaB2viQ%3D%3D" class="card-avatar object-fit-cover rounded-circle flex-shrink-0" alt="avatar">
                    <div class="flex-grow-1 ms-3">
                      <h5 class="card-text small">育霖</h5>
                    </div>
                  </div>
                  <span class="badge rounded-pill">
                    4.9
                    <i class="bi bi-star-fill"></i>
                  </span>
                </div>
                <h5 class="card-title">終於可以彈了～</h5>
                <p class="card-text">很適合初學者學習的吉他～～</p>
                <router-link to="/product/-Malv9flNWs9S7l1GhpA" class="d-flex justify-content-end">
                  <div class="product text-nowrap">
                    <span class="small mb-0 px-2 text-truncate">Samick 木吉他</span>
                    <img src="https://storage.googleapis.com/vue-course-api.appspot.com/hsinyuuu/1640622150394.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=SkAXeroNQg2NPlh86DqzDgW7JwS8FKozKexCjwNAxVW6Au1D95zdQ1VZRHrKHSUhUQtpQnKim2ffS8o1sXey%2F5vqEZqJVrlqVA9KWq6d65otMR0r7AJihclRI4SWAUi3c%2Fv0RKvqbXhexYwqDvffqko24WH8dwjr3IAWv8NsHAWV%2F0zz6LXtQs7C1lemilk8EyJ8TQf3jmmQXsnAsC2CKw7dOO6Eg2IbYMd1V5F2g8QWD%2Fu1NZn97h%2FAiWdPwy9UK8vXyUAsaWNg303G7e1a52NJoPidReDECzs8jPoIpXoPNAAffYvCSZYu1jXPvRElOmaO30OJjM1Iv%2Bbn%2FsPw3Q%3D%3D" class="card-avatar object-fit-cover flex-shrink-0" alt="Samick 木吉他">
                  </div>
                </router-link>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
    <div class="location scrollme" id="index-location">
      <div class="container">
        <div class="row position-relative
          align-items-lg-center flex-md-row-reverse flex-lg-row g-0">
          <div class="col-md-6 end-0 map">
            <img src="https://storage.googleapis.com/vue-course-api.appspot.com/hsinyuuu/1631632532511.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=HwQB7kUFeErnbSiiaMHPByw%2FviMNaujZiJLkh1r9CNx34DF%2BggT1DZXU4xu4qbWETL20ts42yu0wO0%2BDs3gCga8XjNa1lhwpRx83cUps2fmGcB679UyJOvgvDwnLQ4CV0PyR9XtPoDsqh%2BNXHv0D%2Fph7mCaBqFlxrgc5kmpEWnl7LMSoeuQeeHvn2QX1CJ41RtIKFxjEOYQYvhxlkd3ZTIwnYU9Oncnrp9M7sPyj3QsBOuxhGrXUblHm2QS7%2BCBWT5p0QZYkJ9J%2Fz0u%2F2tq%2Be10jV6%2BPX3iET%2BNJlHmmOK%2BypYRXMuXz2BIImgEyxW%2FAhQ8Md6oiXUUFNueEOmzCnQ%3D%3D" alt="實體店示意圖" class="img-fluid">
          </div>
          <div class="col-md-6 col-lg-7">
            <div class="location-info bg-primary text-light p-3">
              <div
                class="border border-light h-100 d-flex
                  flex-column justify-content-center align-items-start">
                <h3 class="mb-4">
                  來逛逛實體店，可享實體店專屬優惠！
                </h3>
                <p class="mb-4">
                  不定期會推出現場優惠及小活動，歡迎踩點實體店
                </p>
                <router-link to="/about" class="btn btn-warning">
                  如何前往
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="faq scrollme" id="index-faq">
      <div class="container">
        <h2 class="mb-5">常見問答</h2>
        <ul class="row accordion accordion-flush" id="accordionFlushFAQ">
          <li class="col-lg-6 accordion-item mb-4">
            <h2 class="accordion-header" id="flush-headingOne">
              <button
                class="accordion-button fw-bold collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne">
                購買的吉他會有保固嗎？
              </button>
            </h2>
            <div id="flush-collapseOne"
            class="accordion-collapse collapse"
            aria-labelledby="flush-headingOne"
            data-bs-parent="#accordionFlushFAQ">
              <div class="accordion-body text-muted">
                有的，我們提供一年內非人為損壞之服務檢測及零件更換（包含吉他弦鈕、弦釘、琴椼以及上下弦枕）。不適用於不當保養或經撞擊、人為使用等不當處理引起的損壞。
              </div>
            </div>
          </li>
          <li class="col-lg-6 accordion-item mb-4">
            <h2 class="accordion-header" id="flush-headingTwo">
              <button
                class="accordion-button fw-bold collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseTwo"
                aria-expanded="false"
                aria-controls="flush-collapseTwo">
                請問有寄送海外的服務嗎？
              </button>
            </h2>
            <div id="flush-collapseTwo"
            class="accordion-collapse collapse"
            aria-labelledby="flush-headingTwo"
            data-bs-parent="#accordionFlushFAQ">
              <div class="accordion-body text-muted">
                目前我們僅限寄送台灣境內，尚不接受寄送至海外、國外。
              </div>
            </div>
          </li>
          <li class="col-lg-6 accordion-item mb-4">
            <h2 class="accordion-header" id="flush-headingThree">
              <button
                class="accordion-button fw-bold collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseThree"
                aria-expanded="false"
                aria-controls="flush-collapseThree">
                商品瑕疵退換貨該如何辦理？
              </button>
            </h2>
            <div id="flush-collapseThree"
            class="accordion-collapse collapse"
            aria-labelledby="flush-headingThree"
            data-bs-parent="#accordionFlushFAQ">
              <div class="accordion-body text-muted">
                商品七天之內可接受瑕疵品退換貨服務，可由社群或來電的方式與我們的客服聯繫。
              </div>
            </div>
          </li>
          <li class="col-lg-6 accordion-item mb-4">
            <h2 class="accordion-header" id="flush-headingFour">
              <button
                class="accordion-button fw-bold collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseFour"
                aria-expanded="false"
                aria-controls="flush-collapseFour">
                下單後大約何時會送達？
              </button>
            </h2>
            <div id="flush-collapseFour"
            class="accordion-collapse collapse"
            aria-labelledby="flush-headingFour"
            data-bs-parent="#accordionFlushFAQ">
              <div class="accordion-body text-muted">
                台灣本島的大多數地區，原則上出貨後貨件可於寄件之隔日送達，偏遠及離島地區時效請詢問服務人員。
                如您的貨件須於週六、週日、假日送達，請於服務司機取件時告知或於貨件上註明。
              </div>
            </div>
          </li>
          <li class="col-lg-6 accordion-item mb-4">
            <h2 class="accordion-header" id="flush-headingTwo">
              <button class="accordion-button fw-bold collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseFifth"
              aria-expanded="false"
              aria-controls="flush-collapseFifth">
                若沒有找到想要的樂器，可以指定樂器品牌、型號嗎？
              </button>
            </h2>
            <div id="flush-collapseFifth"
            class="accordion-collapse collapse"
            aria-labelledby="flush-headingFifth"
            data-bs-parent="#accordionFlushFAQ">
              <div class="accordion-body text-muted">
                若沒有找到想要的樂器品牌、型號，歡迎聯絡我們，有機會將您想要的樂器進貨並提供您購買。
              </div>
            </div>
          </li>
          <li class="col-lg-6 accordion-item mb-4">
            <h2 class="accordion-header" id="flush-headingThree">
              <button
                class="accordion-button fw-bold collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseSixth"
                aria-expanded="false"
                aria-controls="flush-collapseSixth">
                目前提供哪些付款方式？
              </button>
            </h2>
            <div id="flush-collapseSixth"
            class="accordion-collapse collapse"
            aria-labelledby="flush-headingSixth"
            data-bs-parent="#accordionFlushFAQ">
              <div class="accordion-body text-muted">
                可透過以下方式付款：
                <ul>
                  <li>
                    超商取貨
                  </li>
                  <li>
                    信用卡
                  </li>
                  <li>
                    實體/網路ATM
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </main>
  <ul class="sidebar list-unstyled position-fixed top-50 end-0 translate-middle-y d-none d-xl-block"
    v-if="isShowed">
    <li>
      <a href="#index-categories"
        class="sidebar-link"
        :class="{'active' : selected[0]}"
        @click.prevent="scrollTo($event)">
        樂器類別
      </a>
    </li>
    <li>
      <a href="#index-features"
        class="sidebar-link"
        :class="{'active' : selected[1]}"
        @click.prevent="scrollTo($event)">
        關於我們
      </a>
    </li>
    <li>
      <a href="#index-lottery"
        class="sidebar-link"
        :class="{'active' : selected[2]}"
        @click.prevent="scrollTo($event)">
        優惠活動
      </a>
    </li>
    <li>
      <a href="#index-articles"
        class="sidebar-link"
        :class="{'active' : selected[3]}"
        @click.prevent="scrollTo($event)">
        部落格
      </a>
    </li>
    <li>
      <a href="#index-recommend"
        class="sidebar-link"
        :class="{'active' : selected[4]}"
        @click.prevent="scrollTo($event)">
        顧客評價
      </a>
    </li>
    <li>
      <a href="#index-location"
        class="sidebar-link"
        :class="{'active' : selected[5]}"
        @click.prevent="scrollTo($event)">
        實體門市
      </a>
    </li>
    <li>
      <a href="#index-faq"
        class="sidebar-link"
        :class="{'active' : selected[6]}"
        @click.prevent="scrollTo($event)">
        常見問答
      </a>
    </li>
  </ul>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper.scss';

export default ({
  data() {
    return {
      timer: null,
      time: 0,
      daysLeft: 0,
      hoursLeft: 0,
      minutesLeft: 0,
      secondsLeft: 0,
      discountResult: '',
      couponsGot: JSON.parse(localStorage.getItem('couponsGot')) || [],
      articles: '',
      selected: [false, false, false, false, false, false],
      isShowed: false,
      expires: 1646006400,
    };
  },
  inject: ['$httpMessageState'],
  components: {
    Swiper,
    SwiperSlide,
  },
  methods: {
    countDown() {
      const { expires } = this;
      const currentTime = Math.floor(Date.now() / 1000);
      this.time = expires - currentTime;
      this.daysLeft = parseInt(this.time / 60 / 60 / 24, 10);
      this.hoursLeft = parseInt((this.time / 60 / 60) % 24, 10);
      this.minutesLeft = parseInt((this.time / 60) % 60, 10);
      this.secondsLeft = parseInt(this.time % 60, 10);
      this.time -= 1;
      if (this.time <= 0) {
        clearInterval(this.timer);
      }
    },
    showDiscount() {
      const discounts = ['firstPrize50', 'secondPrize60', 'thirdPrize70', 'fourthPrize80'];
      this.discountResult = discounts[this.$filters.randomInt(discounts.length)];
    },
    getDiscount() {
      if (this.couponsGot.indexOf(this.discountResult) < 0) {
        this.couponsGot.push(this.discountResult);
      }
      localStorage.setItem('couponsGot', JSON.stringify(this.couponsGot));
      this.$refs.getDiscountBtn.disabled = true;
    },
    updateCategory(category) {
      this.$router.push({
        name: 'Products',
        params: {
          selectedCategory: category,
        },
      });
    },
    getArticles(page = 1) {
      this.isLoading = true;
      const api = `/api/${process.env.VUE_APP_APIPATH}/articles?page=${page}`;
      this.$http.get(api)
        .then((response) => {
          if (!response.data.success) {
            this.$httpMessageState(response, '取得文章');
            this.isLoading = false;
            return;
          }
          this.articles = response.data.articles;
          this.isLoading = false;
        })
        .catch((error) => {
          this.$httpMessageState(error, '連線錯誤');
          this.isLoading = false;
        });
    },
    handleScroll() {
      const elements = document.querySelectorAll('.scrollme');
      elements.forEach((element, index) => {
        const elTop = element.getBoundingClientRect().top;
        const elBottom = element.getBoundingClientRect().bottom;
        if (elTop <= 500 && elBottom >= 60) {
          this.selected.splice(index, 1, true);
        }
        if (elTop >= 60 || elBottom <= 0) {
          this.selected.splice(index, 1, false);
        }
      });
      const rootElement = document.documentElement;
      const scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
      if ((rootElement.scrollTop / scrollTotal) > 0.20) {
        this.isShowed = true;
      } else {
        this.isShowed = false;
      }
    },
    scrollTo(e) {
      document.querySelector(e.target.hash).scrollIntoView();
    },
  },
  unmounted() {
    clearInterval(this.timer);
    window.removeEventListener('scroll', this.handleScroll);
  },
  mounted() {
    this.timer = setInterval(this.countDown, 1000);
    this.getArticles();
    this.showDiscount();
    window.addEventListener('scroll', this.handleScroll);
  },
});
</script>
