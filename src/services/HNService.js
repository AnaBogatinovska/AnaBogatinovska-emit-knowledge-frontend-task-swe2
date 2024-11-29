import { db } from './db';

export default class HNService {
  constructor() {
    this.baseUrl = 'https://hn.algolia.com/api/v1';
    this.debounceTimeout = null;
  }

  async fetchPosts(page = 0) {
    try {
      // Try to fetch from network first
      const response = await fetch(`${this.baseUrl}/search?tags=story&page=${page}`);
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      
      // Save to IndexedDB for offline access
      await db.savePosts(data.hits);
      return data;
    } catch (error) {
      console.log('Fetching from offline storage...');
      // If network request fails, get from IndexedDB
      const posts = await db.getPosts();
      return { hits: posts };
    }
  }

  async fetchPostDetails(id) {
    try {
      // Try to fetch from network first
      const response = await fetch(`${this.baseUrl}/items/${id}`);
      if (!response.ok) throw new Error('Failed to fetch post details');
      const data = await response.json();
      
      // Save to IndexedDB for offline access
      await db.savePostDetails(data);
      return data;
    } catch (error) {
      console.log('Fetching post details from offline storage...');
      // If network request fails, get from IndexedDB
      return await db.getPostDetails(id);
    }
  }

  async searchPosts(query, callback) {
    clearTimeout(this.debounceTimeout);
    this.debounceTimeout = setTimeout(async () => {
      try {
        // Try online search first
        const response = await fetch(`${this.baseUrl}/search?query=${query}`);
        if (!response.ok) throw new Error('Failed to search posts');
        const data = await response.json();
        callback(data.hits);
      } catch (error) {
        // If network request fails, search in IndexedDB
        const results = await db.searchPosts(query);
        callback(results);
      }
    }, 300);
  }
}