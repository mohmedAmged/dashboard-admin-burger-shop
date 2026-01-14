# 🍔 Burger Shop Admin Dashboard

A premium, modern, and highly responsive administrative dashboard for managing a burger restaurant. Built with **React 19**, **Vite**, and **Tailwind CSS 4**, this dashboard provides a seamless experience for managing products, orders, customers, and business analytics.

---

## 🚀 Demo Access

To explore the dashboard live, use the following credentials:

- **Email**: `mohamedamgad123@gmail.com`
- **Password**: `123456789`

---

## 🚀 Key Features

### 📊 Real-time Analytics & Dashboard

- **Business Overview**: Instant visibility into total revenue, total orders, total users, and product count.
- **Sales Trends**: Interactive 7-day sales charts powered by **Recharts**.
- **Top Sellers**: Identification of the highest-performing products.
- **Order Distribution**: Visual breakdown of order statuses.

### 📦 Product Management

- **Full CRUD Operations**: Create, Read, Update, and Delete products.
- **Stock Tracking**: Monitor and update product availability effortlessly.

### 📝 Order Management

- **Centralized Tracking**: A comprehensive list of all customer orders with filtering capabilities.
- **Dedicated Order Details**: Deep-dive into specific orders with dedicated pages showing customer info, items, and pricing.
- **Live Status Updates**: Seamlessly move orders from "Pending" to "Delivered" with a single click.

### 🎫 Voucher System

- **Discount Management**: Create and manage promotional vouchers with custom types and validation rules.
- **Dynamic Application**: Real-time validation of vouchers for customer carts.

### 📱 Premium UX/UI

- **Fully Responsive**: Adaptive design that transitions from a detailed table view on desktops to a logical card-based layout on mobile and tablets.
- **Smooth Feedback**: Interactive notifications via **React Hot Toast**.
- **State Persistence**: Secure authentication state management with **Zustand** and **JWT** auto-logout on expiry.

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **API Client**: [Axios](https://axios-http.com/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

---

## 📈 Project Status & Recent Work

- **⚡ Optimized Data Loading**: Implemented sequential data fetching to improve initial dashboard load times and reduce server strain.
- **📸 Enhanced Media Handling**: Migrated from simple image URLs to a robust file-based upload system using Multer.
- **🛡️ Improved Security**: Integrated Axios interceptors for automatic logout when JWT tokens expire.
- **🍔 Thematic UI Refinement**: Applied a consistent "burger restaurant" aesthetic across all management pages.
- **📧 Workflow Automation**: Debugged and finalized QStash-based email workflows for order status notifications.

### Done

- [x] **Core Dashboard Stats**: Integrated and real-time trends.
- [x] **Product Module**: Full CRUD with file handles.
- [x] **Order Module**: Detail views and status workflows.
- [x] **Voucher Module**: Admin management and validation system.
- [x] **Responsive UI**: Table/Card hybrid layout for all screens.

### Up Next (Roadmap)

- [ ] **Advanced Analytics**: Detailed user behavior and heatmaps.
- [ ] **Inventory Alerts**: Low-stock automated notifications.
- [ ] **Multi-language Support**: i18n localization.

---

## 📥 Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mohmedAmged/dashboard-admin-burger-shop.git
   ```
2. Navigate to the project directory:
   ```bash
   cd dashboard-burger-shop
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 📄 License

This project is for demonstration purposes. All rights reserved.

---

_Made with ❤️ by [Mohamed Amged](https://github.com/mohmedAmged)_
