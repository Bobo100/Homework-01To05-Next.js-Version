// 放大縮小按鈕
import React from 'react';
import style_homework05 from "../../styles/homework05.module.scss";

interface ZoomControlsProps {
    onZoomIn: () => void;
    onZoomOut: () => void;
}
export const ZoomControls: React.FC<ZoomControlsProps> = ({ onZoomIn, onZoomOut }) => {
    return (
        <div className={`margin ${style_homework05.zoom_controls}`}>
            <button onClick={onZoomIn}>Zoom In +</button>
            <button onClick={onZoomOut}>Zoom Out -</button>
        </div>
    );
};
