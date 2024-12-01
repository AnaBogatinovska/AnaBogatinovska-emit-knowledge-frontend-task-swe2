<template>
  <div class="post-details">
    <div v-if="loading" class="loading">Loading...</div>

    <div v-else-if="post" class="post-content">
      <h1 class="post-title">{{ post.title }}</h1>

      <!-- Meta Information -->
      <div class="meta">
        <span class="meta-author">By {{ post.author }}</span>
        <span class="meta-date">{{ timeSince(post.created_at) }}</span>
        <span class="meta-points">{{ post.points }} points</span>
      </div>

      <!-- Link to Original Post -->
      <a v-if="post.url" :href="post.url" target="_blank" class="post-link">Visit Original Link</a>

      <!-- Comments Section -->
      <div class="comments-section">
        <h2 class="comments-title">Comments ({{ post.children?.length || 0 }})</h2>

        <div v-if="post.children" class="comments">
          <div v-for="comment in post.children" :key="comment.id" class="comment">
            <div class="comment-meta">
              <strong class="comment-author">{{ comment.author }}</strong>
              <span class="comment-date">{{ timeSince(comment.created_at) }}</span>
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
/* Post Details Wrapper */
.post-details {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f4faff;
  border-radius: 15px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  font-family: 'Inter', sans-serif;
}

/* Loading State */
.loading {
  text-align: center;
  font-size: 1.25rem;
  color: #555;
  margin: 2rem 0;
}

/* Post Content */
.post-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.post-title {
  font-size: 2rem;
  font-weight: 700;
  color: #34495e;
  margin-bottom: 1rem;
}

/* Meta Information */
.meta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  font-size: 0.9rem;
  color: #666;
}

.meta span {
  background: #f9f9f9;
  padding: 0.25rem 0.5rem;
  border-radius: 5px;
}

.meta-author {
  background: #e6f7ff;
  color: #007bff;
  font-weight: 600;
}

.meta-date {
  background: #f4f4f4;
  color: #666;
}

.meta-points {
  background: #d3f9d8;
  color: #28a745;
  font-weight: 600;
}

/* Post Link */
.post-link {
  display: inline-block;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background: #007bff;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.post-link:hover {
  background: #0056b3;
  transform: translateY(-2px);
}

/* Comments Section */
.comments-section {
  margin-top: 2rem;
}

.comments-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #34495e;
  margin-bottom: 1rem;
}

.comments {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.comment {
  background: #ffffff;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.comment:hover {
  transform: translateY(-3px);
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
}

.comment-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #555;
  margin-bottom: 0.5rem;
}

.comment-author {
  font-weight: 600;
  color: #34495e;
}

.comment-date {
  font-size: 0.8rem;
  color: #999;
}

.comment-text {
  font-size: 0.9rem;
  color: #444;
  line-height: 1.5;
}

/* Error Message */
.error {
  text-align: center;
  font-size: 1.25rem;
  color: #dc3545;
  font-weight: bold;
  margin: 2rem 0;
}
</style>
