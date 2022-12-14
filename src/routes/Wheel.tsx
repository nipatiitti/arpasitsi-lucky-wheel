import { Button, Center, HStack, VStack } from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import WheelPiece from '../components/WheelPiece'
import { getAllItems, Item as IItem, setAllItems } from '../utils/itemStore'
import { shuffleArray } from '../utils/suffle'

import styles from './wheel.module.css'

const Wheel = () => {
    const [items, setItems] = useState<IItem[]>(getAllItems())
    const [selection, setSelection] = useState<number | null>(null)

    const flattedItems = useMemo(() => {
        const newItems = items.flatMap((item) =>
            Array.from({ length: item.amount }, (_, i) => ({
                ...item,
                id: `${item.id}-${i}`,
            }))
        )

        shuffleArray(newItems)
        return newItems
    }, [items])

    const handleSpin = () => {
        let newSelection = Math.floor(Math.random() * flattedItems.length)

        if (flattedItems.length > 1) {
            while (newSelection === selection) {
                newSelection = Math.floor(Math.random() * flattedItems.length)
            }
        }

        if (localStorage.getItem('removeMode') === 'true' && selection) removeHit(selection)

        setSelection(newSelection)
    }

    const removeHit = (index: number) => {
        const item = flattedItems[index]
        if (!item) return

        const originalId = item.id.split('-')[0]
        const newItems = items.map((item) => {
            if (item.id === originalId) {
                return { ...item, amount: item.amount - 1 }
            }
            return item
        })
        setAllItems(newItems)
        setItems(newItems)
    }

    if (!flattedItems.length) return <Navigate to="/admin" />

    return (
        <HStack w="100vw" h="100vh" overflow="hidden" pos="relative" justify="flex-end">
            <VStack spacing="40px" css={{ '--index': selection || 0 }} className={styles.container}>
                {flattedItems.map((item, i) => (
                    <WheelPiece key={item.id} {...item} selected={i === selection} />
                ))}
            </VStack>
            <Center bg="chakra-body-bg" h="full" p="8">
                <Button
                    p="8"
                    variant="outline"
                    size={['sm', 'md', 'lg']}
                    colorScheme="cyan"
                    textTransform="uppercase"
                    fontSize="2xl"
                    onClick={handleSpin}
                >
                    Spin
                </Button>
                <Link to="/admin" style={{ position: 'absolute', top: 0, opacity: 0.2 }}>
                    Admin
                </Link>
            </Center>
        </HStack>
    )
}

export default Wheel
