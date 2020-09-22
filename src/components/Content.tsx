import React from "react";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import GifList from "./GifList";

const Content = () => {

    return (
        <Wrapper>
            <SearchBar />
            <GifList/>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
`;

export default Content;
