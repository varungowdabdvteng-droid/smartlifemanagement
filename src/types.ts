/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface User {
  user_id: number;
  full_name: string;
  email: string;
  phone: string;
  role: string;
  created_at: string;
}

export enum TaskPriority {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
}

export enum TaskStatus {
  TO_DO = "To Do",
  IN_PROGRESS = "In Progress",
  DONE = "Done",
}

export interface Task {
  task_id: number;
  user_id: number;
  task_name: string;
  description: string;
  priority: TaskPriority;
  deadline: string;
  status: TaskStatus;
  created_at: string;
}

export interface GroceryItem {
  item_id: number;
  user_id: number;
  item_name: string;
  quantity: number;
  threshold_level: number;
  category: string;
  created_at: string;
}

export interface DietLog {
  diet_id: number;
  user_id: number;
  food_name: string;
  calories: number;
  protein: number;
  log_date: string;
}

export interface Notification {
  notification_id: number;
  user_id: number;
  message: string;
  notification_type: "Task Reminder" | "Grocery Alert" | "Fitness" | "System";
  created_at: string;
  status: "Unread" | "Read";
}

export interface ActivityLog {
  activity_id: number;
  user_id: number;
  activity_type: string;
  description: string;
  timestamp: string;
}

export interface SLMSDatabase {
  users: User[];
  tasks: Task[];
  grocery: GroceryItem[];
  diet: DietLog[];
  notifications: Notification[];
  activities: ActivityLog[];
}
