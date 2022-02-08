<template id="pagination-template">
  <nav aria-label="Page navigation" v-if="pagination.total_pages > 1">
    <ul class="pagination justify-content-end">
      <li class="page-item" v-if="pagination.has_pre">
        <a
          class="page-link bi bi-caret-left-fill"
          href="#"
          @click.prevent="changePage(pagination.current_page - 1)"></a>
      </li>
      <template v-for="page in pagination.total_pages" :key="page">
        <li class="page-item" :class="{'active': pagination.current_page === page}">
          <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
        </li>
      </template>
      <li class="page-item">
        <a
          class="page-link bi bi-caret-right-fill"
          href="#"
          v-if="pagination.has_next"
          @click.prevent="changePage(pagination.current_page + 1)"></a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pagination'],
  emits: ['change-page'],
  template: '#pagination-template',
  methods: {
    changePage(page) {
      if (this.pagination.current_page === page) return;
      this.$emit('change-page', page);
    },
  },
};
</script>
