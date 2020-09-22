import React from "react";
import { Provider } from "react-redux";
import {store} from "./store/store";
import GlobalStyle from "./theme/theme";
import styled from "styled-components";
import Content from "./components/Content";

const App = () => {
  return (
      <Provider store={store}>
        <GlobalStyle/>
        <Container>
          <Content/>
        </Container>
      </Provider>
  );
};

const Container = styled.div`
   max-width: 700px;
   margin: 24px auto;
   display: flex;
`;

export default App;
