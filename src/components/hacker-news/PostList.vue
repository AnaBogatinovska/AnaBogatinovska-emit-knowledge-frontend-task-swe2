<template>
  <ul class="post-list">
    <li v-for="post in posts" :key="post.objectID" @click="viewPostDetails(post.objectID)">
      <div class="post-title">{{ post.title }}</div>
      <div class="post-meta">
        <span>{{ post.points }} points</span>
        <span>{{ post.author }}</span>
        <span>{{ post.num_comments }} comments</span>
        <span>{{ new Date(post.created_at).toLocaleDateString() }}</span>
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
  margin: 0 auto;
  max-width: 800px;
  list-style: none;
  padding: 0;
}

/* Individual Post Item */
.post-list li {
  background: #ffffff;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.post-list li:hover {
  transform: translateY(-3px);
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
}

/* Post Title */
.post-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #34495e;
  margin-bottom: 0.5rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

/* Post Meta Information */
.post-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.9rem;
  color: #666;
}

.post-meta span {
  background: #f4f4f4;
  padding: 0.25rem 0.5rem;
  border-radius: 5px;
  font-size: 0.85rem;
  color: #555;
}

/* Highlighting Points */
.post-meta span:first-of-type {
  background: #e6f7ff;
  color: #007bff;
  font-weight: 600;
}

/* Loading Indicator */
.loading {
  text-align: center;
  font-size: 1rem;
  color: #999;
  margin-top: 2rem;
  font-style: italic;
}
</style>