// Canvas 用來顯示圖片
import { useEffect, useRef, useState } from "react";
import { ZoomControls } from "./ZoomControls";
import { Decimal } from "decimal.js"
import Scrollbar from "./Scrollbar";
import Scrollbar_Vertical from "./Scrollbar_Vertical";
import style_homework05 from "../../styles/homework05.module.scss";

export default function CanvasDrag(props: { src: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [scaleFactor, setScaleFactor] = useState(1);
    // 把圖片存放在state中
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    // 新的圖片中心點
    const [imageCenter, setimageCenter] = useState({ x: 0, y: 0 });
    // 確認是不是第一次拖移
    const [firstDrag, setFirstDrag] = useState(true);
    // 滑鼠最後的拖移位置
    const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });

    const maxScaleFactor = 3;
    const minScaleFactor = 1;
    // 設定小數點位數
    Decimal.set({ precision: 10 });

    // 第一次載入圖片
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const img = new Image();
        img.src = props.src;
        setImage(img);
    }, [props.src]);

    useEffect(() => {
        if (!image) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = image.width;
        canvas.height = image.height;

        draw();

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            const delta = -Math.sign(e.deltaY);

            let newScaleFactor = scaleFactor;
            if ((scaleFactor < maxScaleFactor && delta > 0) || (scaleFactor > minScaleFactor && delta < 0)) {
                newScaleFactor = new Decimal(scaleFactor).plus(delta * 0.1).toNumber();
            }

            if (newScaleFactor !== scaleFactor) {
                const canvasBox = canvas.getBoundingClientRect();
                const centerX = canvasBox.width / 2;
                const centerY = canvasBox.height / 2;

                if (delta > 0) {
                    let offsetX = e.offsetX < centerX ? - 10 : 10;
                    let offsetY = e.offsetY < centerY ? - 10 : 10;                   

                    if (imageCenter.x + offsetX < 0 || imageCenter.x + offsetX > canvasBox.width || imageCenter.y + offsetY < 0 || imageCenter.y + offsetY > canvasBox.height) {
                        offsetX = 0;
                    }
                    if (imageCenter.y + offsetY < 0 || imageCenter.y + offsetY > canvasBox.height) {
                        offsetY = 0;
                    }

                    setimageCenter({
                        x: imageCenter.x + offsetX,
                        y: imageCenter.y + offsetY
                    });
                }
                setScaleFactor(newScaleFactor);
            }
        };

        canvas.addEventListener("wheel", handleWheel);

        const handleMouseMove = (e: MouseEvent) => {
            const canvasBox = canvas.getBoundingClientRect();
            if (e.offsetX < 0 || e.offsetY < 0 || e.offsetX > canvasBox.width || e.offsetY > canvasBox.height) {
                return;
            }

            if (scaleFactor <= 1) return;

            // 滑鼠要按住才能拖曳
            if (e.buttons === 1) {
                // 如果是第一次拖曳，就不計算滑鼠的偏移量
                let lastPos = lastMousePosition;
                if (firstDrag) {
                    console.log("第一次拖曳")
                    lastPos = { x: e.offsetX, y: e.offsetY };
                    setFirstDrag(false);
                }
                // 計算偏移量
                const offsetX = new Decimal(e.offsetX).minus(lastPos.x).toNumber().toFixed(2);
                const offsetY = new Decimal(e.offsetY).minus(lastPos.y).toNumber().toFixed(2);
                const offsetXInCanvasN = Number(offsetX);
                const offsetYInCanvasN = Number(offsetY);

                // 如果圖片超出邊界，就不要再拖曳
                if (imageCenter.x - offsetXInCanvasN < 0 || imageCenter.x - offsetXInCanvasN > canvasBox.width || imageCenter.y - offsetYInCanvasN < 0 || imageCenter.y - offsetYInCanvasN > canvasBox.height) {
                    setLastMousePosition({ x: e.offsetX, y: e.offsetY });
                    return;
                }

                // 計算新的圖片中心點 - 原本的圖片中心點  - 偏移量
                setimageCenter({
                    x: imageCenter.x - offsetXInCanvasN,
                    y: imageCenter.y - offsetYInCanvasN
                });
                setLastMousePosition({ x: e.offsetX, y: e.offsetY });
            }
        };

        canvas.addEventListener("mousemove", handleMouseMove);

        return () => {
            canvas.removeEventListener("wheel", handleWheel);
            canvas.removeEventListener("mousemove", handleMouseMove);
        };

        function draw() {
            if (!image) return;
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            const canvasBox = canvas.getBoundingClientRect();

            // 要把數值轉換成在canvas上的座標
            const mouseposInCanvasXS = new Decimal(imageCenter.x).times(canvas.width).dividedBy(canvasBox.width).toFixed(2);
            const mouseposInCanvasYS = new Decimal(imageCenter.y).times(canvas.height).dividedBy(canvasBox.height).toFixed(2);
            const mouseposInCanvasX = Number(mouseposInCanvasXS);
            const mouseposInCanvasY = Number(mouseposInCanvasYS);

            console.log("draw ", imageCenter)

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.translate(mouseposInCanvasX, mouseposInCanvasY);
            ctx.scale(scaleFactor, scaleFactor); // 調整縮放比例
            ctx.translate(-mouseposInCanvasX, -mouseposInCanvasY);
            ctx.drawImage(image, 0, 0);
        }
    }, [image, scaleFactor, firstDrag, imageCenter, lastMousePosition]);

    function handleMouseDown() {
        setFirstDrag(true);
    }

    function handleMouseUp() {
        setFirstDrag(true);
    }

    function handleMouseLeave() {
        setFirstDrag(true);
    }

    const handleZoomIn = () => {
        if (scaleFactor < maxScaleFactor) {
            setScaleFactor((prevScale) => prevScale + 0.1);
        }
    };

    const handleZoomOut = () => {
        if (scaleFactor > minScaleFactor) {
            setScaleFactor((prevScale) => prevScale - 0.1);
        }
    };

    const handleChange = (newScaleFactor: number) => {
        setScaleFactor(newScaleFactor);
    };

    return (
        <div className="margin">
            <div className="relative">
                <canvas className={style_homework05.canvas} ref={canvasRef}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                />
                <Scrollbar_Vertical min={minScaleFactor} max={maxScaleFactor} step={0.1} value={scaleFactor} onChange={handleChange} />
            </div>
            <Scrollbar min={minScaleFactor} max={maxScaleFactor} step={0.1} value={scaleFactor} onChange={handleChange} />
            <ZoomControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
        </div>
    );
}
