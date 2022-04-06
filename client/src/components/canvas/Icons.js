import { Image } from "react-konva";
import useImage from "use-image";
import Export from "../../images/export-icon.png";
import Save from "../../images/save-icon.png";
import TrashCan from "../../images/trash-can.png";

let log = console.log;

export const ExportIcon = ({
    x,
    y,
    width,
    height,
    handleExportCanvas,
    handleMouseEnter,
    handleMouseLeave,
}) => {
    const [image] = useImage(Export);
    return (
        <Image
            id="exporticon"
            image={image}
            x={x}
            y={y}
            width={width}
            height={height}
            onClick={handleExportCanvas}
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
