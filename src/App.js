import React from 'react';
import { useLocation, useSearchParam } from 'react-use';
import styled from 'styled-components';
import './App.css';
import Bingo from './Components/Bingo';
import Edit from './Components/Edit';

function App() {

  const title = useSearchParam("t");
  const words = useSearchParam("w");
  const edit = !title || !words;

  return (
    <Container className="App">
      {edit ?
        <Edit />
        :
        <Bingo {...{ title, words }} />
      }
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`

export default App;
