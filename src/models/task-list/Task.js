// src/models/Task.js
export default class Task {
    constructor({ title, description, priority, completed = false, date = new Date() }) {
      this.title = title;
      this.description = description;
      this.priority = priority;
      this.completed = completed;
      this.date = new Date(date);
    }
  }
  