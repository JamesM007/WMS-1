import { Image } from "react-konva";
import useImage from "use-image";
import Save from "../../images/save.png";
import TrashCan from "../../images/trash-can.png";

let log = console.log;

export const SaveIcon = ({
    x,
    y,
    width,
    height,
    handleSaveCanvas,
    handleMouseEnter,
    handleMouseLeave,
}) => {
    const [image] = useImage(Save);
    return (
        <Image
            id="saveicon"
            image={image}
            x={x}
            y={y}
            width={width}
            height={height}
            onClick={handleSaveCanvas}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        />
    );
};

export const TrashCanIcon = ({
    x,
    y,
    width,
    height,
    handleClearCanvas,
    handleMouseEnter,
    handleMouseLeave,
}) => {
    const [image] = useImage(TrashCan);
    return (
        <Image
            id="trashicon"
            image={image}
            x={x}
            y={y}
            width={width}
            height={height}
            onClick={handleClearCanvas}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        />
    );
};
