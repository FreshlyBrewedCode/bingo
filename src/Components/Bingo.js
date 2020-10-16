import React from 'react'
import styled from 'styled-components';

export default function Bingo({ title, words }) {

    const wordList = shuffle(words.split("\n"));
    const size = Math.ceil(Math.sqrt(wordList.length))
    const count = wordList.length;


    return (
        <div>
            <h1>{title}</h1>

            {[...Array(size).keys()].map(x => (
                <Row key={`row-${x}`}>
                    {[...Array(Math.min(x * size + size, count) - x * size).keys()].map(y => (
                        <>
                            <CellCheck type="checkbox" key={`cell-${x * size + y}i`} id={`cell-${x * size + y}`} />
                            <Cell htmlFor={`cell-${x * size + y}`} key={`cell-${x * size + y}l`}>{wordList[x * size + y]}</Cell>
                        </>
                    ))}
                </Row>
            ))}
        </div>
    )
}

const shuffle = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

const Row = styled.div`
    display: flex;
    flex-direction: row;
`

const Cell = styled.label`
    display: flex;
    width: 100px;
    height: 100px;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    user-select: none;
    cursor: pointer;
    
`

const CellCheck = styled.input`
    display: none;
    
    &:checked + label {
        background-color: #888888;
        text-decoration: line-through;
    }
`
