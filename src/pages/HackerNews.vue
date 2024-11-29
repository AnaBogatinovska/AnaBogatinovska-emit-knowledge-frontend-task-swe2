<template>
  <div class="app-container">
    <SearchBar @selectPost="handleSelectPost" />

    <section class="content">
      <PostList></PostList>
    </section>
  </div>
</template>

<script>
import PostList from '@/components/hacker-news/PostList.vue';
import SearchBar from '../components/hacker-news/SearchBar.vue';

export default {
  components: { SearchBar, PostList },
  methods: {
    handleSelectPost(id) {
      console.log(id);
      this.$router.push(`details/${id}`);
    },
  },
};
</script>

<style scoped>
.app-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f9fc;
  border: 1px solid #dfe3e8;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.content {
  margin-top: 20px;
}
</style>