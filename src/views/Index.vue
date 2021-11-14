<template>
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
          <router-link to="/products" class="btn btn-outline-light rounded-pill px-5 py-3">前往逛逛</router-link>
        </div>
      </div>
    </div>
  </div>
  <div class="categories position-relative">
    <div class="container">
      <p class="position-absolute background-text fw-bold">CATEGORIES</p>
      <h2 class="mb-5">找到想要的樂器或配件 —— </h2>
      <ul class="row g-0">
        <li class="col-md-6">
          <div class="bg-image ratio ratio-16x9" style="background-image: url('https://storage.googleapis.com/vue-course-api.appspot.com/hsinyuuu/1629996922696.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=h%2FFLPes8%2BA7d5XXPCiHVpxVXWqlE%2FgVi%2FIWWo3S1isX9zxNgl%2FKrE8oLHFyDF5Vgl6LeRX8oWIQAcUn3iXGSazMm1hH8N1B2MpZG0YrON5AL2kaFQyLHoB7fUJjYFyznIkiLMsgHft84LLIvFJ2G2xMSFVYUXWdzwel0KVhfPABv7kNx%2F%2FuTvovUGgUUgU8JAfRfFEnXUEx0RvA%2BrFqDgQR1FqwxV%2BVmzvcSlIGtYcKfWFLxPakYVsOyOB5%2Bb4ZeUtiGtsCwi6ZffjnZihxZVV3kkKAlSCv7vT0ZyxYqBM5D%2BPCPL%2Fpv19OaU1CvHUqz9rUU9PtYhCKc1yikQLWG7Q%3D%3D');">
            <a href="#" @click.prevent="updateCategory('木吉他')" class="d-flex align-items-center text-center justify-content-center">
              <h3>
                木吉他<br>
                Acoustic Guitar
              </h3>
            </a>
          </div>
        </li>
        <li class="col-md-6">
          <div class="bg-image ratio ratio-16x9" style="background-image: url('https://storage.googleapis.com/vue-course-api.appspot.com/hsinyuuu/1630001055721.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=EWJSACO0ybJ3rgmj8eN3kGyvVFr%2B9cKGDvzlreYMBqke1X3SkvCIUlIeJSwvgdydvKT1%2BkCHwbWvv0CKWM9eJzeEDWQ7T13aGeWu8pNtjSXB%2FqZ1YAGu2CYWF0g2zAnlOLqTM3wq7hFCqurmSe3VTgB8zeoDuQT7ydBCMeeJX86AtX2aKnYuL21ZocDWTWjGF7X4Y%2F2WvynNpYg7MagHeitolYaiak4l8R%2B8GmUrE03a7sTUdH4q6FIVVlOlvKt%2BbLGURSxEsPOsbYFdhHMhMyNTwGiC3F1WIvKEYRr%2F8npS2nkY%2FFuJq23TdOwFDG7uGMbuy9TI2qESXogQW2Efdg%3D%3D');">
            <a href="#" @click.prevent="updateCategory('烏克麗麗')"  class="d-flex align-items-center text-center justify-content-center">
              <h3>
                烏克麗麗<br>
                Ukulele
              </h3>
            </a>
          </div>
        </li>
        <li class="col-md-6">
          <div class="bg-image ratio ratio-16x9" style="background-image: url('https://storage.googleapis.com/vue-course-api.appspot.com/hsinyuuu/1630000969521.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Bqfd2J7p35NBACpLZecZQIp%2FHjU4%2FabO8omLliU5QB3Y4JPU3%2BG60EYMP8mgm%2BIbhmMw7pbE1ChSPrJ%2FEJENdV4J7%2FEo5cHKpvAjC1%2Bcm5w9m2h67mPpLtANXbbYhNNrgcYPDZZc%2BlTw7jvh%2B5jSJ0nbXAi9mMu51wUcnjw%2FZhD3Sb9UHYe8aNWyQfAIsznRLRsF4zsMqi%2BupMmJHxIwJ5zNc9mRghEbQ3FWyEh2wcSr4f%2BmH6Sch4ek6WvVL7WRuzETJfkNmW3qE1vD%2FpRaYpPwaiPgILyoaNYfCGVWig06WpsrP2Llm%2BtOsVrE986WAlJOr766rSWDIcCH%2FvbKMQ%3D%3D');">
            <a href="#" @click.prevent="updateCategory('吉他配件')"  class="d-flex align-items-center text-center justify-content-center">
              <h3>
                吉他配件<br>
                Guitar Picks
              </h3>
            </a>
          </div>
        </li>
        <li class="col-md-6">
          <div class="bg-image ratio ratio-16x9" style="background-image: url('https://storage.googleapis.com/vue-course-api.appspot.com/hsinyuuu/1629999853653.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=R18jfjACKnagmGaH48YPcGE3OQ10HtUNUoD4ObavBA359xfVipIdNoi8uERIIOGKDCtXqZQrYLbHAVJC3yxRtKKzMkBKh3BMVINm5wSuiGvqh0yOslOvytccl12f6tbJk%2FQcz23J3sy46D4fqunPGR9PuvDez%2BIbqzZXYc1g7oszbFWcc0Fn3508RlelASeAORlf0JOsiixu%2FPFOhQ1U0IkPBztRV1dvz3QsW7%2BSpZPFH5HfSAdKe8EmaZ%2FgnflQfqCpUWp%2FIOc6XKtbDetr83%2F9UGGPM10UlxT7AUrN7HHMBDhWvn8Ww0U9U%2FfKoiHEO1w9k%2FKbTwkHPFD67ldt2Q%3D%3D');">
            <a href="#" @click.prevent="updateCategory('電吉他')"  class="d-flex align-items-center text-center justify-content-center">
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
  <div class="features position-relative">
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
                並會在運送過程盡量減少碳足跡，希望在能力之內兼顧環保減少環境污染
              </p>
            </li>
            <li class="mb-5">
              <h3 class="mb-4">適用所有學習階段</h3>
              <p>
                不管是初學者或是進階學習都有提供適合的樂器及配件，讓不同學習階段的使用者都可以挑選到適合且能夠幫助學習彈奏技巧或沈浸在樂器的音色中
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="lottery container text-center">
    <div class="lottery-info">
      <h3>活動期間快來領取優惠券！</h3>
      <template v-if="time > 0">
        <small class="text-danger d-block mb-5" v-if="time > 0">優惠倒數 {{ daysLeft }} 天 {{ hoursLeft }} 小時 {{ minutesLeft }} 分 {{ secondsLeft }} 秒</small>
        <button type="button" class="btn btn-primary" v-if="!isDiscounting && !discountResult" @click="getDiscount">
          <span class="spinner-grow spinner-grow-sm text-primary" role="status" aria-hidden="true" v-if="isDiscounting && !discountResult"></span>
          <span class="visually-hidden" v-if="isDiscounting && !discountResult">Loading...</span>
          領取優惠券
        </button>
        <button type="button" class="btn btn-dark mb-5" v-else @click="getDiscount" :disabled="isDiscounting">
          重新領取
        </button>
      </template>
      <small class="text-danger d-block mb-5" v-else>優惠已截止</small>
      <p>
        <span v-if="discountResult">恭喜你獲得優惠碼</span>
        <br>
        <span class="spinner-grow spinner-grow-sm text-primary" role="status" aria-hidden="true" v-if="isDiscounting"></span>
        <span class="visually-hidden text-primary" v-if="isDiscounting">Loading...</span>
        <span class="fs-1 bg-light user-select-all">{{ discountResult }}</span>
      </p>
    </div>
  </div>
  <div class="articles position-relative">
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
        <li class="card mb-3 col-md border-0" v-for="article in articles.slice(0,3)" :key="article.id">
          <div class="ratio ratio-4x3">
            <img :src="article.image" :alt="article.title" class="img-fluid w-100 article-img">
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ article.title }}</h5>
            <p class="card-text text-truncate">{{ article.description }}</p>
            <p class="card-text"><small class="text-muted">{{ new Date((article.create_at + 8 * 3600) * 1000)
        .toISOString().split('T')[0] }}</small></p>
            <router-link :to="`/blog/${article.id}`" class="btn btn-link stretched-link btn-zindex ps-0">
              查看內文
              <i class="bi bi-chevron-right"></i>
            </router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div class="recommend">
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
              <div class="d-flex justify-content-end">
                <span class="badge rounded-pill">
                  4.7
                  <i class="bi bi-star-fill"></i>
                </span>
              </div>
              <h5 class="card-title">吉他品質優良！</h5>
              <p class="card-text">非常棒的商品！推推！包裝得很小心</p>
              <div class="d-flex">
                <img src="https://storage.googleapis.com/vue-course-api.appspot.com/hsinyuuu/1631012065129.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=QUiMr3S1pHmDeJVjk6oAWw6f9tIj45zQI6rL4OLD8FezgoSfixpvdpZPEW58CAQDEq6Jhn1UvOULD6vH9e3ooRsoCN%2FIvbCUC6KXBVIbHIUXeQzo7U6fwEPZDZR1c23MFy%2F%2ByCI9c%2BBZdSV5j8daFGJYYEKDUe0%2FLNXi3fLaz6%2F1rZfpbxAG02uOI8LAUg8DbyA%2BPbyZz24mqhywOrXe%2F5wq1IfSNC%2FFk9zHZ1Ji7p5TBwUaqJ79xeA6r3QcTruF9zV3OtluCFjwc35vohGNk%2Bc0NVE7rWhKdtFlxSu7PKXOxUQFifzr840rwdGD8zNAlqTmmrIylu0mMLffypT2UA%3D%3D" class="card-avatar rounded-circle flex-shrink-0" alt="avatar">
                <div class="flex-grow-1 ms-3">
                  <h5 class="card-text">Tina White</h5>
                  <p>購買：Taylor 木吉他- 桃花心木</p>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="card text-start rounded-3">
            <div class="card-body">
              <div class="d-flex justify-content-end">
                <span class="badge rounded-pill">
                  4.5
                  <i class="bi bi-star-fill"></i>
                </span>
              </div>
              <h5 class="card-title">出貨速度快！</h5>
              <p class="card-text">下訂後一天多就出貨了，樂器本身也很棒</p>
              <div class="d-flex">
                <img src="https://storage.googleapis.com/vue-course-api.appspot.com/hsinyuuu/1631616618686.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Zf3NYkP4GpMaKe1%2FsgO55GuOg4msZf8D%2B1ieo89%2BUo8QMF%2FVKEMIuwpYrvjNnFgTDPRWcviNf%2B%2F2MW1l%2FRkKJuBMStocLVHJ9xgjzwp4Ig9eDT3K%2BqAIl6zx2YIMpLUoPg3AoInSrEB4wzR5F5Eq0qfWhndeNC3ysU5PrcFdUPYb4OJg5V5T5lfZpV7qBeReCXfSg75ALNvo7BMgwUlFNPnqZFzAXTF0YC762zA0CnXYIs%2FS067HxXWxo1OZvVxjpkQRQ%2BJQ0eRXDOyiYV2zs%2BxMZoNHLdrCSzy0M2NRZceB0iH4PNCoHfdNUC4pm%2FN4VEHFfxL8zlqCN4b0o4oq7w%3D%3D" class="card-avatar rounded-circle flex-shrink-0" alt="avatar">
                <div class="flex-grow-1 ms-3">
                  <h5 class="card-text">Mason Morales</h5>
                  <p>購買：Cordoba 可插電烏克麗麗</p>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="card text-start rounded-3">
            <div class="card-body">
              <div class="d-flex justify-content-end">
                <span class="badge rounded-pill">
                  5
                  <i class="bi bi-star-fill"></i>
                </span>
              </div>
              <h5 class="card-title">推電吉他</h5>
              <p class="card-text">這個電吉他的音色很好聽～也很好維護清潔！</p>
              <div class="d-flex">
                <img src="https://storage.googleapis.com/vue-course-api.appspot.com/hsinyuuu/1631616852062.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=n%2BW4bqOc%2Fb5gm1XjJ85GJgqeXcwRa7bUP8fC7%2Ba9k%2FuE8v8Lz8ZGEYproC3CDllwJsi%2FPuV8gEPOSxDZZRZw8gADu42NoPNPWI95mcPMNjEcEqLsVod6C1CE2eBXTGTinySJgZmCMniSKT9YUytkt3y9c9OnuVp%2FmhH2mVGq0fhwQvzI5g5515sEu9NC6eDzZMpcxuyImKEkFTkt8dNcipLH2Z9HC05X1CvbqeKzUmkWYK63c1vq7RjpykAyJtin%2FEPjNgfT5e6bAGcBKhXt%2BSfmowCTvKEMY8hDuL%2FlpRRtDjvcHeIqCer6Ka3UBY1yWaCKSepdwT8NH37d%2FkBhGg%3D%3D" class="card-avatar rounded-circle flex-shrink-0" alt="avatar">
                <div class="flex-grow-1 ms-3">
                  <h5 class="card-text">Albert Oliver</h5>
                  <p>購買：Eastman 電吉他</p>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="card text-start rounded-3">
            <div class="card-body">
              <div class="d-flex justify-content-end">
                <span class="badge rounded-pill">
                  4.8
                  <i class="bi bi-star-fill"></i>
                </span>
              </div>
              <h5 class="card-title">吉他彈片很美～</h5>
              <p class="card-text">買了彈片組，覺得很好用</p>
              <div class="d-flex">
                <img src="https://storage.googleapis.com/vue-course-api.appspot.com/hsinyuuu/1631617632935.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=fwroPr1RpYo7GXpsS1%2FkboFKmeSIHB%2F1hnlTjncsxfXTifaeL8ZVxolam4yY6wDn2Bk2SmDC8HvJLNMJ2gBLmGtSEq3BuaiPpMb8oTeSItRcHMaB4kFO65rtpNBiqUP0HNgglU2sa3W0fDofXTjQpq1uqQgoXS4FH1oXLjJ5ZjWZzZjqRhsKz30Es7X%2FhaySWV1wtSWogC1YaLQVe4ErSNelRjRKisf8oH6Mtg7jDcNlq2XKED%2BXLtOCH4DBLXPcDoreFGkqnWIBk5Etf1BRqqSpfto3jOHAKsmFueIPvdqbkI7wlFj6UBnEaWx9p4L%2FcTKsb4j5fhnn5IOJaB2viQ%3D%3D" class="card-avatar rounded-circle flex-shrink-0" alt="avatar">
                <div class="flex-grow-1 ms-3">
                  <h5 class="card-text">Russell Allen</h5>
                  <p>購買：Rombo 吉他彈片 Pick-四色收藏組</p>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="card text-start rounded-3">
            <div class="card-body">
              <div class="d-flex justify-content-end">
                <span class="badge rounded-pill bg-primary">
                  4.5
                  <i class="bi bi-star-fill"></i>
                </span>
              </div>
              <h5 class="card-title">這裏真的很好買！</h5>
              <p class="card-text">喜歡這把民謠吉他～</p>
              <div class="d-flex">
                <img src="https://storage.googleapis.com/vue-course-api.appspot.com/hsinyuuu/1631618125712.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=HCoSJXmpdk%2F7dhwSQ1d%2ByQ6B28qWBkh2Yd8iGwwcYQwaO8ecrPEdm9ntZ%2BMKHvI4Nq8QFBSNI8ZosjA9KtHKl53IRh0spkO0E%2B12bFY%2FFOxHuv%2BB0tRw%2FYwmNHMc0oRslDLgfJJvjKmK8IFOMFUMK2FSLDJ%2FhKNWlTGt8CN8Hwch2Racr3sKIeoyrF4U57h0O%2BfuNy4jZpSF9047qSLuf7sz3mhmjyHB03uvtwNX13fBvqz8oVm2uGkAbxzc8P3Ix9fnrs06ZokMT3L2tXOvi8qm6mKf6wWdz8yoE9JrlyOSnBA6vvP%2Bz2v%2BZyD97iwKBZsRVQIuivj2MT4qz44nqQ%3D%3D" class="card-avatar rounded-circle flex-shrink-0" alt="avatar">
                <div class="flex-grow-1 ms-3">
                  <h5 class="card-text">Justin Larson</h5>
                  <p>購買：Taylor 木吉他-可插電民謠吉他</p>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="card text-start rounded-3">
            <div class="card-body">
              <div class="d-flex justify-content-end">
                <span class="badge rounded-pill">
                  4.9
                  <i class="bi bi-star-fill"></i>
                </span>
              </div>
              <h5 class="card-title">收到貨了～很滿意</h5>
              <p class="card-text">聽說這品牌的烏克麗麗很棒，收到後的確很滿意，也很好看！</p>
              <div class="d-flex">
                <img src="https://storage.googleapis.com/vue-course-api.appspot.com/hsinyuuu/1631618938164.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=mnbuR0%2FxY7%2B4FzEGQDQlyRoDT%2Bc5JvAerhtOb0cnpVu1A2OzX7pWO7PbaJTJkfrQ3EOMvUPIK8RX9IHhG7NYeonPaTlp9kKIX4vLbgm4hu8u8pFudDzRo09NF4IVMDtDBIdbz5VHCSQcHTkn%2Bg5it6J%2Fw0O2V000uEwRaZHfBB%2BbbLwrhTUslf4Hxqqwj9p4BDmwxYUZRMSy07wWZT%2FLdno7tTEKiYDh5Tzl7tsP9oNuyUqpPUwCw8ovZQdlDhqB3V1JyNripqW46LWvQz6OhZZBrjKCyw1SyA4Tw%2B3K5FnbLPJfUqojTXCjdXuQZdbCVtDpqmwnXmpj3kNj%2BJ96ag%3D%3D" class="card-avatar rounded-circle flex-shrink-0" alt="avatar">
                <div class="flex-grow-1 ms-3">
                  <h5 class="card-text">Sebastian Long</h5>
                  <p>購買：aNueNue 烏克麗麗</p>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="card text-start rounded-3">
            <div class="card-body">
              <div class="d-flex justify-content-end">
                <span class="badge rounded-pill">
                  5
                  <i class="bi bi-star-fill"></i>
                </span>
              </div>
              <h5 class="card-title">幾霸分</h5>
              <p class="card-text">手感很好，一開箱弦距就在正常範圍內</p>
              <div class="d-flex">
                <img src="https://storage.googleapis.com/vue-course-api.appspot.com/hsinyuuu/1631619109938.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=fLLxFeD4fndvvwTYon1HhUck%2BaUliPhiFMuzqH1fnGp2uTe2nmMcChu2VtxO3n5nEswLUtHZUPvUXV2quAe%2B117T6aMWHhSbuNZ%2BDXsk2C021IS4LI07kZx9EfG8R7jPhoU7MLU4lyejjY7L5pOwXsaKpJsYme0vrNKu2QnoKWPz%2BwvwqBXfYwcAw%2FWHJCpowM8xxjkQ0XkJO%2FQ8JKAgSzVp9ZT29kauAHKKq68bSvOLJipde14JbwfVkSg%2BTV%2B%2FVyJx6dbMSg2xpkWIneNpEk1OVY6mp4NYfJamruaADg9p0RPoe%2Bhesrz3%2BGPdEoUbuiQ%2FfffV1byueM6oYYCPbg%3D%3D" class="card-avatar rounded-circle flex-shrink-0" alt="avatar">
                <div class="flex-grow-1 ms-3">
                  <h5 class="card-text">Glenda Richardson</h5>
                  <p>購買：Cort 電吉他、Rombo 吉他彈片 Pick-墨綠</p>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="card text-start rounded-3">
            <div class="card-body">
              <div class="d-flex justify-content-end">
                <span class="badge rounded-pill">
                  5
                  <i class="bi bi-star-fill"></i>
                </span>
              </div>
              <h5 class="card-title">終於可以彈了～</h5>
              <p class="card-text">很適合初學者學習的吉他～～</p>
              <div class="d-flex">
                <img src="https://storage.googleapis.com/vue-course-api.appspot.com/hsinyuuu/1631619470419.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=H7oSW8aMpzcWruGPu8gn%2B5oBO%2Bhoxn%2F%2BqM8nxIZwQ8H5tzO7UPFwBzcCYjZv11gB7xMkfb%2BFs4%2BrP%2B1IIKd44xC1qjOGbAnfbVak7kW4mzr0dGr9Mr5fvzKNQ%2FC7GYk6Sbdr80DWZthjSZk1lbRIzvdyz2BvQhO909vbTKaACn5ANrL9IKWsneKHCDxnPnBg9vtKQO7s6HFyIydrcNB25ntSGZWDx%2BF8fDE3ZYeiKNUl60EaEkrX%2BJpS%2F8RR3R%2BL02%2FdLbWgJNsBSoEZuS3ILxYRDK9sgFbAoBwiX3qCBB%2BrgLpV%2B%2F9kAQzLpvWIA4LzGSevhsSbDEq9mPoWdIq59Q%3D%3D" class="card-avatar rounded-circle flex-shrink-0" alt="avatar">
                <div class="flex-grow-1 ms-3">
                  <h5 class="card-text">Dawn Russell</h5>
                  <p>購買：Samick 木吉他</p>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
  <div class="location">
    <div class="container">
      <div class="row position-relative align-items-lg-center flex-md-row-reverse g-0 flex-lg-row">
        <div class="col-md-6 end-0 map">
          <img src="https://storage.googleapis.com/vue-course-api.appspot.com/hsinyuuu/1631632532511.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=HwQB7kUFeErnbSiiaMHPByw%2FviMNaujZiJLkh1r9CNx34DF%2BggT1DZXU4xu4qbWETL20ts42yu0wO0%2BDs3gCga8XjNa1lhwpRx83cUps2fmGcB679UyJOvgvDwnLQ4CV0PyR9XtPoDsqh%2BNXHv0D%2Fph7mCaBqFlxrgc5kmpEWnl7LMSoeuQeeHvn2QX1CJ41RtIKFxjEOYQYvhxlkd3ZTIwnYU9Oncnrp9M7sPyj3QsBOuxhGrXUblHm2QS7%2BCBWT5p0QZYkJ9J%2Fz0u%2F2tq%2Be10jV6%2BPX3iET%2BNJlHmmOK%2BypYRXMuXz2BIImgEyxW%2FAhQ8Md6oiXUUFNueEOmzCnQ%3D%3D" alt="實體店示意圖" class="img-fluid">
        </div>
        <div class="col-md-6 col-lg-7">
          <div class="bg-primary text-light location-info p-3">
            <div class="border border-light h-100 d-flex flex-column justify-content-center align-items-start">
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
  <div class="faq">
    <div class="container">
      <h2 class="mb-5">常見問答</h2>
      <ul class="row accordion accordion-flush" id="accordionFlushFAQ">
        <li class="col-lg-6 accordion-item mb-4">
          <h2 class="accordion-header" id="flush-headingOne">
            <button class="accordion-button fw-bold collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
              購買的吉他會有保固嗎？
            </button>
          </h2>
          <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushFAQ">
            <div class="accordion-body text-muted">
              有的，我們提供一年內非人為損壞之服務檢測及零件更換（包含吉他弦鈕、弦釘、琴椼以及上下弦枕）。不適用於不當保養或經撞擊、人為使用等不當處理引起的損壞。
            </div>
          </div>
        </li>
        <li class="col-lg-6 accordion-item mb-4">
          <h2 class="accordion-header" id="flush-headingTwo">
            <button class="accordion-button fw-bold collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
              請問有寄送海外的服務嗎？
            </button>
          </h2>
          <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushFAQ">
            <div class="accordion-body text-muted">
              目前我們僅限寄送台灣境內，尚不接受寄送至海外、國外。
            </div>
          </div>
        </li>
        <li class="col-lg-6 accordion-item mb-4">
          <h2 class="accordion-header" id="flush-headingThree">
            <button class="accordion-button fw-bold collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
              商品瑕疵退換貨該如何辦理？
            </button>
          </h2>
          <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushFAQ">
            <div class="accordion-body text-muted">
              商品七天之內可接受瑕疵品退換貨服務，可由社群或來電的方式與我們的客服聯繫。
            </div>
          </div>
        </li>
        <li class="col-lg-6 accordion-item mb-4">
          <h2 class="accordion-header" id="flush-headingFour">
            <button class="accordion-button fw-bold  collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
              下單後大約何時會送達？
            </button>
          </h2>
          <div id="flush-collapseFour" class="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushFAQ">
            <div class="accordion-body text-muted">
              台灣本島的大多數地區，原則上出貨後貨件可於寄件之隔日送達，偏遠及離島地區時效請詢問服務人員。
              如您的貨件須於週六、週日、假日送達，請於服務司機取件時告知或於貨件上註明。
            </div>
          </div>
        </li>
        <li class="col-lg-6 accordion-item mb-4">
          <h2 class="accordion-header" id="flush-headingTwo">
            <button class="accordion-button fw-bold collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFifth" aria-expanded="false" aria-controls="flush-collapseFifth">
              若沒有找到想要的樂器，可以指定樂器品牌、型號嗎？
            </button>
          </h2>
          <div id="flush-collapseFifth" class="accordion-collapse collapse" aria-labelledby="flush-headingFifth" data-bs-parent="#accordionFlushFAQ">
            <div class="accordion-body text-muted">
              若沒有找到想要的樂器品牌、型號，歡迎聯絡我們，有機會將您想要的樂器進貨並提供您購買。
            </div>
          </div>
        </li>
        <li class="col-lg-6 accordion-item mb-4">
          <h2 class="accordion-header" id="flush-headingThree">
            <button class="accordion-button fw-bold collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSixth" aria-expanded="false" aria-controls="flush-collapseSixth">
              目前提供哪些付款方式？
            </button>
          </h2>
          <div id="flush-collapseSixth" class="accordion-collapse collapse" aria-labelledby="flush-headingSixth" data-bs-parent="#accordionFlushFAQ">
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
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper.scss'

function getRandomInt (max) {
  return Math.floor(Math.random() * max)
}

export default ({
  data () {
    return {
      timer: null,
      time: 0,
      daysLeft: 0,
      hoursLeft: 0,
      minutesLeft: 0,
      secondsLeft: 0,
      discountResult: '',
      isDiscounting: false,
      articles: ''
    }
  },
  inject: ['$httpMessageState'],
  components: {
    Swiper,
    SwiperSlide
  },
  methods: {
    countDown () {
      const expires = 1640908800
      const currentTime = Math.floor(Date.now() / 1000)
      this.time = expires - currentTime
      this.daysLeft = parseInt(this.time / 60 / 60 / 24)
      this.hoursLeft = parseInt((this.time / 60 / 60) % 24)
      this.minutesLeft = parseInt((this.time / 60) % 60)
      this.secondsLeft = parseInt(this.time % 60)
      this.time--
      if (this.time <= 0) {
        clearInterval(this.timer)
      }
    },
    getDiscount () {
      this.isDiscounting = true
      this.discountResult = ''
      setTimeout(() => {
        const discounts = ['firstPrize50', 'secondPrize60', 'thirdPrize70', 'lastPrize80']
        this.discountResult = discounts[getRandomInt(discounts.length)]
        this.isDiscounting = false
      }, 2000)
    },
    updateCategory (category) {
      this.$router.push({
        name: 'Products',
        params: {
          selectedCategory: category
        }
      })
    },
    getArticles (page = 1) {
      this.isLoading = true
      const api = `/api/${process.env.VUE_APP_APIPATH}/articles?page=${page}`
      this.$http.get(api)
        .then(response => {
          if (!response.data.success) {
            this.$httpMessageState(response, '取得文章')
            this.isLoading = false
            return
          }
          this.articles = response.data.articles
          this.isLoading = false
        })
        .catch(error => {
          this.$httpMessageState(error, '連線錯誤')
          this.isLoading = false
        })
    }
  },
  unmounted () {
    clearInterval(this.timer)
  },
  mounted () {
    this.timer = setInterval(this.countDown, 1000)
    this.getArticles()
  }
})
</script>
