import { useState, useEffect } from 'react'
import GroceryList from './components/GroceryList'
import GroceryForm from './components/GroceryForm'
import GroceryStats from './components/GroceryStats'

function App() {
  const [groceries, setGroceries] = useState([])
  const [filter, setFilter] = useState('all') // 'all', 'needed', 'purchased'
  const [storageAvailable, setStorageAvailable] = useState(true)
  const [showCart, setShowCart] = useState(false)
  const [sortBy, setSortBy] = useState('category') // 'category', 'alphabetical'

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

  const addGrocery = (text, category = 'Other') => {
    if (text.trim()) {
      const newGrocery = {
        id: Date.now(),
        text: text.trim(),
        category: category,
        purchased: false,
        quantity: 1,
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
    console.log('🗑️ Clearing all groceries')
    setGroceries([])
    localStorage.removeItem('groceries')
  }

  const filteredGroceries = groceries.filter(grocery => {
    if (filter === 'needed') return !grocery.purchased
    if (filter === 'purchased') return grocery.purchased
    return true
  })

  const neededCount = groceries.filter(grocery => !grocery.purchased).length
  const purchasedCount = groceries.filter(grocery => grocery.purchased).length
  const totalItems = groceries.reduce((sum, grocery) => sum + grocery.quantity, 0)

  const categories = ['Produce', 'Dairy', 'Meat', 'Bakery', 'Pantry', 'Frozen', 'Beverages', 'Snacks', 'Other']

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              🛒 Grocery List
            </h1>
            <p className="text-gray-600">Your smart shopping companion</p>
          </div>
          
          {!storageAvailable && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              ⚠️ Local storage is not available. Your list will not persist between sessions.
            </div>
          )}
          
          <div className="mb-6 flex gap-2 flex-wrap justify-center">
            <button
              onClick={() => setShowCart(!showCart)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {showCart ? '📝 Show List' : '🛒 Show Cart'}
            </button>
            <button
              onClick={() => setSortBy(sortBy === 'category' ? 'alphabetical' : 'category')}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              {sortBy === 'category' ? '🔤 Sort A-Z' : '📂 Sort by Category'}
            </button>
            <button
              onClick={clearAllGroceries}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              🗑️ Clear All
            </button>
          </div>
          
          <GroceryForm onAddGrocery={addGrocery} categories={categories} />
          
          <GroceryStats 
            total={groceries.length}
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
            showCart={showCart}
            sortBy={sortBy}
          />
        </div>
      </div>
    </div>
  )
}

export default App
