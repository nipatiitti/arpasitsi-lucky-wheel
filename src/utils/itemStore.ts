export type Item = {
    id: string
    name: string
    amount: number
}

export const getAllItems = (): Item[] => {
    const items = localStorage.getItem('items')
    if (items) {
        return JSON.parse(items)
    }
    return []
}

export const setAllItems = (items: Item[]) => {
    localStorage.setItem('items', JSON.stringify(items))
}

export const addItem = (item: Item) => {
    const items = getAllItems()
    items.unshift(item)
    setAllItems(items)
}

export const removeItem = (id: string) => {
    const items = getAllItems()
    const filteredItems = items.filter((item) => item.id !== id)
    setAllItems(filteredItems)
}

export const updateItem = (updatedItem: Item) => {
    const items = getAllItems().map((item) => (item.id !== updatedItem.id ? item : updatedItem))
    setAllItems(items)
}

export const getItemById = (id: string) => {
    const items = getAllItems()
    return items.find((item) => item.id === id)
}
