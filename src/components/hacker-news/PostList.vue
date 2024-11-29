<template>
  <ul class="post-list">
    <li v-for="post in posts" :key="post.objectID" @click="viewPostDetails(post.objectID)">
      <div class="post-title">{{ post.title }}</div>
      <div class="post-meta">
        <span>{{ post.points }} points</span>
        <span>{{ post.author }}</span>
        <span>{{ post.num_comments }} comments</span>
        <span>{{ post.created_at }}</span>
      </div>
    </li>
    <div v-if="loading" class="loading">Loading more posts...</div>
  </ul>
</template>

<script>
import HNService from '../../services/HNService';

export default {
  name: 'PostList',
  data() {
    return {
      posts: [],
      page: 0,
      loading: false,
      hnService: new HNService()
    };
  },
  created() {
    this.loadPosts();
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    async loadPosts() {
      if (this.loading) return;
      this.loading = true;
      try {
        const data = await this.hnService.fetchPosts(this.page);
        this.posts = [...this.posts, ...data.hits];
        this.page += 1;
      } catch (error) {
        console.error('Failed to load posts:', error);
      }
      this.loading = false;
    },
    handleScroll() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        this.loadPosts();
      }
    },
    viewPostDetails(id) {
      this.$router.push(`/details/${id}`);
    }
  }
};
</script>

<style scoped>
.post-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.post-list li {
  padding: 15px;
  border: 1px solid #dfe3e8;
  border-radius: 5px;
  margin-bottom: 15px;
  background-color: #ffffff;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.post-list li:hover {
  background-color: #f7f9fc;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.post-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #34495e;
  margin-bottom: 5px;
}

.post-meta {
  font-size: 0.9rem;
  color: #7f8c8d;
  display: flex;
  gap: 15px;
}

.loading {
  text-align: center;
  font-size: 1rem;
  color: #7f8c8d;
  padding: 15px 0;
}
</style>