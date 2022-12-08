import { Button, Center, HStack, VStack } from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import WheelPiece from '../components/WheelPiece'
import { getAllItems, Item as IItem } from '../utils/itemStore'
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
        const newSelection = Math.floor(Math.random() * flattedItems.length)
        setSelection(newSelection)
    }

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
                    size="lg"
                    colorScheme="cyan"
                    textTransform="uppercase"
                    fontSize="2xl"
                    onClick={handleSpin}
                >
                    Spin
                </Button>
            </Center>
        </HStack>
    )
}

export default Wheel
