<template>
  <div class="home text-center">
    <div class="banner bg-overlay">
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default ({
  name: 'Index'
})
</script>

<style scoped>
  .banner-bg {
    background-color: rgba(176, 177, 173, 0.5);
  }
  .banner {
    height: 75vh;
    background: url('https://storage.googleapis.com/vue-course-api.appspot.com/hsinyuuu/1628700994415.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=OHIKs%2F4ilnVuRvsNh7QCbrF%2B%2Bjqvrcey3DgKyGywreHd22qUA4PzDEIuwJ2MotDhthNV99%2F%2FDhrH0cK7HsTXBssMqICcwvnEYKWSPn7MWpUdSbs3krnA0PAl0aRBaQVT98bU6cQDP9ziLBnVViF2tcqUioqsAWJn67%2FELiNb0ZQ1KOksV9WHkzsDurYyS3HuYTNmujQCrDtDM0Wf2vPVy8z5SXDGujiov34%2BGpC8Ul60orvZLGGhIsOe1u0jq2aW%2FHPiMCgp748r8FdlmyywTnVmEgmiyPgGh5qdQ9JmlMXIyzaMKe4tqCeaQ%2Bdh6CiNGWM%2FxtWjwrqCHdpY95X1ww%3D%3D') no-repeat center/cover;
    background-color: rgba(119, 119, 119, 0.549);
  }
  .bg-overlay:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #c9ccce;
    opacity: .55;
  }
  .banner img {
    height: 60vh;
  }
</style>
