// Canvas 用來顯示圖片
import { useRef, useEffect } from "react";

export default function Canvas(props: { src: string }) {

    // useRef 可以讓我們在 render 之後存取 DOM element

    // 簡單說就是當props.src改變時，會重新執行useEffect
    // 當執行useEffect時，會重新執行canvasRef.current (意思是取得canvas的DOM element)
    // 之後就是一般的canvas操作
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            return;
        }
        const img = new Image();
        img.src = props.src;
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        };
    }, [props.src]);

    return <canvas ref={canvasRef} />;
}