function GroceryStats({ total, needed, purchased, totalItems, filter, onFilterChange, onClearPurchased }) {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex gap-4 text-sm">
          <div className="text-gray-600">
            <span className="font-medium">{needed}</span> items needed
          </div>
          <div className="text-green-600">
            <span className="font-medium">{purchased}</span> purchased
          </div>
          <div className="text-blue-600">
            <span className="font-medium">{totalItems}</span> total items
          </div>
        </div>
        
        {purchased > 0 && (
          <button
            onClick={onClearPurchased}
            className="text-sm text-gray-500 hover:text-green-600 transition-colors"
          >
            Clear purchased items
          </button>
        )}
      </div>
      
      <div className="flex justify-center">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => onFilterChange('all')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              filter === 'all'
                ? 'bg-white text-green-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            All Items ({total})
          </button>
          <button
            onClick={() => onFilterChange('needed')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              filter === 'needed'
                ? 'bg-white text-green-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Still Needed ({needed})
          </button>
          <button
            onClick={() => onFilterChange('purchased')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              filter === 'purchased'
                ? 'bg-white text-green-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Purchased ({purchased})
          </button>
        </div>
      </div>
    </div>
  )
}

export default GroceryStats 