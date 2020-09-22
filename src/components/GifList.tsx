import React from "react";
import styled from "styled-components";
import {theme} from "../theme/theme";
import {useDispatch, useSelector} from "react-redux";
import {GiphySearchState} from "../reducers/giphySearchReducer";
import {loadMoreGifs, loadTrendingGifs} from "../actions/giphySearchActions";
import {GIFObject} from "giphy-api";
// @ts-ignore // TODO: Fix typing, I should define a custom type in a d.ts module since there is no @types/react-virtualized-image-measurer in the npm registry
import ImageMeasurer from "react-virtualized-image-measurer";
import Masonry, {defaultHeight, defaultWidth, MasonryProps} from "./Masonry";
import GifSlideShow from "./GifSlideShow";

const {margin} = theme;

const GifList = () => {
    const dispatch = useDispatch();
    const {isLoading, error, gifList, meta:{total}} = useSelector<GiphySearchState, GiphySearchState>(state => state);
    const [selectedGifIndex, setSelectedGifIndex] = React.useState(-1);

    React.useEffect(()=>{
        //maybe I should move this code to App component to load top gifs (first time load)
        dispatch(
            loadTrendingGifs()
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (error)
        return <CenterText>
            Oops! Something went wrong, check console
        </CenterText>;

    return (
        <>
            {selectedGifIndex!==-1&&<GifSlideShow
                onClose={()=>setSelectedGifIndex(-1)}
                gifIndex={selectedGifIndex}
            />}
            <Wrapper>
                <ImageMeasurer
                    items={gifList}
                    image={(gif: GIFObject) => gif.images.preview_gif.url}
                    defaultHeight={defaultHeight}
                    defaultWidth={defaultWidth}>
                    {({itemsWithSizes}: MasonryProps) =>
                        <Masonry
                            isLoading={isLoading}
                            hasNextPage={gifList.length<total}
                            loadMore={() => {
                                dispatch(loadMoreGifs())
                            }}
                            onClickItem={(selectedIndex)=>setSelectedGifIndex(selectedIndex)}
                            itemsWithSizes={itemsWithSizes}
                        />
                    }
                </ImageMeasurer>
            </Wrapper>
        </>
    );
};

const Wrapper = styled.div`
    margin-top: ${margin.l};
`;

const CenterText = styled.div`
    color: white;
    margin: 100px;
    display: flex;
    justify-content: center;
`;

export default GifList;
