// Canvas 用來顯示圖片
import { useEffect, useRef, useState } from "react";
import { ZoomControls } from "./ZoomControls";
import { Decimal } from "decimal.js"
import Scrollbar from "./Scrollbar";
import Scrollbar_Vertical from "./Scrollbar_Vertical";
import style_homework05 from "../../styles/homework05.module.scss";

export default function CanvasMousePositionMove(props: { src: string }) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [scaleFactor, setScaleFactor] = useState(1);
    const maxScaleFactor = 3;
    const minScaleFactor = 1;
    // 紀錄滑鼠的位置
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // 第一次載入圖片
    useEffect(() => {
        const img = new Image();
        img.src = props.src;
        // 當圖片載入完成後，才把圖片設定到state
        img.onload = () => {
            setImage(img);
        }
    }, [props.src]);

    useEffect(() => {
        if (!image) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        // 把canvas的大小設定成圖片的大小，方便縮放
        canvas.width = image.width;
        canvas.height = image.height;
        const rect = canvas.getBoundingClientRect();
        const mouse_canvas_x = mousePosition.x * image.width / rect.width;
        const mouse_canvas_y = mousePosition.y * image.height / rect.height;
        // 清除畫布
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // 將canvas的原點移動到滑鼠的位置
        ctx.translate(mouse_canvas_x, mouse_canvas_y);
        // 縮放圖片
        ctx.scale(scaleFactor, scaleFactor);
        // 移動圖片的原點到滑鼠的位置
        ctx.translate(-mouse_canvas_x, -mouse_canvas_y);
        // 繪製圖片
        ctx.drawImage(image, 0, 0);

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            const delta = -Math.sign(e.deltaY);
            let newScaleFactor = scaleFactor;
            if ((scaleFactor < maxScaleFactor && delta > 0) || (scaleFactor > minScaleFactor && delta < 0)) {
                newScaleFactor = new Decimal(scaleFactor).plus(delta * 0.1).toNumber();
            }
            if (newScaleFactor !== scaleFactor) {
                setScaleFactor(newScaleFactor);
            }
        }
        canvas.addEventListener('wheel', handleWheel);

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            setMousePosition({ x, y });
        }
        canvas.addEventListener('mousemove', handleMouseMove);

        return () => {
            canvas.removeEventListener('wheel', handleWheel);
            canvas.removeEventListener('mousemove', handleMouseMove);
        }
    }, [image, scaleFactor]);

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
            <div className="flex center">
                <p>滑鼠在瀏覽器中的座標:</p>
                <div className="margin">X: {mousePosition.x}</div>
                <div className="margin">Y: {mousePosition.y}</div>
            </div>
            <div className="flex center">
                <p>滑鼠在Canvas中的座標:</p>
                {/* <div className="margin">X: {mouseposInCanvas.x}</div>
                <div className="margin">Y: {mouseposInCanvas.y}</div> */}
            </div>
            <div className="relative">
                <canvas className={style_homework05.canvas} ref={canvasRef} />
                <Scrollbar_Vertical min={minScaleFactor} max={maxScaleFactor} step={0.1} value={scaleFactor} onChange={handleChange} />
            </div>
            <Scrollbar min={minScaleFactor} max={maxScaleFactor} step={0.1} value={scaleFactor} onChange={handleChange} />
            <ZoomControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
        </div>
    );
}
