import { db } from './db';

export default class HNService {
  constructor() {
    this.baseUrl = 'https://hn.algolia.com/api/v1';
    this.debounceTimeout = null;
  }

  async fetchPosts(query = '') {
    try {
      // Try to fetch from network first
      const response = await fetch(`${this.baseUrl}/search?query=${query}`);
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
  async searchPosts(query) {
    clearTimeout(this.debounceTimeout);

    return new Promise((resolve, reject) => {
      this.debounceTimeout = setTimeout(async () => {
        try {
          const data = await this.fetchPosts(query);
          resolve(data);
        } catch (error) {
          reject(error);
        }
      }, 300);
    });
  }
}