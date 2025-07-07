import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import GroceryList from './components/GroceryList'
import GroceryForm from './components/GroceryForm'
import GroceryStats from './components/GroceryStats'

const GROCERY_CATEGORIES = [
  { name: 'Produce', icon: '🥬' },
  { name: 'Dairy', icon: '🥛' },
  { name: 'Meat', icon: '🥩' },
  { name: 'Bakery', icon: '🍞' },
  { name: 'Pantry', icon: '🥫' },
  { name: 'Frozen', icon: '🧊' },
  { name: 'Beverages', icon: '🥤' },
  { name: 'Snacks', icon: '🍿' },
  { name: 'Other', icon: '📦' },
]

const HOME_IMPROVEMENT_CATEGORIES = [
  { name: 'Lumber', icon: '🪵' },
  { name: 'Paint', icon: '🎨' },
  { name: 'Tools', icon: '🛠️' },
  { name: 'Electrical', icon: '💡' },
  { name: 'Plumbing', icon: '🚰' },
  { name: 'Hardware', icon: '🔩' },
  { name: 'Garden', icon: '🌱' },
  { name: 'Flooring', icon: '🧱' },
  { name: 'Lighting', icon: '🔆' },
  { name: 'Other', icon: '📦' },
]

function App() {
  const [groceries, setGroceries] = useState([])
  const [filter, setFilter] = useState('all') // 'all', 'needed', 'purchased'
  const [storageAvailable, setStorageAvailable] = useState(true)
  const [showCart, setShowCart] = useState(false)
  const [sortBy, setSortBy] = useState('category') // 'category', 'alphabetical'
  const [mode, setMode] = useState(null) // null until user selects, then 'grocery' or 'home'

  // Pick categories based on mode
  const categories = mode === 'grocery' ? GROCERY_CATEGORIES.map(c => c.name) : HOME_IMPROVEMENT_CATEGORIES.map(c => c.name)
  const categoryIcons = Object.fromEntries(
    (mode === 'grocery' ? GROCERY_CATEGORIES : HOME_IMPROVEMENT_CATEGORIES).map(c => [c.name, c.icon])
  )

  // Function to trigger confetti celebration
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
  }

  // Check if all items in current mode are completed
  useEffect(() => {
    const currentModeCategories = mode === 'grocery' ? GROCERY_CATEGORIES.map(c => c.name) : HOME_IMPROVEMENT_CATEGORIES.map(c => c.name)
    const currentModeItems = groceries.filter(grocery => currentModeCategories.includes(grocery.category))
    
    if (currentModeItems.length > 0 && currentModeItems.every(item => item.purchased)) {
      triggerConfetti()
    }
  }, [groceries, mode])

  // Check if localStorage is available
  useEffect(() => {
    try {
      const test = '__localStorage_test__'
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      setStorageAvailable(true)
      console.log('✅ localStorage is available')
    } catch (e) {
      console.error('❌ localStorage is not available:', e)
      setStorageAvailable(false)
    }
  }, [])

  // Load groceries from localStorage on component mount
  useEffect(() => {
    if (!storageAvailable) return
    
    try {
      const savedGroceries = localStorage.getItem('groceries')
      console.log('📥 Loading groceries from localStorage:', savedGroceries)
      if (savedGroceries) {
        const parsedGroceries = JSON.parse(savedGroceries)
        console.log('📥 Parsed groceries:', parsedGroceries)
        setGroceries(parsedGroceries)
      } else {
        console.log('📥 No saved groceries found in localStorage')
      }
    } catch (error) {
      console.error('❌ Error loading groceries from localStorage:', error)
    }
  }, [storageAvailable])

  // Save groceries to localStorage whenever groceries change
  useEffect(() => {
    if (!storageAvailable) return
    
    try {
      console.log('💾 Saving groceries to localStorage. Current groceries:', groceries)
      console.log('💾 Groceries length:', groceries.length)
      
      if (groceries.length > 0) {
        localStorage.setItem('groceries', JSON.stringify(groceries))
        console.log('✅ Successfully saved groceries to localStorage')
      } else {
        console.log('⚠️ Groceries array is empty, not saving to localStorage')
      }
    } catch (error) {
      console.error('❌ Error saving groceries to localStorage:', error)
    }
  }, [groceries, storageAvailable])

  const addGrocery = (text, category = 'Other', quantity = 1) => {
    if (text.trim()) {
      const newGrocery = {
        id: Date.now(),
        text: text.trim(),
        category: category,
        purchased: false,
        quantity: quantity,
        createdAt: new Date().toISOString()
      }
      console.log('➕ Adding new grocery:', newGrocery)
      setGroceries(prevGroceries => {
        const updatedGroceries = [newGrocery, ...prevGroceries]
        console.log('➕ Updated groceries array:', updatedGroceries)
        return updatedGroceries
      })
    }
  }

  const toggleGrocery = (id) => {
    console.log('🛒 Toggling grocery purchase status:', id)
    setGroceries(prevGroceries => {
      const updatedGroceries = prevGroceries.map(grocery =>
        grocery.id === id ? { ...grocery, purchased: !grocery.purchased } : grocery
      )
      console.log('🛒 Updated groceries after toggle:', updatedGroceries)
      return updatedGroceries
    })
  }

  const deleteGrocery = (id) => {
    console.log('🗑️ Deleting grocery:', id)
    setGroceries(prevGroceries => {
      const updatedGroceries = prevGroceries.filter(grocery => grocery.id !== id)
      console.log('🗑️ Updated groceries after delete:', updatedGroceries)
      return updatedGroceries
    })
  }

  const editGrocery = (id, newText, newCategory) => {
    if (newText.trim()) {
      console.log('✏️ Editing grocery:', id, 'to:', newText, 'category:', newCategory)
      setGroceries(prevGroceries => {
        const updatedGroceries = prevGroceries.map(grocery =>
          grocery.id === id ? { ...grocery, text: newText.trim(), category: newCategory } : grocery
        )
        console.log('✏️ Updated groceries after edit:', updatedGroceries)
        return updatedGroceries
      })
    }
  }

  const updateQuantity = (id, quantity) => {
    console.log('📊 Updating quantity for grocery:', id, 'to:', quantity)
    setGroceries(prevGroceries => {
      const updatedGroceries = prevGroceries.map(grocery =>
        grocery.id === id ? { ...grocery, quantity: Math.max(1, quantity) } : grocery
      )
      console.log('📊 Updated groceries after quantity change:', updatedGroceries)
      return updatedGroceries
    })
  }

  const clearPurchased = () => {
    console.log('🧹 Clearing purchased groceries')
    setGroceries(prevGroceries => {
      const updatedGroceries = prevGroceries.filter(grocery => !grocery.purchased)
      console.log('🧹 Updated groceries after clear purchased:', updatedGroceries)
      return updatedGroceries
    })
  }

  const clearAllGroceries = () => {
    console.log('🗑️ Clearing all groceries for current mode:', mode)
    setGroceries(prevGroceries => {
      // Only keep items that don't belong to the current mode's categories
      const currentModeCategories = mode === 'grocery' ? GROCERY_CATEGORIES.map(c => c.name) : HOME_IMPROVEMENT_CATEGORIES.map(c => c.name)
      const updatedGroceries = prevGroceries.filter(grocery => !currentModeCategories.includes(grocery.category))
      console.log('🗑️ Updated groceries after clear all for mode:', updatedGroceries)
      return updatedGroceries
    })
  }

  const filteredGroceries = groceries.filter(grocery => {
    // Always filter by current mode
    const currentModeCategories = mode === 'grocery' ? GROCERY_CATEGORIES.map(c => c.name) : HOME_IMPROVEMENT_CATEGORIES.map(c => c.name)
    if (!currentModeCategories.includes(grocery.category)) return false;

    // Then apply the purchase filter
    if (filter === 'needed') return !grocery.purchased
    if (filter === 'purchased') return grocery.purchased
    return true
  })

  const neededCount = groceries.filter(grocery => {
    const isNeeded = !grocery.purchased
    const currentModeCategories = mode === 'grocery' ? GROCERY_CATEGORIES.map(c => c.name) : HOME_IMPROVEMENT_CATEGORIES.map(c => c.name)
    return isNeeded && currentModeCategories.includes(grocery.category)
  }).length
  
  const purchasedCount = groceries.filter(grocery => {
    const isPurchased = grocery.purchased
    const currentModeCategories = mode === 'grocery' ? GROCERY_CATEGORIES.map(c => c.name) : HOME_IMPROVEMENT_CATEGORIES.map(c => c.name)
    return isPurchased && currentModeCategories.includes(grocery.category)
  }).length
  
  const totalItems = groceries.reduce((sum, grocery) => {
    const currentModeCategories = mode === 'grocery' ? GROCERY_CATEGORIES.map(c => c.name) : HOME_IMPROVEMENT_CATEGORIES.map(c => c.name)
    return currentModeCategories.includes(grocery.category) ? sum + grocery.quantity : sum
  }, 0)

  // Calculate the number of items in the current mode for the All Items filter
  const currentModeCategories = mode === 'grocery' ? GROCERY_CATEGORIES.map(c => c.name) : HOME_IMPROVEMENT_CATEGORIES.map(c => c.name)
  const totalInCurrentMode = groceries.filter(grocery => currentModeCategories.includes(grocery.category)).length

  // Mode selection prompt
  if (!mode) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-blue-100">
        <div className="bg-white rounded-lg shadow-xl p-8 flex flex-col items-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">My Shopping Lists</h1>
          <p className="mb-4 text-gray-600 text-lg">Choose a list type to get started:</p>
          <div className="flex gap-8">
            <button
              className="flex flex-col items-center px-8 py-6 bg-green-100 hover:bg-green-200 rounded-lg shadow transition-all focus:outline-none focus:ring-2 focus:ring-green-400"
              onClick={() => setMode('grocery')}
              title="Grocery List"
            >
              <span className="text-6xl mb-2">🛒</span>
              <span className="text-lg font-semibold text-gray-700">Grocery</span>
            </button>
            <button
              className="flex flex-col items-center px-8 py-6 bg-yellow-100 hover:bg-yellow-200 rounded-lg shadow transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400"
              onClick={() => setMode('home')}
              title="Home Improvement List"
            >
              <span className="text-6xl mb-2">🏠</span>
              <span className="text-lg font-semibold text-gray-700">Home Improvement</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="text-center sm:text-left">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                My Shopping Lists
              </h1>
              <p className="text-gray-600">
                {mode === 'grocery' ? 'Grocery List' : 'Home Improvement List'}
              </p>
            </div>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => setMode(mode === 'grocery' ? 'home' : 'grocery')}
                className="w-12 h-12 bg-yellow-400 text-gray-900 rounded-full font-semibold shadow hover:bg-yellow-500 transition-colors flex items-center justify-center text-xl"
                title={mode === 'grocery' ? 'Switch to Home Improvement' : 'Switch to Grocery List'}
              >
                {mode === 'grocery' ? '🏠' : '🛒'}
              </button>
            </div>
          </div>
          
          {!storageAvailable && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              ⚠️ Local storage is not available. Your list will not persist between sessions.
            </div>
          )}
          
          <div className="mb-6 flex gap-2 flex-wrap justify-center">
            <button
              onClick={() => setShowCart(!showCart)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-lg border-b-4 border-blue-700 hover:border-b-2 hover:translate-y-0.5 active:border-b-0 active:translate-y-1"
            >
              {showCart ? '📝 Show List' : '🛒 Show Cart'}
            </button>
            <button
              onClick={() => setSortBy(sortBy === 'category' ? 'alphabetical' : 'category')}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors shadow-lg border-b-4 border-purple-700 hover:border-b-2 hover:translate-y-0.5 active:border-b-0 active:translate-y-1"
            >
              {sortBy === 'category' ? '🔤 Sort A-Z' : '📂 Sort by Category'}
            </button>
            <button
              onClick={clearAllGroceries}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg border-b-4 border-red-700 hover:border-b-2 hover:translate-y-0.5 active:border-b-0 active:translate-y-1"
            >
              🗑️ Clear All
            </button>
          </div>
          
          <GroceryForm onAddGrocery={addGrocery} categories={categories} categoryIcons={categoryIcons} />
          
          <GroceryStats 
            total={totalInCurrentMode}
            needed={neededCount}
            purchased={purchasedCount}
            totalItems={totalItems}
            filter={filter}
            onFilterChange={setFilter}
            onClearPurchased={clearPurchased}
          />
          
          <GroceryList 
            groceries={filteredGroceries}
            onToggle={toggleGrocery}
            onDelete={deleteGrocery}
            onEdit={editGrocery}
            onUpdateQuantity={updateQuantity}
            categories={categories}
            categoryIcons={categoryIcons}
            showCart={showCart}
            sortBy={sortBy}
          />
        </div>
      </div>
    </div>
  )
}

export default App
