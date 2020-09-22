import React from "react";
import styled from "styled-components";

interface GifThumbnailProps{
    url: string;
}

type AllProps = GifThumbnailProps&React.HTMLAttributes<HTMLImageElement>;

const GifThumbnail = ({url, ...props}: AllProps) => {
    return (
        <Thumbnail
            src={url}
            {...props}
            alt="preview"
        />
    );
};

const Thumbnail = styled.img`
    cursor:pointer;
`;

export default GifThumbnail;
