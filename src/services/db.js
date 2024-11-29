import { openDB } from 'idb';

const DB_NAME = 'hn-offline';
const DB_VERSION = 1;

export async function initDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      const postStore = db.createObjectStore('posts', { keyPath: 'objectID' });
      postStore.createIndex('by-date', 'created_at');
      db.createObjectStore('postDetails', { keyPath: 'id' });
    },
  });
}

export const db = {
  async getPosts() {
    const db = await initDB();
    return db.getAllFromIndex('posts', 'by-date');
  },

  async savePosts(posts) {
    const db = await initDB();
    const tx = db.transaction('posts', 'readwrite');
    await Promise.all(posts.map(post => tx.store.put(post)));
    await tx.done;
  },

  async getPostDetails(id) {
    const db = await initDB();
    return db.get('postDetails', id);
  },

  async savePostDetails(post) {
    const db = await initDB();
    await db.put('postDetails', post);
  },

  async searchPosts(query) {
    const db = await initDB();
    const posts = await db.getAllFromIndex('posts', 'by-date');
    return posts.filter(post => 
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.author.toLowerCase().includes(query.toLowerCase())
    );
  }
};