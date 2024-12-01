<template>
  <div class="task-list">
    <h1>Interactive Task List</h1>

    <!-- Form  -->
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
.task-list {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  background: #f4faff;
  border-radius: 15px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  font-family: 'Inter', sans-serif;
}

h1 {
  font-size: 2rem;
  color: #34495e;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 700;
}

.task-input {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr auto;
  gap: 1rem;
  margin-bottom: 2rem;
}

.task-input input,
.task-input select {
  padding: 0.75rem;
  font-size: 1rem;
  border: 2px solid #cce7ff;
  border-radius: 10px;
  background: #ffffff;
  color: #34495e;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.task-input input:focus,
.task-input select:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
}

.task-input button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background: linear-gradient(145deg, #007bff, #0056b3);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.task-input button:hover {
  transform: translateY(-2px);
  box-shadow: 0px 8px 16px rgba(0, 123, 255, 0.3);
}

.filters {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
}

.filters label {
  font-size: 1rem;
  font-weight: 600;
  color: #555;
}

.filters select {
  padding: 0.5rem;
  font-size: 1rem;
  border: 2px solid #cce7ff;
  border-radius: 10px;
  background: #ffffff;
  color: #34495e;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.filters select:focus {
  border-color: #007bff;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
}

.tasks {
  display: grid;
  gap: 1.5rem;
}

.task {
  background: #ffffff;
  padding: 1rem 1.5rem;
  border-radius: 15px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.task:hover {
  transform: translateY(-4px);
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
}

.task h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #34495e;
  margin-bottom: 0.5rem;
}

.task p {
  font-size: 0.95rem;
  color: #666;
  margin: 0.2rem 0;
}

.task.completed {
  background: #d3f9d8;
  border: 2px solid #28a745;
  color: #155724;
}

.task.completed h3,
.task.completed p {
  text-decoration: line-through;
  color: #155724;
}

.task.completed:hover {
  transform: none;
  box-shadow: none;
}

.task button {
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  border: none;
  border-radius: 10px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.task button:first-of-type {
  background: linear-gradient(145deg, #28a745, #218838);
  color: white;
}

.task button:first-of-type:hover {
  transform: translateY(-2px);
  box-shadow: 0px 8px 16px rgba(40, 167, 69, 0.3);
}

.task button:last-of-type {
  background: linear-gradient(145deg, #dc3545, #c82333);
  color: white;
}

.task button:last-of-type:hover {
  transform: translateY(-2px);
  box-shadow: 0px 8px 16px rgba(220, 53, 69, 0.3);
}

p {
  text-align: center;
  font-size: 1rem;
  color: #999;
  font-style: italic;
}

.task-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
  font-weight: bold;
  border-radius: 10px;
  text-transform: uppercase;
}

.task-badge.completed {
  background-color: #28a745;
  color: white;
}

.task-badge.incomplete {
  background-color: #ffc107;
  color: #212529;
}
</style>
