import { useState } from 'react'

function GroceryForm({ onAddGrocery, categories, categoryIcons }) {
  const [text, setText] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(categories.slice().sort()[0] || 'Other')
  const [quantity, setQuantity] = useState(1)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim()) {
      onAddGrocery(text, selectedCategory, quantity)
      setText('')
      setQuantity(1)
      setSelectedCategory(categories.slice().sort()[0] || 'Other')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="space-y-4">
        {/* Item input and quantity */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What do you need to buy?"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-600 flex items-center justify-center text-lg font-bold transition-colors"
            >
              -
            </button>
            <span className="w-12 text-center text-lg font-medium px-2">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-600 flex items-center justify-center text-lg font-bold transition-colors"
            >
              +
            </button>
          </div>
          
          <button
            type="submit"
            disabled={!text.trim()}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Add Item
          </button>
        </div>

        {/* Category selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Select Category:
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {categories.slice().sort().map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`p-2 w-16 h-16 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-1 justify-center ${
                  selectedCategory === cat
                    ? 'border-green-500 bg-green-50 text-green-700 shadow-md scale-105'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 text-gray-600 hover:text-gray-800'
                }`}
              >
                <span className="text-2xl">{categoryIcons[cat] || '📦'}</span>
                <span className="text-xs font-medium">{cat}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </form>
  )
}

export default GroceryForm 