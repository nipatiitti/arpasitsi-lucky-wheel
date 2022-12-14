import { Center, Heading } from '@chakra-ui/react'
import { FC } from 'react'
import { Item } from '../utils/itemStore'

const WheelPiece: FC<Item & { selected: boolean }> = ({ name, id, selected }) => (
    <Center
        w="full"
        id={id}
        border="2px"
        borderRadius="lg"
        borderColor="white"
        bg="gray.900"
        padding={selected ? '2' : '1'}
        transition="transform 0.5s cubic-bezier(1, 0.01, 0.57, 0.94)"
        transitionDelay="3s"
        height="var(--children-height)"
        transform={['none', 'none', selected ? 'scale(1.3)' : 'scale(1)']}
        zIndex={selected ? 1 : 0}
        boxShadow={selected ? '0 0 20px 5px #70707050' : 'none'}
        opacity={selected ? 1 : 0.5}
    >
        <Heading>{name}</Heading>
    </Center>
)

export default WheelPiece
