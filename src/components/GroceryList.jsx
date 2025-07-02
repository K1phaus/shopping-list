import GroceryItem from './GroceryItem'

function GroceryList({ groceries, onToggle, onDelete, onEdit, onUpdateQuantity, categories, showCart, sortBy }) {
  if (groceries.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 text-6xl mb-4">🛒</div>
        <p className="text-gray-500">Your grocery list is empty. Add some items above!</p>
      </div>
    )
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

  // Sort groceries based on sortBy
  const sortedGroceries = [...groceries].sort((a, b) => {
    if (sortBy === 'alphabetical') {
      return a.text.localeCompare(b.text)
    } else {
      // Sort by category first, then alphabetically within category
      const categoryA = categories.indexOf(a.category)
      const categoryB = categories.indexOf(b.category)
      if (categoryA !== categoryB) {
        return categoryA - categoryB
      }
      return a.text.localeCompare(b.text)
    }
  })

  if (showCart) {
    // Cart view - show only purchased items
    const purchasedItems = sortedGroceries.filter(grocery => grocery.purchased)
    
    if (purchasedItems.length === 0) {
      return (
        <div className="text-center py-8">
          <div className="text-gray-400 text-6xl mb-4">🛒</div>
          <p className="text-gray-500">No items in your cart yet. Start shopping!</p>
        </div>
      )
    }

    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">🛒 Shopping Cart</h2>
        <div className="space-y-2">
          {purchasedItems.map(grocery => (
            <GroceryItem
              key={grocery.id}
              grocery={grocery}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
              onUpdateQuantity={onUpdateQuantity}
              categories={categories}
              showCart={true}
              showCategoryIcon={sortBy === 'alphabetical'}
            />
          ))}
        </div>
      </div>
    )
  }

  // List view
  if (sortBy === 'category') {
    // Group groceries by category
    const groupedGroceries = sortedGroceries.reduce((groups, grocery) => {
      const category = grocery.category
      if (!groups[category]) {
        groups[category] = []
      }
      groups[category].push(grocery)
      return groups
    }, {})

    // Sort categories by the order they appear in the categories array
    const sortedCategories = categories.filter(cat => groupedGroceries[cat])

    return (
      <div className="space-y-6">
        {sortedCategories.map(category => (
          <div key={category} className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              {getCategoryEmoji(category)} {category}
              <span className="text-sm text-gray-500">
                ({groupedGroceries[category].length} items)
              </span>
            </h3>
            <div className="space-y-2">
              {groupedGroceries[category].map(grocery => (
                <GroceryItem
                  key={grocery.id}
                  grocery={grocery}
                  onToggle={onToggle}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  onUpdateQuantity={onUpdateQuantity}
                  categories={categories}
                  showCart={false}
                  showCategoryIcon={false}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  } else {
    // Alphabetical view - show all items in a single list with category icons
    return (
      <div className="space-y-2">
        {sortedGroceries.map(grocery => (
          <GroceryItem
            key={grocery.id}
            grocery={grocery}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            onUpdateQuantity={onUpdateQuantity}
            categories={categories}
            showCart={false}
            showCategoryIcon={true}
          />
        ))}
      </div>
    )
  }
}

export default GroceryList 