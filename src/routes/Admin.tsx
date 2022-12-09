import { Button, Heading, HStack, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Item from '../components/Item'
import LoadList from '../components/LoadList'
import SetRemoveMode from '../components/SetRemoveMode'
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
            <HStack w="full" flexWrap="wrap" spacing="0" gap="2">
                <Button variant="outline" colorScheme="cyan" flex="1" onClick={onAdd}>
                    Add Item
                </Button>
                <Link to="/" style={{ flex: 1 }}>
                    <Button variant="outline" colorScheme="orange" w="full">
                        Back to wheel
                    </Button>
                </Link>
                <LoadList onUpdate={() => setItems(getAllItems())} />
                <SetRemoveMode />
            </HStack>
            {items.map((item) => (
                <Item key={item.id} {...item} onChange={() => setItems(getAllItems())} />
            ))}
        </VStack>
    )
}

export default Admin
