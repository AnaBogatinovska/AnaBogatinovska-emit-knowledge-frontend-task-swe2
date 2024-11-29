<template>
  <div class="task-list">
    <h1>Interactive Task List</h1>

    <!-- Task Form  -->
    <div class="task-input">
      <input v-model="newTask.title" placeholder="Task Title" />
      <input v-model="newTask.description" placeholder="Task Description" />
      <select v-model="newTask.priority">
        <option disabled value="">Select Priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button @click="addTask">Add Task</button>
    </div>

    <!-- Filters  -->
    <div class="filters">
      <label>Filter By:</label>
      <select v-model="filterStatus">
        <option value="">All Tasks</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>
      <label>Sort By:</label>
      <select v-model="sortOption">
        <option value="alphabetical">Alphabetical</option>
        <option value="date">Date</option>
        <option value="priority">Priority</option>
      </select>
    </div>

    <!-- Task List -->
    <div v-if="filteredAndSortedTasks.length" class="tasks">
      <div v-for="(task, index) in filteredAndSortedTasks" :key="index" class="task"
        :class="{ completed: task.completed }">
        <h3>{{ task.title }}</h3>
        <p>{{ task.description }}</p>
        <p>Priority: {{ task.priority }}</p>
        <p>Date: {{ task.date.toLocaleDateString() }}</p>
        <button @click="toggleComplete(index)">
          {{ task.completed ? "Mark Incomplete" : "Mark Complete" }}
        </button>
        <button @click="deleteTask(index)">Delete</button>
      </div>
    </div>
    <p v-else>No tasks to display</p>
  </div>
</template>

<script>
import Task from '../models/task-list/Task';

export default {
  name: 'TaskList',
  data() {
    return {
      tasks: [],
      newTask: {
        title: '',
        description: '',
        priority: '',
      },
      filterStatus: '',
      sortOption: 'date',
    };
  },
  computed: {
    filteredAndSortedTasks() {
      let filteredTasks = [...this.tasks];

      // Filter tasks
      if (this.filterStatus === 'completed') {
        filteredTasks = filteredTasks.filter((task) => task.completed);
      } else if (this.filterStatus === 'incomplete') {
        filteredTasks = filteredTasks.filter((task) => !task.completed);
      }

      // Sort tasks
      if (this.sortOption === 'alphabetical') {
        filteredTasks.sort((a, b) => a.title.localeCompare(b.title));
      } else if (this.sortOption === 'date') {
        filteredTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
      } else if (this.sortOption === 'priority') {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        filteredTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
      }

      return filteredTasks;
    },
  },
  methods: {
    addTask() {
      if (!this.newTask.title || !this.newTask.priority) {
        alert('Please fill in all required fields.');
        return;
      }
      const task = new Task({ ...this.newTask });
      this.tasks.push(task);
      this.saveTasks();
      this.resetNewTask();
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
      this.saveTasks();
    },
    toggleComplete(index) {
      this.tasks[index].completed = !this.tasks[index].completed;
      this.saveTasks();
    },
    resetNewTask() {
      this.newTask = { title: '', description: '', priority: '' };
    },
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
    loadTasks() {
      const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      this.tasks = savedTasks.map((task) => new Task(task));
    },
  },
  created() {
    this.loadTasks();
  },
};
</script>

<style scoped>
/* Task List  */
.task-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f9fc;
  border: 1px solid #dfe3e8;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

.task-list h1 {
  font-size: 2rem;
  font-weight: bold;
  color: #34495e;
  /* Dark gray */
  text-align: center;
  margin-bottom: 20px;
}

/* Task form Section */
.task-input {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.task-input input,
.task-input select {
  flex: 1;
  padding: 10px;
  border: 1px solid #dfe3e8;
  border-radius: 5px;
  font-size: 1rem;
  transition: all 0.3s ease-in-out;
}

.task-input input:focus,
.task-input select:focus {
  border-color: #3498db;
  outline: none;
  box-shadow: 0 0 4px rgba(52, 152, 219, 0.4);
}

.task-input button {
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: #ffffff;
  background-color: #3498db;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.task-input button:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.filters {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 20px;
}

.filters label {
  font-weight: bold;
  color: #2c3e50;
}

.filters select {
  padding: 10px;
  border: 1px solid #dfe3e8;
  border-radius: 5px;
  font-size: 1rem;
  transition: all 0.3s ease-in-out;
}

.filters select:focus {
  border-color: #3498db;
  outline: none;
  box-shadow: 0 0 4px rgba(52, 152, 219, 0.4);
}

.tasks {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.task {
  padding: 15px;
  border: 1px solid #dfe3e8;
  border-radius: 5px;
  background-color: #ffffff;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.task h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: bold;
  color: #34495e;
}

.task p {
  margin: 5px 0;
  color: #7f8c8d;
}

.task button {
  padding: 8px 12px;
  margin-top: 10px;
  font-size: 0.9rem;
  font-weight: bold;
  color: #ffffff;
  background-color: #3498db;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.task button:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.task button:last-of-type {
  background-color: #e74c3c;
}

.task button:last-of-type:hover {
  background-color: #c0392b;
}

.task.completed {
  background-color: #ecf8f2;
  border-color: #2ecc71;
}

.task.completed h3,
.task.completed p {
  text-decoration: line-through;
  color: #7f8c8d;
}

.task-list p {
  text-align: center;
  color: #7f8c8d;
  font-style: italic;
}

@media (max-width: 768px) {
  .task-input {
    flex-direction: column;
  }

  .filters {
    flex-direction: column;
    gap: 10px;
  }
}
</style>