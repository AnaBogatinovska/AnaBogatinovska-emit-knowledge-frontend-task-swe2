<template>
  <div class="post-list-container">
    <!-- Post List -->
    <ul class="post-list">
      <li v-for="(post, index) in posts" :key="post.objectID" @click="viewPostDetails(post.objectID)">
        <div class="post-title" v-html="highlightMatches(post.title, index)"></div>
        <div class="post-meta">
          <span>{{ post.points }} points</span>
          <span>{{ post.author }}</span>
          <span>{{ post.num_comments }} comments</span>
          <span>{{ new Date(post.created_at).toLocaleDateString() }}</span>
        </div>
      </li>
    </ul>

    <!-- Pagination Controls -->
    <div class="pagination-controls" v-if="totalPages > 1">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 0">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages - 1">Next</button>
    </div>

    <div class="no-data">
      <div v-if="!posts.length && !loading" class="empty-state">
        <p class="empty-message">No Posts Available...!</p>
      </div>
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p class="loading-message">Loading...!</p>
      </div>
    </div>
  </div>
</template>

<script>
import HNService from '../../services/HNService';

export default {
  name: 'PostList',
  data() {
    return {
      posts: [],
      currentPage: 0,
      pageSize: 0,
      totalPages: 0,
      loading: false,
      hnService: new HNService(),
    };
  },
  computed: {

  },
  created() {
    this.loadPosts();
  },
  methods: {
    filterPosts(query) {
console.log(query)
      this.loadPosts(query, query);
    },
    highlightMatches(text, idx) {
      return `${this.posts[idx]?._highlightResult?.title?.value ?? ''}`;
    },
    async loadPosts(query, debounce = false) {
      if (this.loading) return;
      this.loading = true;
      try {
        const data = debounce ? await this.hnService.searchPosts(query) : await this.hnService.fetchPosts(query);
        this.posts = data ? query ? [...data?.hits].filter(item => item?._highlightResult?.title?.matchedWords?.length) : [...data?.hits] : [];
        this.updatePaginatedPosts(data);

        this.$emit('clearDebounce');

      } catch (error) {
        console.error('Failed to load posts:', error);
      }
      this.loading = false;
    },
    updatePaginatedPosts(data) {
      this.currentPage = data.page;
      this.pageSize = data.hitsPerPage;
      this.totalPages = this.posts.length ? Math.ceil(this.posts.length / this.pageSize) : 0;
    },
    goToPage(pageNumber) {
      if (pageNumber < 1 || pageNumber > this.totalPages) return;
      this.currentPage = pageNumber;
      this.updatePaginatedPosts();
    },
    viewPostDetails(id) {
      this.$router.push(`/details/${id}`);
    },
  },
};
</script>


<style scoped>
::v-deep(em) {
  color: white !important;
  background: black !important;
}

.no-data {
  display: flex;
  justify-content: center;
}

.empty-state,
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  margin-top: 2rem;
  background: #f4faff;
  border: 1px solid #e0e0e0;
  border-radius: 15px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
}

/* Empty State Styles */
.empty-icon {
  width: 80px;
  height: 80px;
  margin-bottom: 1rem;
}

.empty-message {
  font-size: 1.25rem;
  color: #555;
  font-weight: bold;
  text-align: center;
}

/* Loading State Styles */
.loading-state {
  position: relative;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #e0e0e0;
  border-top: 5px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-message {
  margin-top: 1rem;
  font-size: 1.25rem;
  color: #555;
  font-weight: bold;
  text-align: center;
}

/* Animation for Spinner */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

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

.post-list-container {
  max-width: 900px;
  margin: 0 auto;
}

/* Pagination Controls */
.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.pagination-controls button {
  padding: 0.5rem 1rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pagination-controls button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.pagination-controls button:hover:not(:disabled) {
  background: #0056b3;
}
</style>