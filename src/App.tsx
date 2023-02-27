import React from 'react';
import styled from 'styled-components';
import {Canvas} from './Canvas';

function App() {
  return (
    <Container>
      <Box>
        <Canvas />
      </Box>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Box = styled.div`
  width: 800px;
  height: 800px;
  border: 3px solid black;
`;

export default App;
