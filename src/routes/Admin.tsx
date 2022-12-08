import { Button, Heading, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Item from '../components/Item'
import { genId } from '../utils/id'
import { addItem, getAllItems, Item as IItem, setAllItems } from '../utils/itemStore'

const Admin = () => {
    const [items, setItems] = useState<IItem[]>(getAllItems())

    useEffect(() => {
        setAllItems(items)
    }, [items])

    const onAdd = () => {
        addItem({ id: genId(), name: '', amount: 0 })
        setItems(getAllItems())
    }

    return (
        <VStack width="full" p="2" spacing="3">
            <Heading>Admin</Heading>
            <Button variant="outline" colorScheme="cyan" w="full" onClick={onAdd}>
                Add Item
            </Button>
            {items.map((item) => (
                <Item key={item.id} {...item} onChange={() => setItems(getAllItems())} />
            ))}
        </VStack>
    )
}

export default Admin
