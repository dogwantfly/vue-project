<template>
  <Loading :active="isLoading" :z-index="100" :loader="'dots'" :color="'#384D48'"/>
  <ul class="list-unstyled row row-cols-md-2 g-4 mb-4">
    <li class="col">
      <div class="card shadow-sm bg-light border-0">
        <div class="card-body text-end d-flex justify-content-between">
          <h2 class="display-6 text-primary">訂單數</h2>
          <p class="display-4 mb-0">
            {{ allOrders.length }}
          </p>
        </div>
      </div>
    </li>
    <li class="col">
      <div class="card shadow-sm bg-light border-0">
        <div class="card-body text-end d-flex justify-content-between">
          <h2 class="display-6 text-primary">營業額</h2>
          <p class="display-4 mb-0 text-success">
            <span class="fs-6">NT$</span>
            {{ $filters.currency(revenue) }}
          </p>
        </div>
      </div>
    </li>
  </ul>
  <div class="row g-4 mb-4">
    <div class="col-lg-5">
      <div class="card shadow-sm h-100 bg-light border-0">
        <div class="card-header bg-transparent border-0 py-3">
          <h2 class="fs-4 text-primary fw-normal">產品營收比例</h2>
        </div>
        <div class="card-body d-flex align-items-center">
          <canvas ref="pieChart" class="img-fluid"></canvas>
        </div>
      </div>
    </div>
    <div class="col-lg-7">
      <div class="card shadow-sm h-100 bg-light border-0">
        <div class="card-header bg-transparent border-0 py-3">
          <h2 class="fs-4 text-primary fw-normal">每日營收</h2>
        </div>
        <div class="card-body d-flex align-items-center">
          <canvas ref="barChart" class="img-fluid"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/dist/chart.min';

export default ({
  data() {
    return {
      isLoading: false,
      orders: [],
      pagination: {},
      allOrders: [],
      revenue: 0,
      chartColors: {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        darkBlue: 'rgb(75, 112, 192)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(201, 203, 207)',
      },
    };
  },
  inject: ['$httpMessageState'],
  methods: {
    getAllOrders(page = 1) {
      this.isLoading = true;
      const api = `/api/${process.env.VUE_APP_APIPATH}/admin/orders?page=${page}`;
      this.$http.get(api)
        .then((response) => {
          if (!response.data.success) {
            this.isLoading = false;
            return;
          }
          this.orders = response.data.orders;
          this.pagination = response.data.pagination;
          this.allOrders = [];
          this.orders.forEach((order) => {
            this.allOrders.push(order);
          });
          if (this.pagination.total_pages > 1) {
            for (let i = 2; i <= this.pagination.total_pages; i += 1) {
              this.$http.get(`/api/${process.env.VUE_APP_APIPATH}/admin/orders?page=${i}`)
                .then((res) => {
                  if (!res.data.success) {
                    this.isLoading = false;
                    return;
                  }
                  const { orders } = res.data;
                  orders.forEach((order) => {
                    this.allOrders.push(order);
                  });
                });
            }
            this.allOrders.forEach((order) => {
              this.revenue += order.total;
            });
            this.getPieChart();
            this.getBarChart();
            this.isLoading = false;
          }
        })
        .catch((error) => {
          this.$httpMessageState(error, '連線錯誤');
          this.isLoading = false;
        });
    },
    organizePieData() {
      const productRevenue = {};
      this.allOrders.forEach((order, index) => {
        const productsInOrder = this.allOrders[index].products;
        Object.keys(productsInOrder).forEach((product) => {
          const productInOrder = productsInOrder[product];
          if (productRevenue[productInOrder.product.title] === undefined) {
            productRevenue[productInOrder.product.title] = (productInOrder.product.price)
              * (productInOrder.qty);
          } else {
            productRevenue[productInOrder.product.title]
              += (productInOrder.product.price)
              * (productInOrder.qty);
          }
        });
      });
      return productRevenue;
    },
    getPieChart() {
      let data = this.organizePieData();
      const productRevenueLabels = Object.keys(data);
      const productRevenueDatas = Object.values(data);
      const pieCtx = this.$refs.pieChart;
      const config = {
        type: 'pie',
        data: {
          datasets: [{
            data: productRevenueDatas,
            backgroundColor: [
              this.chartColors.red,
              this.chartColors.orange,
              this.chartColors.yellow,
              this.chartColors.green,
              this.chartColors.blue,
            ],
            label: '各產品營收',
          }],
          labels: productRevenueLabels,
        },
        options: {
          responsive: true,
        },
      };
      if (this.pieChart) {
        data = this.organizePieData();
        this.pieChart.data.labels = Object.keys(data);
        this.pieChart.data.datasets[0].data = Object.values(data);
        this.pieChart.update();
      } else {
        this.pieChart = new Chart(pieCtx, config);
      }
    },
    organizeBarData() {
      const productRevenue = {};
      this.allOrders.sort((a, b) => a.create_at - b.create_at);
      this.allOrders.forEach((order) => {
        const orderDate = this.$filters.date(order.create_at).toString();
        if (productRevenue[orderDate] === undefined) {
          productRevenue[orderDate] = order.total;
        } else {
          productRevenue[orderDate] += order.total;
        }
      });
      return productRevenue;
    },
    getBarChart() {
      let data = this.organizeBarData();
      const productRevenueLabels = Object.keys(data);
      const productRevenueDatas = Object.values(data);
      const barCtx = this.$refs.barChart;
      const barConfig = {
        type: 'bar',
        data: {
          datasets: [{
            data: productRevenueDatas,
            backgroundColor: [
              this.chartColors.red,
              this.chartColors.orange,
              this.chartColors.yellow,
              this.chartColors.green,
              this.chartColors.blue,
            ],
            label: '營收圖表',
          }],
          labels: productRevenueLabels,
        },
        options: {
          responsive: true,
        },
      };
      if (this.barChart) {
        data = this.organizeBarData();
        this.barChart.data.labels = Object.keys(data);
        this.barChart.data.datasets[0].data = Object.values(data);
        this.barChart.update();
      } else {
        this.barChart = new Chart(barCtx, barConfig);
      }
    },
  },
  computed: {
    allOrdersLength() {
      return this.allOrders.length;
    },
  },
  watch: {
    allOrdersLength() {
      this.revenue = 0;
      this.allOrders.forEach((order) => {
        this.revenue += order.total;
      });
      this.getPieChart();
      this.getBarChart();
    },
  },
  created() {
    this.$http.defaults.baseURL = process.env.VUE_APP_API;
    this.getAllOrders();
  },
});
</script>
