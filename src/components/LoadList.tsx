import { Button, HStack, Select } from '@chakra-ui/react'
import { FC, useState } from 'react'
import { genId } from '../utils/id'
import { setAllItems } from '../utils/itemStore'

const options = ['miedot', 'drinkit', 'istumapaikat', 'alkoholittomat']

const LoadList: FC<{ onUpdate: () => void }> = ({ onUpdate }) => {
    const [selected, setSelected] = useState<string | undefined>(undefined)

    const onLoad = async () => {
        const data = (await fetch(`/${selected}.json`).then((res) => res.json())) as { [x: string]: number }
        const items = Object.entries(data).map(([name, amount]) => ({ id: genId(), name, amount }))
        setAllItems(items)
        onUpdate()
    }

    return (
        <HStack>
            <Select placeholder="Select list to load" onChange={(e) => setSelected(e.target.value)}>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </Select>
            <Button variant="outlin" colorScheme="gray" onClick={onLoad}>
                Load
            </Button>
        </HStack>
    )
}

export default LoadList
