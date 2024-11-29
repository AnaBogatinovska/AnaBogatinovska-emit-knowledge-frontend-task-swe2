<template>
  <div class="search-bar">
    <input type="text" v-model="query" placeholder="Search Hacker News..." @input="handleInput" />
    <ul v-if="results.length" class="search-results">
      <li v-for="result in results" :key="result.objectID" @click="selectPost(result.objectID)">
        {{ result.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import HNService from '../../services/HNService';

export default {
  name: 'SearchBar',
  emits: ['selectPost'],
  data() {
    return {
      query: '',
      results: [],
      hnService: new HNService()
    };
  },
  methods: {
    handleInput() {
      if (this.query.trim() === '') {
        this.results = [];
        return;
      }
      this.hnService.searchPosts(this.query, (results) => {
        this.results = results;
      });
    },
    selectPost(id) {
      this.$emit('selectPost', id);
      this.results = [];
      this.query = '';
    }
  }
};
</script>

<style scoped>
.search-bar {
  position: relative;
  margin-bottom: 20px;
}

.search-bar input {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #dfe3e8;
  border-radius: 5px;
  font-size: 1rem;
  transition: all 0.3s ease-in-out;
}

.search-bar input:focus {
  border-color: #3498db;
  /* Blue focus */
  outline: none;
  box-shadow: 0 0 4px rgba(52, 152, 219, 0.4);
}

.search-results {
  position: absolute;
  top: 45px;
  left: 0;
  right: 0;
  background-color: #ffffff;
  border: 1px solid #dfe3e8;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
}

.search-results li {
  padding: 10px 15px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.3s ease-in-out;
}

.search-results li:last-child {
  border-bottom: none;
}

.search-results li:hover {
  background-color: #f7f9fc;
}
</style>