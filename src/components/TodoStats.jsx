function TodoStats({ total, active, completed, filter, onFilterChange, onClearCompleted }) {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="text-sm text-gray-600">
          <span className="font-medium">{active}</span> items left
        </div>
        
        {completed > 0 && (
          <button
            onClick={onClearCompleted}
            className="text-sm text-gray-500 hover:text-red-500 transition-colors"
          >
            Clear completed
          </button>
        )}
      </div>
      
      <div className="flex justify-center">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => onFilterChange('all')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              filter === 'all'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            All ({total})
          </button>
          <button
            onClick={() => onFilterChange('active')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              filter === 'active'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Active ({active})
          </button>
          <button
            onClick={() => onFilterChange('completed')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              filter === 'completed'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Completed ({completed})
          </button>
        </div>
      </div>
    </div>
  )
}

export default TodoStats 