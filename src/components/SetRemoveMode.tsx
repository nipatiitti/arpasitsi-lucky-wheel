import { FormControl, FormLabel, Switch } from '@chakra-ui/react'
import { ChangeEventHandler, useState } from 'react'

const SetRemoveMode = () => {
    const [removeMode, setRemoveMode] = useState(localStorage.getItem('removeMode') === 'true')

    const onToggle: ChangeEventHandler<HTMLInputElement> = (e) => {
        localStorage.setItem('removeMode', e.target.checked.toString())
        setRemoveMode(e.target.checked)
    }

    return (
        <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="remove-item" mb="0">
                Remove item after spin
            </FormLabel>
            <Switch id="remove-item" isChecked={removeMode} onChange={onToggle} />
        </FormControl>
    )
}

export default SetRemoveMode
