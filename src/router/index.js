import PostDetails from '@/components/hacker-news/PostDetails.vue';
import DynamicFormBuilder from '@/pages/DynamicFormBuilder.vue';

import HackerNews from '@/pages/HackerNews.vue';
import TaskList from '@/pages/TaskList.vue';
import { createRouter, createWebHistory } from 'vue-router';

// Import your components


// Define routes
const routes = [
  {
    path: '/',
    name: 'Dynamic Form Builder',
    component: DynamicFormBuilder,
  },
  {
    path: '/task-list',
    name: 'TaskList',
    component: TaskList,
  },
  {
    path: '/hacker-news',
    name: 'HackerNews',
    component: HackerNews,
  },
  {
    path: '/details/:id',
    name: 'PostDetails',
    component: PostDetails,
    props: true,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  }
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
