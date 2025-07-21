
# 🧠 Life Management Dashboard

A full-stack personal productivity web app to manage **workouts**, **meals**, **notes**, **financial tracking**, and more — all in one place. Built with modern technologies and a focus on user-friendly design.

---

## [Site is Live](https://lifeer-app.vercel.app/)

## 🚀 Features

### ✅ **Core Functionalities**
- **User Authentication** (Sign up / Login / Logout)
  - Firebase Authentication integration
  - Persistent login with protected routes
- **Dashboard Overview**
  - Greets user by name/email
  - Displays today’s:
    - 🏋️ Exercises
    - 📝 Notes
    - 📈 Progress bar (coming soon)
    - 💬 Motivational quote (auto-refreshes)
- **Exercise Records**
  - Day-wise tabbed records (Monday to Sunday)
  - Add/edit/delete exercises for any day
  - Mark exercises as complete
- **Notes**
  - Add notes with selected date
  - Mark notes as complete
  - Delete single note or all notes from a date
- **Responsive Sidebar Navigation**
  - Profile
  - Exercise Recs
  - Notes
  - Logout (sticky at the bottom)
- **Light Mode UI**
  - Clean, minimal, light-themed interface

---

## 📦 Tech Stack

| Layer       | Technology              |
|-------------|--------------------------|
| Frontend    | React + Tailwind CSS     |
| Auth        | Firebase Authentication  |
| Backend     | Firebase Firestore       |
| State Mgmt  | React Context API        |
| Routing     | React Router DOM         |
| Hosting     | (Planned: Firebase / Vercel) |

---

## 🔒 Authentication

- Uses Firebase Authentication.
- Includes AuthContext with persistent login.
- ProtectedRoute wrapper restricts dashboard routes unless logged in.

---

## 🔄 Data Persistence

- Notes and Exercises are **stored and retrieved** per user.
- Uses Firebase Firestore to keep each user's data separate and secure.
- DataContext handles fetch/save automatically on user login and data change.

---

## 📌 Pages & Routes

| Route               | Description                      |
|---------------------|----------------------------------|
| `/`                 | Login / Sign up page             |
| `/dashboard`        | Overview dashboard               |
| `/dashboard/exercise-recs` | Manage exercises (day-wise)     |
| `/dashboard/notes`  | Manage daily notes               |
| `/dashboard/profile`| User profile (coming soon)       |

---

## 🧩 Features Coming Soon

- 📊 **Progress Bar** based on completed tasks (Notes + Exercises)
- 👤 **User Profile Page** with editable details
- 💸 **Finance Tracker**: Add expenses/income with monthly breakdown
- 🥗 **Meal Tracker**: Daily meal logging
- 🛑 **Reminders/Notifications**
- ☁️ **Cloud Sync + Offline Support**
- 📱 **Mobile App Version** (PWA or React Native)

---

## 💡 How to Run Locally

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/life-dashboard.git
   cd life-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a Firebase project
   - Add Firebase config to `firebase.js`

4. **Start the server**
   ```bash
   npm run dev
   ```

---

## 👥 Contributors

- **Aayush Arya** – Front-End Developer & Project Leads

---

> Built with ❤️ to manage your life smarter.
