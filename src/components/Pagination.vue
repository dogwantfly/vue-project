<!-- pagination -->
<template id="pagination-template">
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" v-if="pagination.has_pre"><a class="page-link" href="#" @click.prevent="changePage(pagination.current_page - 1)">Previous</a></li>
      <template v-for="i in pagination.total_pages" :key="i">
        <li class="page-item" :class="{'active': pagination.current_page === i}"><a class="page-link" href="#" @click.prevent="changePage(i)">{{i}}</a></li>
      </template>
      <li class="page-item"><a class="page-link" href="#" v-if="pagination.has_next" @click.prevent="changePage(pagination.current_page + 1)">Next</a></li>
    </ul>
  </nav>
</template>
<script>
export default {
  props: ['pagination'],
  template: '#pagination-template',
  methods: {
    changePage (page) {
      if (this.pagination.current_page === page) return
      this.$emit('change-page', page)
    }
  }
}
</script>
