import React from "react";
import styled from "styled-components";
import Modal from "./Modal";
import {useDispatch, useSelector} from "react-redux";
import {GiphySearchState} from "../reducers/giphySearchReducer";
import {theme} from '../theme/theme';
import {loadMoreGifs} from "../actions/giphySearchActions";
import useKeyPress from "../hooks/useKeyPress";

const {margin, fontWeight, fontSize} = theme;

interface GifSlideShowProps{
    gifIndex: number;
}

interface GifSlideShowFunctions{
    onClose: ()=>void;
}

const GifSlideShow = ({gifIndex, onClose}: GifSlideShowProps&GifSlideShowFunctions) => {
    const [currentGifIndex, setCurrentGifIndex] = React.useState(gifIndex);
    const {isLoading, gifList, meta:{total}} = useSelector<GiphySearchState, GiphySearchState>(state => state);
    const dispatch = useDispatch();
    const arrowLeftPressed = useKeyPress('ArrowLeft');
    const arrowRightPressed = useKeyPress('ArrowRight');
    const gifUrl = gifList?.[currentGifIndex]?.images?.fixed_width.url;

    React.useEffect(()=>{
        if(arrowLeftPressed)
            handlePrev();
        else if(arrowRightPressed)
            handleNext();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [arrowLeftPressed, arrowRightPressed]);


    const handlePrev = () => {
        if(currentGifIndex > 0)
            setCurrentGifIndex(_oldIndex => _oldIndex-1);
    };

    const handleNext = () => {
        if(currentGifIndex < total - 1){
            setCurrentGifIndex(_oldIndex=>_oldIndex+1);
            if(currentGifIndex === gifList.length - 1)
                dispatch(loadMoreGifs());
        }
    };

    return (
        <Modal>
            <Wrapper>
                <CloseButton onClick={onClose}>
                    X
                </CloseButton>
                {/*I would use an animated svg if I have time :D*/}
                {isLoading?'loading...':<img alt="gif-preview" src={gifUrl} width={360} />}
                <Bottom>
                    <Button onClick={handlePrev}>
                        {'<'}
                    </Button>
                    <div>
                        {currentGifIndex+1} / {total}
                    </div>
                    <Button onClick={handleNext}>
                        {'>'}
                    </Button>
                </Bottom>
            </Wrapper>
        </Modal>
    );
};

const Wrapper = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 2;
    top: 0;
    left:0;
    right:0;
    height: 100%;
    background-color: rgba(255,255,255,0.9);
`;

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Button = styled.div`
    display: flex;
    font-weight: ${fontWeight.bold};
    justify-content: center;
    align-items: center;
    width: 64px;
    height: 64px;
    cursor: pointer;
`;


const CloseButton = styled(Button)`
    position: absolute;
    top: ${margin.m};
    right: ${margin.m};
    font-size: ${fontSize.l};
`;

export default GifSlideShow;
