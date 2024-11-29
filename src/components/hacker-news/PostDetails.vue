<template>
  <div class="post-details">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="post" class="post-content">
      <h1>{{ post.title }}</h1>
      <div class="meta">
        <span>By {{ post.author }}</span>
        <span>{{ timeSince(post.created_at) }}</span>
        <span>{{ post.points }} points</span>
      </div>
      <a v-if="post.url" :href="post.url" target="_blank" class="post-link">Visit Original Link</a>

      <div class="comments-section">
        <h2>Comments ({{ post.children?.length || 0 }})</h2>
        <div v-if="post.children" class="comments">
          <div v-for="comment in post.children" :key="comment.id" class="comment">
            <div class="comment-meta">
              <strong>{{ comment.author }}</strong>
              <span>{{ timeSince(comment.created_at) }}</span>
            </div>
            <div class="comment-text" v-html="comment.text"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="error">Post not found</div>
  </div>
</template>

<script>
import HNService from '../../services/HNService';

export default {
  name: 'PostDetails',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      post: null,
      loading: false,
      hnService: new HNService()
    };
  },
  created() {
    this.loadPostDetails();
  },
  methods: {
    async loadPostDetails() {
      try {
        this.loading = true;
        this.post = await this.hnService.fetchPostDetails(this.id);
      } catch (error) {
        console.error('Failed to load post details:', error);
      } finally {
        this.loading = false;
      }
    },
    timeSince(date) {
      const seconds = Math.floor((new Date() - new Date(date)) / 1000);
      const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 }
      ];
      for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count > 0) return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
      }
      return 'just now';
    }
  }
};
</script>

<style scoped>
.post-details {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f9fc;
  border: 1px solid #dfe3e8;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

.loading {
  text-align: center;
  font-size: 1.2rem;
  color: #7f8c8d;
  padding: 20px 0;
}

.post-content h1 {
  font-size: 2rem;
  font-weight: bold;
  color: #34495e;
  margin-bottom: 10px;
}

.meta {
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 15px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.post-link {
  display: inline-block;
  margin: 15px 0;
  font-size: 1rem;
  font-weight: bold;
  color: #3498db;
  text-decoration: none;
  transition: color 0.3s ease-in-out;
}

.post-link:hover {
  color: #2980b9;
}

/* Comments */
.comments-section {
  margin-top: 30px;
}

.comments-section h2 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #34495e;
  margin-bottom: 15px;
}

.comment {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #dfe3e8;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.comment-meta {
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.comment-meta strong {
  font-weight: bold;
  color: #34495e;
}

.comment-text {
  font-size: 1rem;
  color: #2c3e50;
  line-height: 1.5;
}

.error {
  text-align: center;
  color: #e74c3c;
  font-size: 1.2rem;
  font-weight: bold;
  margin: 20px 0;
}

@media (max-width: 768px) {
  .post-details {
    padding: 15px;
  }

  .comments-section h2 {
    font-size: 1.2rem;
  }

  .post-content h1 {
    font-size: 1.5rem;
  }
}
</style>
