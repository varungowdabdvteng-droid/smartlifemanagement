/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { 
  User, 
  Task, 
  TaskPriority, 
  TaskStatus, 
  GroceryItem, 
  DietLog, 
  WorkoutLog, 
  Notification, 
  ActivityLog 
} from "./types";

import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./components/Dashboard";
import TasksPage from "./components/TasksPage";
import GroceryPage from "./components/GroceryPage";
import DietPage from "./components/DietPage";
import NotificationsPage from "./components/NotificationsPage";
import ProfilePage from "./components/ProfilePage";
import DbmsProjectDeck from "./components/DbmsProjectDeck";
import SettingsPage from "./components/SettingsPage";

// Seed Data mimicking the SQL installation scripts
const INITIAL_TASKS: Task[] = [
  { task_id: 1, user_id: 1, task_name: "Q3 Project Review", description: "Compile Q3 performance slide decks and share with directors.", priority: TaskPriority.HIGH, deadline: "2026-06-10", status: TaskStatus.IN_PROGRESS, created_at: "2026-06-08" },
  { task_id: 2, user_id: 1, task_name: "Grocery Restock", description: "Go to Whole Foods and buy organic groceries.", priority: TaskPriority.MEDIUM, deadline: "2026-06-08", status: TaskStatus.TO_DO, created_at: "2026-06-08" },
  { task_id: 3, user_id: 1, task_name: "Evening Cardio", description: "Run 5 kilometers around the park.", priority: TaskPriority.LOW, deadline: "2026-06-08", status: TaskStatus.DONE, created_at: "2026-06-08" },
  { task_id: 4, user_id: 1, task_name: "Q4 Quarterly Review", description: "Formulate strategy proposal drafts for board approvals.", priority: TaskPriority.HIGH, deadline: "2026-06-24", status: TaskStatus.TO_DO, created_at: "2026-06-08" },
  { task_id: 5, user_id: 1, task_name: "Refactor Grid System", description: "Rebuild CSS frameworks layout to support responsive mobile.", priority: TaskPriority.MEDIUM, deadline: "2026-06-28", status: TaskStatus.TO_DO, created_at: "2026-06-08" },
];

const INITIAL_GROCERY: GroceryItem[] = [
  { item_id: 1, user_id: 1, item_name: "Whole Milk (2L)", quantity: 0, threshold_level: 1, category: "Dairy", created_at: "2026-06-08", sensor_weight_g: 0, original_weight_g: 2000, sensor_enabled: true, automatic_restock: true },
  { item_id: 2, user_id: 1, item_name: "Organic Eggs (12pk)", quantity: 2, threshold_level: 3, category: "Dairy", created_at: "2026-06-08", sensor_weight_g: 100, original_weight_g: 600, sensor_enabled: true, automatic_restock: true },
  { item_id: 3, user_id: 1, item_name: "Sourdough Bread", quantity: 9, threshold_level: 2, category: "Pantry", created_at: "2026-06-08", sensor_weight_g: 450, original_weight_g: 500, sensor_enabled: true, automatic_restock: false },
  { item_id: 4, user_id: 1, item_name: "Green Apples", quantity: 8, threshold_level: 4, category: "Produce", created_at: "2026-06-08", sensor_weight_g: 960, original_weight_g: 1200, sensor_enabled: false, automatic_restock: false },
  { item_id: 5, user_id: 1, item_name: "Beef Ribeye Steak", quantity: 0, threshold_level: 2, category: "Meat", created_at: "2026-06-08", sensor_weight_g: 0, original_weight_g: 800, sensor_enabled: true, automatic_restock: true },
  { item_id: 6, user_id: 1, item_name: "Oat Milk Carton", quantity: 3, threshold_level: 2, category: "Dairy", created_at: "2026-06-08", sensor_weight_g: 250, original_weight_g: 1000, sensor_enabled: true, automatic_restock: true },
];

const INITIAL_DIET: DietLog[] = [
  { diet_id: 1, user_id: 1, food_name: "Greek Yogurt with Granola & Berries", calories: 340, protein: 12, log_date: "2026-06-08" },
  { diet_id: 2, user_id: 1, food_name: "Grilled Chicken Avocado Salad", calories: 520, protein: 42, log_date: "2026-06-08" },
  { diet_id: 3, user_id: 1, food_name: "Protein Shake & Sourdough Bread", calories: 450, protein: 35, log_date: "2026-06-07" },
  { diet_id: 4, user_id: 1, food_name: "Beef Ribeye & Asparagus", calories: 650, protein: 50, log_date: "2026-06-07" },
];

const INITIAL_NOTIFICATIONS: Notification[] = [
  { notification_id: 1, user_id: 1, message: "Quarterly Review Deck - Finalize slide files before 3 PM presentation!", notification_type: "Task Reminder", created_at: "2 hours ago", status: "Unread" },
  { notification_id: 2, user_id: 1, message: "Low Stock: Oat Milk - Only 1 carton remains on pantry shelves!", notification_type: "Grocery Alert", created_at: "4 hours ago", status: "Unread" },
  { notification_id: 3, user_id: 1, message: "Post-Workout Hydration - Remember to drink water after active cardio.", notification_type: "Fitness", created_at: "1 day ago", status: "Read" },
];

const INITIAL_ACTIVITIES: ActivityLog[] = [
  { activity_id: 1, user_id: 1, activity_type: "Task Action", description: "User Alex Rivers changed task 'Evening Cardio' status to Done.", timestamp: "2026-06-08 14:22" },
  { activity_id: 2, user_id: 1, activity_type: "Grocery Trg", description: "Automated trigger 'trg_grocery_low_stock' registered Whole Milk as OUT OF STOCK.", timestamp: "2026-06-08 11:10" },
  { activity_id: 3, user_id: 1, activity_type: "Security System", description: "Salted credential keys validated successfully. JWT issued.", timestamp: "2026-06-08 09:12" },
];

const INITIAL_WORKOUTS: WorkoutLog[] = [
  { workout_id: 1, user_id: 1, workout_type: "Strength Weights Training", duration_minutes: 45, calories_burned: 320, log_date: "2026-06-08" },
  { workout_id: 2, user_id: 1, workout_type: "Cardio Running Speed", duration_minutes: 30, calories_burned: 390, log_date: "2026-06-08" },
  { workout_id: 3, user_id: 1, workout_type: "Swimming session", duration_minutes: 40, calories_burned: 310, log_date: "2026-06-07" },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("landing");
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  
  // Authenticated Profile State
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Relational Entity States (loads cached item, or preloaded seeds)
  const [tasks, setTasks] = useState<Task[]>(() => {
    const cached = localStorage.getItem("slms_tasks");
    return cached ? JSON.parse(cached) : INITIAL_TASKS;
  });

  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>(() => {
    const cached = localStorage.getItem("slms_grocery");
    return cached ? JSON.parse(cached) : INITIAL_GROCERY;
  });

  const [diets, setDiets] = useState<DietLog[]>(() => {
    const cached = localStorage.getItem("slms_diets");
    return cached ? JSON.parse(cached) : INITIAL_DIET;
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const cached = localStorage.getItem("slms_notifications");
    return cached ? JSON.parse(cached) : INITIAL_NOTIFICATIONS;
  });

  const [activities, setActivities] = useState<ActivityLog[]>(() => {
    const cached = localStorage.getItem("slms_activities");
    return cached ? JSON.parse(cached) : INITIAL_ACTIVITIES;
  });

  const [workouts, setWorkouts] = useState<WorkoutLog[]>(() => {
    const cached = localStorage.getItem("slms_workouts");
    return cached ? JSON.parse(cached) : INITIAL_WORKOUTS;
  });

  // Sync state modifications to client localStorage
  useEffect(() => {
    localStorage.setItem("slms_tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("slms_grocery", JSON.stringify(groceryItems));
  }, [groceryItems]);

  useEffect(() => {
    localStorage.setItem("slms_diets", JSON.stringify(diets));
  }, [diets]);

  useEffect(() => {
    localStorage.setItem("slms_workouts", JSON.stringify(workouts));
  }, [workouts]);

  useEffect(() => {
    localStorage.setItem("slms_notifications", JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem("slms_activities", JSON.stringify(activities));
  }, [activities]);

  const addActivity = (type: string, desc: string) => {
    const stamp = new Date().toISOString().replace("T", " ").substring(0, 16);
    const newAct: ActivityLog = {
      activity_id: Date.now(),
      user_id: currentUser?.user_id || 1,
      activity_type: type,
      description: desc,
      timestamp: stamp,
    };
    setActivities((prev) => [newAct, ...prev]);
  };

  const addNotification = (message: string, type: "Task Reminder" | "Grocery Alert" | "Fitness" | "System") => {
    const newN: Notification = {
      notification_id: Date.now() + Math.floor(Math.random() * 1000),
      user_id: currentUser?.user_id || 1,
      message,
      notification_type: type,
      created_at: "Just now",
      status: "Unread",
    };
    setNotifications((prev) => [newN, ...prev]);
  };

  // CORE METRIC ACTIONS & AUTOMATED DATABASE TRIGGERS

  // A. Tasks CRUD
  const handleAddTask = (task: { task_name: string; description: string; priority: TaskPriority; deadline: string }) => {
    const newTaskObj: Task = {
      task_id: Date.now(),
      user_id: currentUser?.user_id || 1,
      task_name: task.task_name,
      description: task.description,
      priority: task.priority,
      deadline: task.deadline,
      status: TaskStatus.TO_DO,
      created_at: new Date().toISOString().substring(0, 10),
    };
    setTasks((prev) => [newTaskObj, ...prev]);
    addActivity("Task System", `Created chore '${task.task_name}' set as ${task.priority} Priority.`);
    
    if (task.priority === TaskPriority.HIGH) {
      addNotification(`High Priority Deadline Alert: ${task.task_name} was registered!`, "Task Reminder");
    }
  };

  const handleUpdateTaskStatus = (taskId: number, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.task_id === taskId) {
          // Triggers an event log
          addActivity("Task System", `Task '${t.task_name}' state transitioned from ${t.status} to ${status}.`);
          return { ...t, status };
        }
        return t;
      })
    );
  };

  const handleDeleteTask = (taskId: number) => {
    const t = tasks.find((item) => item.task_id === taskId);
    if (t) {
      addActivity("Task System", `Task '${t.task_name}' remitted from records.`);
    }
    setTasks((prev) => prev.filter((item) => item.task_id !== taskId));
  };

  // B. Grocery CRUD & Live Triggers
  const handleAddGroceryItem = (item: { 
    item_name: string; 
    category: string; 
    quantity: number; 
    threshold_level: number;
    sensor_weight_g?: number;
    original_weight_g?: number;
    sensor_enabled?: boolean;
    automatic_restock?: boolean;
  }) => {
    const newItemObj: GroceryItem = {
      item_id: Date.now(),
      user_id: currentUser?.user_id || 1,
      item_name: item.item_name,
      category: item.category,
      quantity: item.quantity,
      threshold_level: item.threshold_level,
      created_at: new Date().toISOString().substring(0, 10),
      sensor_weight_g: item.sensor_weight_g ?? (item.sensor_enabled ? item.original_weight_g : undefined),
      original_weight_g: item.original_weight_g,
      sensor_enabled: item.sensor_enabled ?? false,
      automatic_restock: item.automatic_restock ?? false,
    };
    setGroceryItems((prev) => [newItemObj, ...prev]);
    addActivity("Pantry System", `Registered ${item.item_name} (Stock: ${item.quantity}).`);
    
    if (item.quantity <= item.threshold_level) {
      addNotification(`Low Stock Trigger: ${item.item_name} fell below threshold limit!`, "Grocery Alert");
    }
  };

  const handleUpdateGrocerySensorWeight = (itemId: number, weightG: number) => {
    setGroceryItems((prev) =>
      prev.map((g) => {
        if (g.item_id === itemId) {
          const orig = g.original_weight_g || 1000;
          const pct = Math.round((weightG / orig) * 100);
          const computedQty = Math.ceil((weightG / orig) * 10);
          const isDanger = pct <= 20;

          if (isDanger && g.sensor_weight_g !== undefined && Math.round((g.sensor_weight_g / orig) * 100) > 20) {
            addNotification(`Scale Warning Alert: Refrigerator scale detected '${g.item_name}' weight fell to ${weightG}g (${pct}% remaining)!`, "Grocery Alert");
            addActivity("Scale Monitor", `Database trigger notified deficit stock level for ${g.item_name} via smart sensor.`);

            if (g.automatic_restock) {
              setTimeout(() => {
                setGroceryItems((latestItems) =>
                  latestItems.map((item) => {
                    if (item.item_id === itemId) {
                      addNotification(`AI Companion Autopilot: Dispatched automatic restocking drone request for '${item.item_name}'. Replaced package weight reset to ${item.original_weight_g}g.`, "System");
                      addActivity("AI Auto-replenish", `Autonomous trigger replenished product ${item.item_name} to 100% capacity.`);
                      return { ...item, sensor_weight_g: item.original_weight_g, quantity: 10 };
                    }
                    return item;
                  })
                );
              }, 2000);
            }
          }
          return { ...g, sensor_weight_g: weightG, quantity: computedQty };
        }
        return g;
      })
    );
  };

  const handleRunAITaskEvaluator = () => {
    const W = currentUser?.weight || 75;
    const cond = currentUser?.condition || "Active Health Maintenance";

    let targetProtein = 140;
    if (cond.includes("Loss") || cond.includes("Toning")) targetProtein = Math.round(2.2 * W);
    else if (cond.includes("Muscle") || cond.includes("Power")) targetProtein = Math.round(2.0 * W);
    else if (cond.includes("Endurance")) targetProtein = Math.round(1.6 * W);
    else targetProtein = Math.round(1.5 * W);

    const todayMeals = diets.filter((d) => d.log_date === "2026-06-08");
    const todayWorkouts = workouts.filter((w) => w.log_date === "2026-06-08");
    const currentProtein = todayMeals.reduce((sum, d) => sum + d.protein, 0);

    const genList: { name: string; desc: string; priority: TaskPriority }[] = [];
    
    if (currentProtein < targetProtein) {
      const short = targetProtein - currentProtein;
      genList.push({
        name: `AI Macro Lock: Consume ${short}g extra Protein`,
        desc: `Autonomously dispatched because your daily logged intake is ${currentProtein}g, leaving a shortfall of ${short}g against your body weight requirements.`,
        priority: TaskPriority.HIGH
      });
    }

    if (todayWorkouts.length === 0) {
      genList.push({
        name: `AI Cardio/Drill adaptation standard: ${cond}`,
        desc: `Autonomous drill to stimulate physiological updates required to secure target composition: ${cond}.`,
        priority: TaskPriority.MEDIUM
      });
    }

    // Grocery low safety limits
    const depletedGroceries = groceryItems.filter(g => {
      if (g.sensor_enabled && g.sensor_weight_g !== undefined) {
        return (g.sensor_weight_g / (g.original_weight_g || 1000)) <= 0.2;
      }
      return g.quantity <= g.threshold_level;
    });

    depletedGroceries.forEach(g => {
      genList.push({
        name: `AI Auto-Restock Action: Supply ${g.item_name}`,
        desc: `Triggered by weight sensors showing '${g.item_name}' is currently at a critical low capacity.`,
        priority: TaskPriority.MEDIUM
      });
    });

    let newTasksCount = 0;
    genList.forEach(g => {
      // Avoid duplicate task creations
      const duplicate = tasks.some(t => t.task_name === g.name);
      if (!duplicate) {
        const newTask: Task = {
          task_id: Date.now() + Math.floor(Math.random() * 100000),
          user_id: currentUser?.user_id || 1,
          task_name: g.name,
          description: g.desc,
          priority: g.priority,
          deadline: "2026-06-08",
          status: TaskStatus.TO_DO,
          created_at: "2026-06-08"
        };
        setTasks(prev => [newTask, ...prev]);
        newTasksCount++;
      }
    });

    addNotification(`AI Advisor evaluated metrics: dished out ${newTasksCount} dynamic chore reminders. Zero human scheduling details required!`, "System");
    addActivity("AI Evaluator", `Autopilot scheduler dispatched ${newTasksCount} target specific wellness requirements dynamically.`);
  };

  const handleUpdateGroceryQuantity = (itemId: number, quantity: number) => {
    setGroceryItems((prev) =>
      prev.map((g) => {
        if (g.item_id === itemId) {
          const oldQty = g.quantity;
          
          // Mimics MySQL 'trg_grocery_low_stock' trigger logic in real time!
          if (quantity <= g.threshold_level && oldQty > g.threshold_level) {
            addNotification(`Database Trigger Event: '${g.item_name}' quantity fell to ${quantity}. Stock below warning thresholds!`, "Grocery Alert");
            addActivity("Trigger trg_grocery_low_stock", `Database automated trigger alerted deficient stock levels for ${g.item_name}.`);
          } else {
            addActivity("Pantry System", `Stock adjusted for product ${g.item_name} from ${oldQty} to ${quantity}.`);
          }
          return { ...g, quantity };
        }
        return g;
      })
    );
  };

  const handleDeleteGroceryItem = (itemId: number) => {
    const g = groceryItems.find((item) => item.item_id === itemId);
    if (g) {
      addActivity("Pantry System", `Removed ingredient '${g.item_name}' from refrigerator lists.`);
    }
    setGroceryItems((prev) => prev.filter((item) => item.item_id !== itemId));
  };

  // C. Diet & Fitness Logging
  const handleAddMeal = (meal: { food_name: string; calories: number; protein: number; log_date: string }) => {
    const newMealObj: DietLog = {
      diet_id: Date.now(),
      user_id: currentUser?.user_id || 1,
      food_name: meal.food_name,
      calories: meal.calories,
      protein: meal.protein,
      log_date: meal.log_date,
    };
    setDiets((prev) => [newMealObj, ...prev]);
    addActivity("Diet Tracker", `Logged consumption unit: ${meal.food_name} (${meal.calories} kcal).`);
    
    if (meal.protein >= 30) {
      addNotification(`Protein Milestone: ${meal.food_name} provided high anabolic nutrition (${meal.protein}g)!`, "Fitness");
    }
  };

  const handleAddWorkout = (workout: { workout_type: string; duration_minutes: number; calories_burned: number; log_date: string }) => {
    const newWorkoutObj: WorkoutLog = {
      workout_id: Date.now(),
      user_id: currentUser?.user_id || 1,
      workout_type: workout.workout_type,
      duration_minutes: workout.duration_minutes,
      calories_burned: workout.calories_burned,
      log_date: workout.log_date,
    };
    setWorkouts((prev) => [newWorkoutObj, ...prev]);
    addActivity("Fitness System", `Logged active workout: ${workout.workout_type} (burned ${workout.calories_burned} kcal).`);
    addNotification(`Active Calorie Burn: Burned ${workout.calories_burned} kcal doing ${workout.workout_type}!`, "Fitness");
  };

  const handleDeleteWorkout = (workoutId: number) => {
    const term = workouts.find((w) => w.workout_id === workoutId);
    setWorkouts((prev) => prev.filter((w) => w.workout_id !== workoutId));
    if (term) {
      addActivity("Fitness System", `Removed workout entry: ${term.workout_type}.`);
    }
  };

  // D. Notification actions
  const handleMarkAsRead = (notificationId: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.notification_id === notificationId ? { ...n, status: "Read" } : n))
    );
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
    addActivity("Alert System", "Cleared notification logs.");
  };

  // E. Profile details management
  const handleUpdateProfile = (name: string, phone: string) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, full_name: name, phone };
      setCurrentUser(updatedUser);
      addActivity("Account Lock", `Updated handle profile values: Name='${name}', Contact='${phone}'.`);
    }
  };

  // Navigation controller helper
  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLoginSuccess = (user: { 
    user_id: number; 
    full_name: string; 
    email: string; 
    role: string;
    phone?: string;
    weight?: number;
    condition?: string;
    weekly_diet?: string;
  }) => {
    const fullUserObj: User = {
      user_id: user.user_id,
      full_name: user.full_name,
      email: user.email,
      phone: user.phone || "+1 (555) 012-3456",
      role: user.role,
      created_at: "2026-06-08",
      weight: user.weight || 75,
      condition: user.condition || "Active Health Maintenance",
      weekly_diet: user.weekly_diet || "High-Protein Balanced Plan",
    };
    setCurrentUser(fullUserObj);
    addActivity("Security Gate", `Auth successfully granted for ${user.full_name}. Profile customized with ${fullUserObj.weekly_diet}.`);
  };

  const handleLogout = () => {
    addActivity("Security Gate", `Session logged out safely.`);
    setCurrentUser(null);
    setCurrentPage("landing");
  };

  // Floating Action Button contextual trigger handler
  const handleOpenFAB = () => {
    // Dynamically triggers navigation contextually
    if (activeTab === "dashboard" || activeTab === "settings" || activeTab === "profile" || activeTab === "dbms_deck") {
      setActiveTab("tasks");
    } else if (activeTab === "tasks") {
      const choreLabel = prompt("Enter a brief chore checklist label target (e.g. Prepare Viva Slides, Review Schema):");
      if (choreLabel && choreLabel.trim()) {
        handleAddTask({
          task_name: choreLabel.trim(),
          description: "Created via quick-trigger FAB menu widget.",
          priority: TaskPriority.MEDIUM,
          deadline: new Date().toISOString().substring(0, 10),
        });
      }
    } else if (activeTab === "grocery") {
      const itemLabel = prompt("Enter a food item name to record into refrigerator pantry inventory:");
      if (itemLabel && itemLabel.trim()) {
        handleAddGroceryItem({
          item_name: itemLabel.trim(),
          category: "Produce",
          quantity: 3,
          threshold_level: 2,
        });
      }
    } else if (activeTab === "diet") {
      const mealLabel = prompt("Enter meal/recipe food details:");
      if (mealLabel && mealLabel.trim()) {
        handleAddMeal({
          food_name: mealLabel.trim(),
          calories: 450,
          protein: 30,
          log_date: "2026-06-08",
        });
      }
    }
  };

  return (
    <>
      {currentPage === "landing" && (
        <LandingPage onNavigate={handleNavigate} />
      )}

      {currentPage === "login" && (
        <LoginPage onNavigate={handleNavigate} onLoginSuccess={handleLoginSuccess} />
      )}

      {currentPage === "register" && (
        <RegisterPage onNavigate={handleNavigate} onLoginSuccess={handleLoginSuccess} />
      )}

      {currentPage === "dashboard" && (
        <DashboardLayout
          activeTab={activeTab}
          onTabChange={setActiveTab}
          currentUser={currentUser}
          notifications={notifications}
          onLogout={handleLogout}
          onOpenFAB={handleOpenFAB}
        >
          {activeTab === "dashboard" && (
            <Dashboard
              tasks={tasks}
              groceryItems={groceryItems}
              diets={diets}
              workouts={workouts}
              activities={activities}
              onTabChange={setActiveTab}
              currentUser={currentUser}
            />
          )}

          {activeTab === "tasks" && (
            <TasksPage
              tasks={tasks}
              onAddTask={handleAddTask}
              onUpdateStatus={handleUpdateTaskStatus}
              onDeleteTask={handleDeleteTask}
              onRunAITaskEvaluator={handleRunAITaskEvaluator}
            />
          )}

          {activeTab === "grocery" && (
            <GroceryPage
              groceryItems={groceryItems}
              onAddGroceryItem={handleAddGroceryItem}
              onUpdateGroceryQuantity={handleUpdateGroceryQuantity}
              onDeleteGroceryItem={handleDeleteGroceryItem}
              onUpdateGrocerySensorWeight={handleUpdateGrocerySensorWeight}
            />
          )}

          {activeTab === "diet" && (
            <DietPage
              diets={diets}
              onAddMeal={handleAddMeal}
              workouts={workouts}
              onAddWorkout={handleAddWorkout}
              onDeleteWorkout={handleDeleteWorkout}
              currentUser={currentUser}
            />
          )}

          {activeTab === "notifications" && (
            <NotificationsPage
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onClearAll={handleClearAllNotifications}
            />
          )}

          {activeTab === "profile" && (
            <ProfilePage
              currentUser={currentUser}
              activities={activities}
              onUpdateProfile={handleUpdateProfile}
            />
          )}

          {activeTab === "dbms_deck" && (
            <DbmsProjectDeck />
          )}

          {activeTab === "settings" && (
            <SettingsPage />
          )}
        </DashboardLayout>
      )}
    </>
  );
}
