import Layout from '../components/Layout'
import {Stage, Layer, Rect, Text, Line} from "react-konva";
import {useState} from "react";
import Rectangle from "../components/canvas/Rectangle";

const Designer = () => {
	const [rectangles, setRectangles] = useState([])
	const [selectedId, selectShape] = useState(null)

	const checkDeselect = e => {
		const clickedOnEmpty = e.target === e.target.getStage()
		if (clickedOnEmpty) {
			selectShape(null)
		}
	}

	const createStorageRackObject = () => {
		let newStorageRack = {
			x: 400,
			y: 300,
			width: 200,
			height: 85,
			fill: "#463c8a"
		}
		setRectangles((prevState => {
			return [...prevState, newStorageRack]
		}))
	}

	const createPickingBinObject = () => {
		let newPickingBin = {
			width: 200,
			height: 75,
			x: 600,
			y: 300,
			fill: "#cd0000"
		}
		setRectangles(prevState => {
			return [...prevState, newPickingBin]
		})
	}

	const getWindowWidth = e => e.target.parent.canvas.width - 250  // -250 because of width of object explorer on left
	const getWindowHeight = e => e.target.parent.canvas.height

	const getCurrentObjectPositionX = e => e.target.attrs.x
	const getCurrentObjectPositionY = e => e.target.attrs.y

	const getCurrentObjectWidth = e => e.target.attrs.width
	const getCurrentObjectHeight = e => e.target.attrs.height

	const handleDragStart = (e) => {

	}

	const handleDragMove = (e) => {
		// window width and height
		let windowWidth = getWindowWidth(e)
		let windowHeight = getWindowHeight(e)

		// this object position (x and y)
		let objectPositionX = getCurrentObjectPositionX(e)
		let objectPositionY = getCurrentObjectPositionY(e)

		// this object width and height
		let objectWidth = getCurrentObjectWidth(e)
		let objectHeight = getCurrentObjectHeight(e)

		// ************************************************************************************************************
		// Elmer's dev monitor config
		// window width is 2310
		// object width is 200
		// at 2110, stop moving
		// ************************************************************************************************************
		// add 250 because of the object side-bar and take away 20 for appearance. don't want objects touching the edge
		if ((objectWidth + objectPositionX) >= windowWidth + (250 - 20)) {
			e.target.stopDrag()
			// because of inertia, the object pushes beyond the limit, and there's a hiccup when dragging when that happens
			// re-locate the said object to the edge of the canvas
			// window width + objects sidebar - 20 (appearance) and take into consideration the object width
			e.target.attrs.x = (windowWidth + 250 - 20) - objectWidth

		// add 20 for appearance, don't want it touching the edge and add 250 for the objects sidebar
		} else if (objectPositionX <= (20 + 250)) {
			e.target.stopDrag()
			// because of inertia, the object pushes beyond the limit, and there's a hiccup when dragging when it happens
			// relocate the said object to the start of the canvas
			// 250 for the object sidebar and 20 for the appearance
			e.target.attrs.x = 250 + 20
		}

		if (objectPositionY <= 20) {
			e.target.stopDrag()

			// relocate the said object to the start of the height of the canvas
			e.target.attrs.y = 20
		} else if ((objectHeight + objectPositionY) >= windowHeight - 20) {
			e.target.stopDrag()

			// relocate the said object to the end of the height of the canvas
			// take into consideration the object height and 20 px (appearance)
			e.target.attrs.y = windowHeight - (objectHeight + 20)
		}
	}

	const handleMouseEnter = e => {
		// log(e.target)
		const container = e.target.getStage().container();
		container.style.cursor = "pointer"
	}

	const handleMouseLeave = e => {
		const container = e.target.getStage().container();
		container.style.cursor = "default"
	}

	const handleMouseDown = e => {
		const container = e.target.getStage().container();
		container.style.cursor = "move"
	}

	return (
		<div>
			<Layout>
				<Stage
					id="designer-stage"
					width={window.innerWidth}
					height={1251}
					onMouseDown={e => checkDeselect(e)}
				>

					{/* background colors layer */}
					<Layer>
						<Rect
							x={0}
							y={0}
							width={250}
							height={window.innerHeight }
							fill="#f7f4fb"
						/>
						<Rect
							x={250}
							y={0}
							width={window.innerWidth-250}
							height={window.innerHeight}
							fill="#eef1f6"
						/>
					</Layer>

					{/* all warehouse preview objects */}
					<Layer id="objects-nav">
						{/* Create a line that divides the left layer and the right layer*/}
						<Line x={250} y={0} strokeWidth={1} points={[0,0, 0, 1300, 0, 0]} stroke="#000000" />

						{/* "Objects" String in the left-most layer */}
						<Text text="Warehouse Objects" x={30} y={24} fontSize={20} fontVariant="bold" />

						{/* Create a line under the heading to separate the heading and the objects */}
						<Line x={0} y={70} strokeWidth={1} points={[0,0,250,0,0,0]} stroke="#000000" />

						<Text text="Click objects to add to canvas." x={12} y={84} fontSize={17}  />

						{/* Create a line under the "Click objects to add" to separate instructions from objects */}
						<Line x={0} y={113} strokeWidth={1} points={[0,0,250,0,0,0]} stroke="#000000" />

						{/* Storage rack label */}
						<Text text="Storage Rack" x={30} y={134} fontSize={15} fontVariant="bold"  />
						{/* Storage rack object */}


						<Rect
							width={189}
							height={75}
							x={30}
							y={155}
							fill="#463c8a"
							shadowOffsetX={2}
							shadowOffsetY={2}
							shadowColor="#b6b7b6"
							shadowBlur={2}
							onMouseEnter={(e) => handleMouseEnter(e)}
							onMouseDown={(e) => handleMouseDown(e)}
							onMouseLeave={(e) => handleMouseLeave(e)}
							onClick={(e) => createStorageRackObject(e)}
							onDragStart={(e) => handleDragStart(e)}
							onDragMove={(e) => handleDragMove(e)}
						/>

						<Text text="Picking Bin" x={30} y={250} fontSize={15} fontVariant="bold" />
						<Rect
							width={189}
							height={75}
							x={30}
							y={271}
							fill="#cd0000"
							shadowOffsetX={2}
							shadowOffsetY={2}
							shadowColor="#b6b7b6"
							shadowBlur={2}
							onMouseEnter={(e) => handleMouseEnter(e)}
							onMouseDown={(e) => handleMouseDown(e)}
							onMouseLeave={(e) => handleMouseLeave(e)}
							onClick={(e) => createPickingBinObject(e)}
							onDragStart={(e) =>handleDragStart(e)}
							onDragMove={(e) => handleDragMove(e)}
						/>
					</Layer>

					<Layer>

						{rectangles && rectangles.map((rect, i) => {
							return (
								<Rectangle
									key={i}
									shapeProps={rect}
									isSelected={rect.id === selectedId}
									onSelect={() => {
										selectShape(rect.id)
									}}
									onChange={(newAttrs) => {
										const rects = rectangles.slice()
										rects[i] = newAttrs
										setRectangles(rects)
									}}
									handleMouseEnter={(e) => handleMouseEnter(e)}
									handleMouseDown={(e) => handleMouseDown(e)}
									handleMouseLeave={(e) => handleMouseLeave(e)}
									handleDragStart={(e) =>handleDragStart(e)}
									handleDragMove={(e) => handleDragMove(e)}
								/>
							)
						})}

					</Layer>

				</Stage>
			</Layout>
		</div>
	)
};

export default Designer;
