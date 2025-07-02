# 🛒 Grocery List App

A fun and practical grocery shopping app built with React, Vite, and Tailwind CSS.

## Features

- 🛒 **Add grocery items** with categories and quantities
- 📋 **Organize by categories** - Produce, Dairy, Meat, Bakery, Pantry, etc.
- 🎯 **Shopping cart view** - See what you've purchased
- 📊 **Quantity controls** - Adjust amounts with +/- buttons
- 🏷️ **Category emojis** - Visual category indicators
- 🔄 **Toggle purchase status** - Mark items as bought
- ✏️ **Edit items** - Change name, category, or quantity
- 🗑️ **Delete items** - Remove unwanted items
- 📱 **Responsive design** - Works on all devices
- 💾 **Local storage persistence** - Your list survives browser refreshes
- 🎨 **Beautiful UI** - Modern, clean interface with smooth animations

## Categories

- 🥬 **Produce** - Fruits, vegetables, herbs
- 🥛 **Dairy** - Milk, cheese, yogurt, eggs
- 🥩 **Meat** - Chicken, beef, pork, fish
- 🍞 **Bakery** - Bread, pastries, cakes
- 🥫 **Pantry** - Canned goods, pasta, rice
- 🧊 **Frozen** - Frozen meals, ice cream
- 🥤 **Beverages** - Drinks, juices, soda
- 🍿 **Snacks** - Chips, nuts, candy
- 📦 **Other** - Miscellaneous items

## Tech Stack

- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Local Storage** - Browser-based data persistence

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## How to Use

1. **Adding Items:** Type the item name, select a category, set quantity, and click "Add Item"
2. **Sample Items:** Click "📋 Add Sample Items" to get started quickly
3. **Marking as Purchased:** Click the checkbox next to any item
4. **Adjusting Quantity:** Use the +/- buttons to change amounts
5. **Editing Items:** Double-click the item name or click the edit icon
6. **Viewing Cart:** Click "🛒 Show Cart" to see purchased items
7. **Filtering:** Use the filter buttons to view different states
8. **Clearing Purchased:** Click "Clear purchased items" to remove bought items

## Shopping Tips

- **Organize by categories** to make shopping more efficient
- **Use the cart view** to see what you've already bought
- **Set quantities** to avoid buying too much or too little
- **Clear purchased items** after shopping to keep your list clean

## Data Persistence

All grocery items are automatically saved to your browser's local storage, so your shopping list will persist between browser sessions.

## Browser Support

This app works in all modern browsers that support:
- ES6+ JavaScript
- CSS Grid and Flexbox
- Local Storage API
