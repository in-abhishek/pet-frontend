#  Pet Adoption System - Frontend

The user interface for the Pet Adoption System, built with **React**, **TypeScript**, and **Tailwind CSS**. This application provides a seamless experience for pet lovers to find their new best friends and for admins to manage the adoption pipeline.

##  Key Features

* **Dynamic Pet Listings:** Real-time browsing of available pets with category and status filtering.
* **Adoption Application System:** A dedicated flow for users to apply for pets and track their application status (Pending/Approved/Rejected).
* **Admin Dashboard:** A private suite for staff to:
* Add, Edit, and Delete pet listings.
* Review adoption applications.
* Manage pet availability status.


* **Secure Authentication:** Protected routes using JWT-based Auth with automated token refreshing.
* **Optimized Forms:** High-performance form handling using `react-hook-form` to ensure smooth data entry.

---

##  Tech Stack

* **Core:** React 19 (Vite)
* **Type Safety:** TypeScript
* **Styling:** Tailwind CSS
* **Form Logic:** React Hook Form
* **API Management:** Custom Hooks (`useGet`, `usePost`)
* **State Management:** React Context API (Auth & Alerts)
* **Notifications:** Custom Toast system for success/error feedback.

---

##  Project Structure

```text
├── src/
│   ├── components/     # Reusable UI elements (Buttons, input)
    ├── (auth)/         # login and register form grouping
    ├── (user)/         # as a user check status and pet details
│   ├── hooks/          # Custom API logic (usePost, useGet, useAuth)
│   ├── context/        # Global states (AuthContext, AlertContext)
│   ├── pages/          # Main views ( PetDetails)
│   ├── utils/          # TypeScript interfaces for API data
│   └── App.tsx         # Route configurations and providers
    └── MainLayout.tsx  # Wrapper for main layout
├── .env                # API endpoints and environment variables
└── tailwind.config.js  # Theme and styling customization


```

---

##  Setup and Installation

1. **Clone the repository:**
```bash
git clone <https://github.com/in-abhishek/pet-frontend.git>
cd frontend

```


2. **Install dependencies:**
```bash
npm install

```


3. **Environment Variables:**
Create a `.env` file in the root folder:
```env
VITE_API_BASE_URL=http://localhost:5002/api

```


4. **Run in development mode:**
```bash
npm run dev

```



---

##  Technical Highlights

### Centralized API Logic

Instead of repeating `fetch` or `axios` calls, the project uses a custom hook system that automatically attaches the `Authorization` bearer token and handles loading/error states globally.

### Form Handling with Pre-fills

The pet editing feature uses `useEffect` combined with `react-hook-form`'s `reset()` to dynamically load data into the form for a smooth admin experience.

---

##  Security

* **Protected Routes:** Private routes check for `accessToken` and user `role` before granting access.
* **Interceptor Logic:** Handled within custom hooks to manage 401 (Unauthorized) errors and trigger token refreshes.

---
