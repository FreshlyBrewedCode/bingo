import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components';

export default function Bingo({ title, words }) {

    const [wordList, setWordList] = useState([]);
    const [toggleList, setToggleList] = useState([]);
    const size = Math.ceil(Math.sqrt(wordList.length))
    const count = wordList.length;

    useEffect(() => {
        const wl = shuffle(words.split("\n"));
        setWordList(wl);
        setToggleList([...Array(wl.length).keys()].map(e => 0));
    }, [words]);

    const handleToggle = useCallback((index) => {
        let newToggleList = toggleList.map((t, ti) => Number(ti == index ? (toggleList[index] > 0 ? 0 : 1) : t > 0 ? 1 : 0));

        const check = (x, y) => {
            const index = y * size + x;
            return index >= newToggleList.length ? false : newToggleList[index] > 0;
        }

        const checkBingo = (start, step) => {
            let bingo = true;
            for (let i = 0; i < size; i++) {
                if (!check(start[0] + step[0] * i, start[1] + step[1] * i)) bingo = false;
            }
            return bingo;
        }

        const setBingo = (start, step) => {
            let bingo = true;
            for (let i = 0; i < size; i++) {
                const x = start[0] + step[0] * i;
                const y = start[1] + step[1] * i;
                const index = y * size + x;
                if (index <= newToggleList.length) {
                    newToggleList[index] = 2;
                }
            }
        }

        let isBingo = false;

        for (let i = 0; i < size; i++) {
            if (checkBingo([i, 0], [0, 1])) {
                setBingo([i, 0], [0, 1]);
                isBingo = true;
                break;
            }
            if (checkBingo([0, i], [1, 0])) {
                setBingo([0, i], [1, 0]);
                isBingo = true;
                break;
            }
        }

        // Check diagonals
        if (!isBingo) {
            if (checkBingo([0, 0], [1, 1])) {
                setBingo([0, 0], [1, 1]);
                isBingo = true;
            }
            else if (checkBingo([0, size - 1], [1, -1])) {
                setBingo([0, size - 1], [1, -1]);
                isBingo = true;
            }
        }


        setToggleList(newToggleList);
    }, [toggleList]);

    return (
        <div>
            <h1>{title}</h1>
            <BingoContainer size={size}>
                {wordList.map((w, i) => (
                    <>
                        {/* <CellCheck key={`cell-${i}i`} type="checkbox" id={`cell-${i}`} value={(toggleList[i] != 0)}
                            
                            
                        /> */}
                        <Cell size={size} index={Math.floor(i / size) + i} key={`cell-${i}l`}
                            onClick={(e) => handleToggle(i)}
                            toggle={toggleList[i]}
                        >
                            {w}
                        </Cell>
                    </>
                ))}
            </BingoContainer>
            <Toolbar>
                <ToolButton href={`/edit?t=${encodeURI(title)}&w=${encodeURI(words)}`}>Edit</ToolButton>
            </Toolbar>
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

const Toolbar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    flex-grow: 1;
`

const ToolButton = styled.a`
    justify-self: end;
`

const BingoContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(${p => p.size}, 1fr);
    grid-template-rows: repeat(${p => p.size}, 1fr);
    border-right: 1px solid #555555;
    border-bottom: 1px solid #555555;
    width: 80vw;
    height: 80vw;
`

const Cell = styled.label`
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    user-select: none;
    cursor: pointer;
    border-top: 1px solid #555555;
    border-left: 1px solid #555555;
    /* border: 1px solid #555555; */
    
    background-color: ${p => ["none", `#bbbbbb`, `lightgreen`][p.toggle]};
    text-decoration: ${p => p.toggle > 0 ? "line-through" : "none"};
`

const CellCheck = styled.input`
    display: none;
    
    &:checked + label {
        background-color: ${p => p.toggle ? `green` : `#bbbbbb`};
        text-decoration: line-through;
    }
`
