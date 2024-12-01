<template>
  <div class="search-bar">
    <input type="text" v-model="query" placeholder="Search Hacker News..." @input="$emit('searchQuery', query)" />
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  emits: ['searchQuery'],
  data() {
    return {
      query: ''
    };
  }
};
</script>

<style scoped>
/* Search Bar Wrapper */
.search-bar {
  max-width: 800px;
  margin: 0 auto 2rem;
  position: relative;
}

/* Search Input */
.search-bar input {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 2px solid #cce7ff;
  border-radius: 8px;
  background: #ffffff;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.search-bar input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
}

/* Search Results Dropdown */
.search-results {
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  z-index: 10;
  overflow: hidden;
  max-height: 300px;
  overflow-y: auto;
}

.search-results li {
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  color: #34495e;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.search-results li:hover {
  background: #f4faff;
  transform: translateX(5px);
}

.search-results li:empty::before {
  content: "No results found";
  display: block;
  color: #999;
  text-align: center;
  padding: 1rem;
}
</style>
