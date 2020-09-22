import React from "react";
import styled from "styled-components";
import {theme} from "../theme/theme";
import {useDispatch} from "react-redux";
import {filterGifs} from "../actions/giphySearchActions";
import useDebounce from "../hooks/useDebounce";

const {padding, fontWeight, fontSize, color} = theme;

const SearchBar = () => {
    const dispatch = useDispatch();
    const [searchText, setSearchText] = React.useState('');
    const debouncedSearchText: string = useDebounce(searchText, 500);

    React.useEffect(()=> {
        if (debouncedSearchText)
            dispatch(
                filterGifs(debouncedSearchText)
            );
    }, [debouncedSearchText, dispatch]);

    const onSearchTextChange = ({target: {value}}: React.ChangeEvent<HTMLInputElement>) => setSearchText(value);

    return (
        <StyledInput
            placeholder="Search..."
            value={searchText}
            onChange={onSearchTextChange}
        />
    );
};

const StyledInput = styled.input`
    width: 100%;
    height: 50px;
    border: 0;
    box-shadow: 0 0 1px ${color.lightGray};
    font-size: ${fontSize.l};
    padding: ${padding.m} 10px;
    font-weight: ${fontWeight.medium};
    margin-bottom: 10px;
    outline-width: 0;
    box-sizing: border-box;
    
    &::placeholder {
      color: ${color.lightGray};
    }
`;


export default SearchBar;
