import React from 'react'
import styled, { css } from 'styled-components'

export default function Edit() {
    return (
        <div>
            <h2>Edit</h2>
            <Container>
                <Label htmlFor="title">Title</Label>
                <TextInput id="title" name="t" type="text" />
                <Label htmlFor="words">Words</Label>
                <TextArea id="words" name="w" />
                <Button type="submit">Start</Button>
            </Container>
        </div>
    )
}

const Container = styled.form`
    display: flex;
    flex-direction: column;
`

const Label = styled.label`
    
`

const Input = css`
    
`

const TextInput = styled.input`
    ${Input}
`

const TextArea = styled.textarea`
    ${Input}
`

const Button = styled.button`
    margin: 1em 0;
`
