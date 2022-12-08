import { Button, Editable, EditableInput, EditablePreview, HStack } from '@chakra-ui/react'
import { FC } from 'react'
import { Item as IItem, removeItem, updateItem } from '../utils/itemStore'

const Item: FC<IItem & { onChange: () => void }> = ({ onChange, ...item }) => {
    const handleChange = (item: IItem) => {
        updateItem(item)
        onChange()
    }

    const handleRemove = () => {
        removeItem(item.id)
        onChange()
    }

    return (
        <HStack w="full" border="1px" borderRadius="lg" p="1">
            <Editable
                onSubmit={(name) => handleChange({ ...item, name })}
                flex="1"
                border="1px"
                borderRadius="lg"
                borderColor="gray.700"
                p="1"
                defaultValue={item.name}
            >
                <EditablePreview w="full" />
                <EditableInput />
            </Editable>
            <Editable
                border="1px"
                borderRadius="lg"
                borderColor="gray.700"
                p="1"
                defaultValue={item.amount.toString()}
                onSubmit={(amount) => handleChange({ ...item, amount: parseInt(amount) })}
                w="5rem"
                textAlign="center"
            >
                <EditablePreview w="full" />
                <EditableInput type="number" />
            </Editable>
            <Button variant="outline" colorScheme="orange" onClick={handleRemove}>
                Remove
            </Button>
        </HStack>
    )
}

export default Item
