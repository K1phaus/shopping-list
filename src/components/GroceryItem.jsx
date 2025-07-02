import { useState, useRef, useEffect } from 'react'

function GroceryItem({ grocery, onToggle, onDelete, onEdit, onUpdateQuantity, categories, showCart, showCategoryIcon }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(grocery.text)
  const [editCategory, setEditCategory] = useState(grocery.category)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleEdit = () => {
    if (editText.trim() && (editText !== grocery.text || editCategory !== grocery.category)) {
      onEdit(grocery.id, editText, editCategory)
    } else {
      setEditText(grocery.text)
      setEditCategory(grocery.category)
    }
    setIsEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEdit()
    } else if (e.key === 'Escape') {
      setEditText(grocery.text)
      setEditCategory(grocery.category)
      setIsEditing(false)
    }
  }

  const handleDoubleClick = () => {
    setIsEditing(true)
  }

  const getCategoryEmoji = (cat) => {
    const emojis = {
      'Produce': '🥬',
      'Dairy': '🥛',
      'Meat': '🥩',
      'Bakery': '🍞',
      'Pantry': '🥫',
      'Frozen': '🧊',
      'Beverages': '🥤',
      'Snacks': '🍿',
      'Other': '📦'
    }
    return emojis[cat] || '📦'
  }

  return (
    <div className={`group flex items-center gap-3 p-4 rounded-lg transition-colors ${
      grocery.purchased 
        ? 'bg-green-50 border border-green-200' 
        : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
    }`}>
      <button
        onClick={() => onToggle(grocery.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-colors ${
          grocery.purchased
            ? 'bg-green-500 border-green-500 text-white'
            : 'border-gray-300 hover:border-green-400'
        }`}
      >
        {grocery.purchased && (
          <svg className="w-4 h-4 mx-auto" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={handleEdit}
              onKeyDown={handleKeyDown}
              className="flex-1 px-2 py-1 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <select
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              className="px-2 py-1 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {getCategoryEmoji(cat)} {cat}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span
              onDoubleClick={handleDoubleClick}
              className={`block cursor-pointer ${
                grocery.purchased
                  ? 'line-through text-gray-500'
                  : 'text-gray-800'
              }`}
            >
              {grocery.text}
            </span>
            {showCategoryIcon && (
              <span className="text-lg">
                {getCategoryEmoji(grocery.category)}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        {!showCart && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => onUpdateQuantity(grocery.id, grocery.quantity - 1)}
              className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 flex items-center justify-center text-sm font-bold"
            >
              -
            </button>
            <span className="w-8 text-center text-sm font-medium">
              {grocery.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(grocery.id, grocery.quantity + 1)}
              className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 flex items-center justify-center text-sm font-bold"
            >
              +
            </button>
          </div>
        )}

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 text-gray-400 hover:text-green-500 transition-colors"
            title="Edit"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          
          <button
            onClick={() => onDelete(grocery.id)}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
            title="Delete"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default GroceryItem 