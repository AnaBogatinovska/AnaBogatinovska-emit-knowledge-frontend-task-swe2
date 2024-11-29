<template>
  <div class="app-container">
    <nav class="nav-bar">
      <router-link to="/" class="nav-item">TASK 1 <div>(DYNAMIC FORM)</div></router-link>
      <router-link to="/task-list" class="nav-item">TASK 2 <div>(TASK LIST)</div></router-link>
      <router-link to="/hacker-news" class="nav-item">TASK 3 <div>(HACKER NEWS)</div></router-link>
    </nav>
    <router-view /> <!-- Render the routed component here -->
    <!-- <DynamicForm 
      :schema="formSchema"
      form-title="Student Registration Form"
      @submit="handleFormSubmit"
      @validation-error="handleValidationError"
    /> -->

    <div>{{ }}</div>
  </div>
</template>

<script>
// import DynamicForm from './pages/DynamicForm.vue'

export default {
  name: 'App',
  components: {
    // DynamicForm
  },
  data() {
    return {
      data: null,
    }
  },
  methods: {
    handleFormSubmit(formData) {
      console.log('Form submitted:', formData)
      // Handle form submission
    },
    handleValidationError(errors) {
      console.error('Validation errors:', errors)
      // Handle validation errors
    }
  }
}
</script>

<style>
.app-container {
  padding: 2rem;
}

/* .nav-bar {
  display: flex;
  gap: 24px;
  justify-content: center;
}

.nav-item {
  text-align: center;
} */

.nav-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2c3e50; /* Navy background */
  padding: 15px 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}

.nav-item {
  text-decoration: none;
  color: #ecf0f1; /* Light text color */
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
  background-color: #34495e; /* Darker shade on hover */
  color: #ffffff;
  transform: translateY(-2px); /* Subtle lift effect */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.nav-item div {
  font-size: 0.85rem;
  font-weight: 400;
  margin-top: 5px;
  opacity: 0.8;
}

/* Active link style */
.router-link-active {
  background-color: #e74c3c; /* Highlight active link */
  color: #ffffff; /* White text */
  font-weight: bold;
  box-shadow: 0 4px 10px rgba(231, 76, 60, 0.5); /* Glow effect */
}

.router-link-active div {
  opacity: 1;
}

/* Responsive design for smaller screens */
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