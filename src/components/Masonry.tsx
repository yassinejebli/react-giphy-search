import React from "react";
import {
    CellMeasurer,
    CellMeasurerCache,
    createMasonryCellPositioner,
    MasonryCellProps,
    Masonry as RvMasonry
} from "react-virtualized";
import GifThumbnail from "./GifThumbnail";
import {GIFObject} from "giphy-api";

interface ItemWithSizesProps{
    item: GIFObject;
    size: {height: number, width: number};
}

export interface MasonryProps{
    itemsWithSizes: ItemWithSizesProps[];
    isLoading: boolean;
    hasNextPage: boolean;
}

export interface MasonryFunctions{
    loadMore: ()=>void;
    onClickItem: (selectedIndex: number)=>void;
}

const masonryWidth = 700;
const masonryHeight = window.innerHeight-120; // height 120 = search bar height + margins
const columnCount = 3;
// I think It's better to use AutoSizer component from RV to adjust column width/masonry height depending on width of container, but this will take me time
export const columnWidth = masonryWidth/columnCount;
export const defaultHeight = 250;
export const defaultWidth = columnWidth;

const cache = new CellMeasurerCache({
    defaultHeight,
    defaultWidth,
    fixedWidth: true
});

const cellPositionerConf = {
    columnCount,
    columnWidth,
    spacer: 10
};

const cellPositioner = createMasonryCellPositioner({
    cellMeasurerCache: cache,
    ...cellPositionerConf
});

const Masonry = ({itemsWithSizes, loadMore, hasNextPage, isLoading, onClickItem}:MasonryProps&MasonryFunctions) => {
    const masonryRef:any = React.useRef(null);

    //https://github.com/bvaughn/react-virtualized/blob/master/source/Masonry/Masonry.example.js
    //a workaround to recalculate cell positions whenever there are new data loaded
    React.useEffect(()=>{
        if(!isLoading){
            cellPositioner.reset({...cellPositionerConf});
            cache.clearAll();
            (masonryRef.current as RvMasonry).clearCellPositions();
        }
    }, [isLoading]);

    const cellRenderer = ({index, key, parent, style}: MasonryCellProps) => {
        if(!itemsWithSizes[index]) return null;
        const {item, size} = itemsWithSizes[index];
        const height = columnWidth * (size.height / size.width) || defaultHeight;

        return (
            <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
                <div style={style}>
                    <GifThumbnail
                        url={item.images.fixed_width_still.url}
                        style={{
                            height: height,
                            width: columnWidth,
                        }}
                        onClick={()=>onClickItem(index)}
                    />
                </div>
            </CellMeasurer>
        );
    };

    const onScrollHandler = ({scrollHeight, scrollTop, clientHeight}:
                                 { clientHeight: number; scrollHeight: number; scrollTop: number })=>{
        if(!isLoading&&hasNextPage&&scrollHeight===scrollTop+clientHeight){
            loadMore(); //dispatch load more action
        }
    };

    return (
        <RvMasonry
            ref={masonryRef}
            autoHeight={false}
            cellCount={itemsWithSizes.length}
            cellMeasurerCache={cache}
            cellPositioner={cellPositioner}
            cellRenderer={cellRenderer}
            height={masonryHeight}
            width={masonryWidth}
            onScroll={onScrollHandler}
        />
    );
};

export default Masonry;
