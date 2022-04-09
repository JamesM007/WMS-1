import { Stage, Layer, Rect, Text, Line, Image } from "react-konva";
import { useState, useRef, useEffect } from "react";

import { onSaveObjects } from "../api/objects";
import Layout from "../components/Layout";
import Rectangle from "../components/canvas/Rectangle";
import { SaveIcon, ExportIcon, TrashCanIcon } from "../components/canvas/Icons";
import { Toast, generateID } from "../components/canvas/Helpers";

import ChargingStation from "../images/charging-station.png";
import Conveyer from "../images/conveyer.png";
import DockDoors from "../images/dock-doors.png";
import Office from "../images/office.png";
import OutboundArea from "../images/outbound-area.png";
import StagingArea from "../images/staging-area.png";
import useImage from "use-image";

// Create objects-nav warehouse objects
const navWarehouseObjects = [
    {
        id: generateID("storageRack"),
        x: 30,
        y: 220,
        width: 189,
        height: 60,
        fill: "#343d83",
        shadowOffsetX: 2,
        shadowOffsetY: 2,
        shadowColor: "#b6b7b6",
        shadowBlur: 2,
    },
    {
        id: generateID("pickingBin"),
        x: 30,
        y: 320,
        width: 189,
        height: 60,
        fill: "#f24c73",
        shadowOffsetX: 2,
        shadowOffsetY: 2,
        shadowColor: "#f24c73",
        shadowBlur: 2,
    },
    {
        id: generateID("wall"),
        x: 30,
        y: 421,
        width: 189,
        height: 20,
        fill: "#000000",
        shadowOffsetX: 2,
        shadowOffsetY: 2,
        shadowColor: "#000000",
        shadowBlur: 2,
    },
    {
        id: generateID("pedestrianWalkway"),
        x: 30,
        y: 482,
        width: 189,
        height: 35,
        fill: "#39aea9",
        shadowOffsetX: 2,
        shadowOffsetY: 2,
        shadowColor: "#39aea9",
        shadowBlur: 2,
    },
    {
        id: generateID("forkliftPathway"),
        x: 30,
        y: 560,
        width: 189,
        height: 35,
        fill: "#feda3d",
        shadowOffsetX: 2,
        shadowOffsetY: 2,
        shadowColor: "#feda3d",
        stroke: "#f24b73",
        shadowBlur: 2,
    },
];

const handleMouseEnter = (e) => {
    const container = e.target.getStage().container();
    container.style.cursor = "pointer";
};

const handleMouseLeave = (e) => {
    const container = e.target.getStage().container();
    container.style.cursor = "default";
};

const handleMouseDown = (e) => {
    const container = e.target.getStage().container();
    container.style.cursor = "move";
};

const Designer = () => {
    let log = console.log;

    // TODO: modify warehouseOjbects state to account for type [rect or images]
    // TODO: warehouseObjects state for rect: must have fill color
    // TODO: warehouseObjects state for images: must have image location path
    const [warehouseObjects, setWarehouseObjects] = useState([]);
    const [selectedId, selectShape] = useState(null);
    const [background, setBackground] = useState(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        // Based on if the background is set, the trigger to save the canvas as an image
        // has been called. UseEffect because handleSaveCanvas changing state cannot be acted
        // upon as of yet.
        if (background) {
            const URI = canvasRef.current.toDataURL();
            var link = document.createElement("a");
            const filename = "warehouse-designer.png";

            link.download = filename;
            link.href = URI;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setBackground(false);
        }
    }, [background]);

    // Trash can icon click event handler -> remove all objects in objects-canvas
    const handleClearCanvas = (e) => {
        console.log("handleClearCanvas() clicked");
        let layer = e.target.getStage().getLayers()[2]; // capture the objects-canvas layer
        layer.removeChildren();

        // create toast to update user
        Toast("Canvas Cleared.");
    };

    // Handle saving the canvas state to the database
    function saveData(){
        const saveThis = {id: 0,
            type: "",
            x: 1,
            y: 1,
            width: 1,
            height: 1,
            image: "",
            fill: "",  
        };
            warehouseObjects.map(function(obj){
                if (obj.id.includes("storageRack")){
                    saveThis.type = "storageRack";
                    saveThis.image = "storageRack";
                }
                else if (obj.id.includes("pickingBin")){
                    saveThis.type = "pickingBin";
                    saveThis.image = "pickingBin";
                }
                else if (obj.id.includes("wall")){
                    saveThis.type = "wall";
                    saveThis.image = "wall";
                }
                else if (obj.id.includes("pedestrianWalkway")){
                    saveThis.type = "pedestrianWalkway";
                    saveThis.image = "pedestrianWalkway";
                }
                else if (obj.id.includes("forkliftPathway")){
                    saveThis.type = "forkliftPathway";
                    saveThis.image = "forkliftPathway";
                }
                saveThis.id = obj.id;
                saveThis.x = obj.x;
                saveThis.y = obj.y;
                saveThis.width = obj.width;
                saveThis.height = obj.height;
                saveThis.fill = obj.fill;
                onSaveObjects(saveThis);
            });
    
    
       };
    const handleSaveCanvas = (e) => {
        console.log("handleSaveCanvas() clicked");
        saveData();
    };

    // Handle exporting the canvas state to an image (warehouse-designer.png)
    const handleExportCanvas = (e) => {
        console.log("handleExportCanvas() clicked");
        setBackground(true);

        Toast("Exported canavas as image.");
    };

    // Find out which node is clicked and select if background is clicked (clickedEmpty)
    const checkDeselect = (e) => {
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            selectShape(null);
        }
    };

    /**
     * Method to create various objects on the objects-canvas
     * based on the current object type being clicked
     *
     * @param e -> get the current object being clicked
     */
    const createWarehouseObject = (e) => {
        let object = e.target.attrs.id;
        let isStorageRackObject = !!object.includes("storageRack");
        let isPickingBinObject = !!object.includes("pickingBin");
        let isWallObject = !!object.includes("wall");
        let isPedestrianWalkwayObject = !!object.includes("pedestrianWalkway");
        let isForkliftPathwayObject = !!object.includes("forkliftPathway");

        let newObject = {
            width: 200,
            height: 85,
        };

        let randomXCoordinate = Math.floor(
            Math.random() * (1300 - 270 + 1) + 270
        );
        let randomYCoordinate = Math.floor(
            Math.random() * (1000 - 200 + 1) + 200
        );

        if (isStorageRackObject) {
            setWarehouseObjects((prevState) => {
                return [
                    ...prevState,
                    {
                        ...newObject,
                        id: generateID("storageRack"),
                        x: randomXCoordinate,
                        y: randomYCoordinate,
                        fill: "#343d83",
                        shadowColor: "#343d83",
                        shadowBlur: 2,
                        shadowOffsetX: 2,
                        shadowOffsetY: 2,
                    },
                ];
            });
        } else if (isPickingBinObject) {
            setWarehouseObjects((prevState) => {
                return [
                    ...prevState,
                    {
                        ...newObject,
                        id: generateID("pickingBin"),
                        x: randomXCoordinate,
                        y: randomYCoordinate,
                        fill: "#f24b73",
                        shadowColor: "#f24b73",
                        shadowBlur: 2,
                        shadowOffsetX: 2,
                        shadowOffsetY: 2,
                    },
                ];
            });
        } else if (isWallObject) {
            setWarehouseObjects((prevState) => {
                return [
                    ...prevState,
                    {
                        ...newObject,
                        id: generateID("wall"),
                        x: randomXCoordinate,
                        y: randomYCoordinate,
                        height: 20,
                        fill: "#000000",
                        shadowColor: "#000000",
                        shadowBlur: 2,
                        shadowOffsetX: 2,
                        shadowOffsetY: 2,
                    },
                ];
            });
        } else if (isPedestrianWalkwayObject) {
            setWarehouseObjects((prevState) => {
                return [
                    ...prevState,
                    {
                        ...newObject,
                        id: generateID("pedestrianWalkway"),
                        x: randomXCoordinate,
                        y: randomYCoordinate,
                        height: 40,
                        fill: "#39aea9",
                        shadowColor: "#39aea9",
                        shadowBlur: 2,
                        shadowOffsetX: 2,
                        shadowOffsetY: 2,
                    },
                ];
            });
        } else if (isForkliftPathwayObject) {
            setWarehouseObjects((prevState) => {
                return [
                    ...prevState,
                    {
                        ...newObject,
                        id: generateID("forkliftPathway"),
                        x: randomXCoordinate,
                        y: randomYCoordinate,
                        height: 40,
                        fill: "#feda3d",
                        shadowOffsetX: 2,
                        shadowOffsetY: 2,
                        shadowColor: "#feda3d",
                        stroke: "#f24b73",
                        shadowBlur: 2,
                    },
                ];
            });
        }
    };

    // Get window width and height
    const getWindowWidth = (e) => e.target.parent.canvas.width - 250; // -250 because of width of object explorer on left
    const getWindowHeight = (e) => e.target.parent.canvas.height;

    // Get the selected object x and y coordinates
    const getCurrentObjectPositionX = (e) => e.target.attrs.x;
    const getCurrentObjectPositionY = (e) => e.target.attrs.y;

    // get the selected object width and height
    const getCurrentObjectWidth = (e) => e.target.attrs.width;
    const getCurrentObjectHeight = (e) => e.target.attrs.height;

    const handleDragStart = () => {};

    const handleDragMove = (e) => {
        // window width and height
        let windowWidth = getWindowWidth(e);
        let windowHeight = getWindowHeight(e);

        // this object position (x and y)
        let objectPositionX = getCurrentObjectPositionX(e);
        let objectPositionY = getCurrentObjectPositionY(e);

        // this object width and height
        let objectWidth = getCurrentObjectWidth(e);
        let objectHeight = getCurrentObjectHeight(e);

        // ************************************************************************************************************
        // Elmer's dev monitor config
        // window width is 2310
        // object width is 200
        // at 2110, stop moving
        // ************************************************************************************************************
        // add 250 because of the object side-bar and take away 20 for appearance. don't want objects touching the edge
        if (objectWidth + objectPositionX >= windowWidth + (250 - 20)) {
            e.target.stopDrag();
            // because of inertia, the object pushes beyond the limit, and there's a hiccup when dragging when that happens
            // re-locate the said object to the edge of the canvas
            // window width + objects sidebar - 20 (appearance) and take into consideration the object width
            e.target.attrs.x = windowWidth + 250 - 20 - objectWidth;
        }
        // add 20 for appearance, don't want it touching the edge and add 250 for the objects sidebar
        if (objectPositionX <= 250 + 20) {
            if (objectPositionY >= window.innerHeight - 300)
                if (objectPositionX <= 70) {
                    e.target.remove();
                    Toast("Warehouse Object removed.");
                } else {
                    // do nothing
                }
            else {
                e.target.stopDrag();
                e.target.attrs.x = 250 + 20;
            }
        }

        // Y position hit top bounds. Add 20 pixels to reposition object to the top.
        if (objectPositionY <= 20) {
            e.target.stopDrag();

            // relocate the said object to the start of the height of the canvas
            e.target.attrs.y = 20;
        } else if (objectHeight + objectPositionY >= windowHeight - 20) {
            e.target.stopDrag();

            // relocate the said object to the end of the height of the canvas
            // take into consideration the object height and 20 px (appearance)
            e.target.attrs.y = windowHeight - (objectHeight + 20);
        }
    };

    const handleDblClick = (e) => {
        // TODO: open pop-up with request for more information
        // regarding location ID, name, SKU assignment
        // Location ID for example could be: 
        // A-01-01, A-01-02
        // A-02-01, A-02-02
        // A-03-01, A-03-02
        // A-04-01, A-04-02
        // A-05-01, A-05-02
        console.log(e.target.attrs.id)
        console.log("i have double clicked this object")
    };

    const ChargingStationImage = () => {
        const [image] = useImage(ChargingStation);
        return image;
    };

    const ConveyerImage = () => {
        const [image] = useImage(Conveyer);
        return image;
    };

    const DockDoorsImage = () => {
        const [image] = useImage(DockDoors);
        return image;
    };

    const OfficeImage = () => {
        const [image] = useImage(Office);
        return image;
    };

    const OutboundAreaImage = () => {
        const [image] = useImage(OutboundArea);
        return image;
    };

    const StagingAreaImage = () => {
        const [image] = useImage(StagingArea);
        return image;
    };

    return (
        <div>
            <Layout>
                <div id="custom-toast" style={{ display: "none" }} />
                <Stage
                    id="designer-stage"
                    width={window.innerWidth}
                    height={1251}
                    onMouseDown={checkDeselect}
                >
                    {/* create layer for objects-nav colors */}
                    <Layer id="background">
                        {/* Create rectangle to fill the width and height of the objects-nav layer */}
                        <Rect
                            x={0}
                            y={0}
                            width={250}
                            height={window.innerHeight}
                            fill="#f7f4fb"
                        />
                    </Layer>

                    {/* all warehouse preview objects */}
                    <Layer id="objects-nav">
                        {/* Create a line that divides the left layer and the right layer*/}
                        <Line
                            x={250}
                            y={0}
                            strokeWidth={1}
                            points={[0, 0, 0, 1300, 0, 0]}
                            stroke="#000000"
                        />

                        {/* "Objects" String in the left-most layer */}
                        <Text
                            x={22}
                            y={21}
                            fontSize={25}
                            fontVariant="bold"
                            fontFamily="Kaushan Script, cursive"
                            text="Warehouse Designer"
                        />

                        {/* Create a line under the heading to separate the heading and the objects */}
                        <Line
                            x={0}
                            y={65}
                            strokeWidth={1}
                            points={[0, 0, 250, 0, 0, 0]}
                            stroke="#000000"
                        />

                        <Text
                            id="canvas-feedback"
                            x={12}
                            y={81}
                            fontSize={17}
                            text="Click objects to add to canvas"
                        />

                        {/* Create a line under the "Click objects to add" to separate instructions from objects */}
                        <Line
                            x={0}
                            y={113}
                            strokeWidth={1}
                            points={[0, 0, 250, 0, 0, 0]}
                            stroke="#000000"
                        />

                        <Rect
                            x={10}
                            y={130}
                            width={225}
                            height={35}
                            fill="#ffffff"
                            cornerRadius={10}
                            stroke="#000000"
                            strokeWidth={1}
                            shadowColor="#cccccc"
                            shadowBlur={2}
                        />

                        {/* Create a line to divide the canvas options and the canvas warehouse objects list */}
                        <Line
                            x={0}
                            y={180}
                            strokeWidth={1}
                            points={[0, 0, 250, 0, 0, 0]}
                            stroke="#000000"
                        />

                        {/* Create trash icon */}
                        <TrashCanIcon
                            x={27}
                            y={137}
                            width={20}
                            height={22}
                            handleClearCanvas={handleClearCanvas}
                            handleMouseEnter={handleMouseEnter}
                            handleMouseLeave={handleMouseLeave}
                        />
                        {/* Line to separate icons in canvas-options */}
                        <Line
                            x={62}
                            y={130}
                            strokeWidth={1}
                            points={[0, 0, 0, 35, 0, 0]}
                            stroke="#000000"
                        />

                        <SaveIcon
                            x={80}
                            y={137}
                            width={20}
                            height={22}
                            handleMouseEnter={handleMouseEnter}
                            handleMouseLeave={handleMouseLeave}
                            handleSaveCanvas={handleSaveCanvas}
                        />
                        {/* Line to separate icons in canvas-options */}
                        <Line
                            x={118}
                            y={130}
                            strokeWidth={1}
                            points={[0, 0, 0, 35, 0, 0]}
                            stroke="#000000"
                        />

                        <ExportIcon
                            x={135}
                            y={133}
                            width={24}
                            height={27}
                            handleMouseEnter={handleMouseEnter}
                            handleMouseLeave={handleMouseLeave}
                            handleExportCanvas={handleExportCanvas}
                        />
                        {/* Line to separate icons in canvas-options */}
                        <Line
                            x={174}
                            y={130}
                            strokeWidth={1}
                            points={[0, 0, 0, 35, 0, 0]}
                            stroke="#000000"
                        />

                        {/* Storage rack label */}
                        <Text
                            text="Storage Rack"
                            x={30}
                            y={200}
                            fontSize={15}
                            fontVariant="bold"
                        />

                        {/* picking bin label */}
                        <Text
                            text="Picking Bin"
                            x={30}
                            y={300}
                            fontSize={15}
                            fontVariant="bold"
                        />

                        {/* Wall label */}
                        <Text
                            text="Wall / Separator"
                            x={30}
                            y={400}
                            fontSize={15}
                            fontVariant="bold"
                        />

                        {/* pedestrianWalkway label */}
                        <Text
                            text="Pedestrian Walkway"
                            x={30}
                            y={460}
                            fontSize={15}
                            fontVariant="bold"
                        />

                        {/* forkliftPathway label */}
                        <Text
                            text="Forklift Pathway"
                            x={30}
                            y={535}
                            fontSize={15}
                            fontVariant="bold"
                        />

                        {/* objects-nav warehouse objects based on navWarehouseObjects */}
                        {navWarehouseObjects &&
                            navWarehouseObjects.map((item, i) => {
                                return (
                                    <Rect
                                        key={i}
                                        {...item}
                                        onMouseEnter={(e) =>
                                            handleMouseEnter(e)
                                        }
                                        onMouseDown={(e) => handleMouseDown(e)}
                                        onMouseLeave={(e) =>
                                            handleMouseLeave(e)
                                        }
                                        onClick={(e) =>
                                            // TODO: change to createWarehouseObject for TYPE rect
                                            createWarehouseObject(e)
                                        }
                                    />
                                );
                            })}

                        {/* TODO: display all the warehouse object images, onClick handler should add it to the warehouseObjects state */}
                        {/* This works for static image display */}
                        {/*}
                        <Image
                            x={20}
                            y={500}
                            width={180}
                            height={180}
                            image={ChargingStationImage()}
                        />
                        {*/}

                        {/* Remove warehouse objects area */}
                        <Rect
                            x={0}
                            y={window.innerHeight - 250}
                            width={250}
                            height={140}
                            stroke="#000000"
                            strokeWidth={2}
                            strokeEnabled={true}
                            fill="#f9f9fb"
                        />

                        <Text
                            x={27}
                            y={window.innerHeight - 185}
                            text="Drag objects here to delete"
                            fontSize={17}
                            fill="#333333"
                        />
                    </Layer>

                    {/* Layer for all the objects created */}
                    <Layer id="objects-canvas" ref={canvasRef}>
                        {/* Create rectangle to fill the width and height of the objects-canvas layer */}
                        {background && (
                            <Rect
                                x={250}
                                y={0}
                                width={window.innerWidth}
                                height={window.innerHeight}
                                fill="#ffffff"
                            />
                        )}
                        {warehouseObjects &&
                            warehouseObjects.map((rect, i) => {
                                return (
                                    <Rectangle
                                        key={i}
                                        shapeProps={rect}
                                        isSelected={rect.id === selectedId}
                                        onSelect={() => {
                                            selectShape(rect.id);
                                        }}
                                        onChange={(newAttrs) => {
                                            const rects =
                                                warehouseObjects.slice();
                                            rects[i] = newAttrs;
                                            setWarehouseObjects(rects);
                                        }}
                                        handleMouseEnter={(e) =>
                                            handleMouseEnter(e)
                                        }
                                        handleMouseDown={(e) =>
                                            handleMouseDown(e)
                                        }
                                        handleMouseLeave={(e) =>
                                            handleMouseLeave(e)
                                        }
                                        handleDragStart={(e) =>
                                            handleDragStart(e)
                                        }
                                        handleDragMove={(e) =>
                                            handleDragMove(e)
                                        }
                                        handleDblClick={handleDblClick}
                                    />
                                );
                            })}
                    </Layer>
                </Stage>
            </Layout>
        </div>
    );
};

export default Designer;
