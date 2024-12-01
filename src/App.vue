<template>
  <div class="app-container">
    <nav class="nav-bar">
      <router-link to="/" class="nav-item">TASK 1 <div>(DYNAMIC FORM BUILDER)</div></router-link>
      <router-link to="/task-list" class="nav-item">TASK 2 <div>(TASK LIST)</div></router-link>
      <router-link to="/hacker-news" class="nav-item">TASK 3 <div>(HACKER NEWS)</div></router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
.app-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f6f9fc 0%, #ecf0f5 100%);
}

.nav-bar {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1rem;
  margin: 1rem;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.nav-item {
  position: relative;
  padding: 1rem 2rem;
  border-radius: 12px;
  color: #1a365d;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  background: transparent;
}

.nav-item div {
  font-size: 0.75rem;
  opacity: 0.7;
  margin-top: 0.25rem;
}

.nav-item:hover,
.router-link-active {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(37, 99, 235, 0.2);
}
</style>