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
  padding: 2rem;
}

.nav-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2c3e50;
  padding: 15px 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}

.nav-item {
  text-decoration: none;
  color: #ecf0f1;
  font-size: 1rem;
  font-weight: 600;
  padding: 10px 20px;
  margin: 0 10px;
  border-radius: 5px;
  text-align: center;
  transition: all 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nav-item:hover {
  background-color: #34495e;
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.nav-item div {
  font-size: 0.85rem;
  font-weight: 400;
  margin-top: 5px;
  opacity: 0.8;
}

.router-link-active {
  background-color: #e74c3c;
  color: #ffffff;
  font-weight: bold;
  box-shadow: 0 4px 10px rgba(231, 76, 60, 0.5);
}

.router-link-active div {
  opacity: 1;
}

@media (max-width: 768px) {
  .nav-bar {
    flex-direction: column;
    padding: 20px;
  }

  .nav-item {
    margin: 5px 0;
    width: 100%;
    text-align: center;
  }
}
</style>