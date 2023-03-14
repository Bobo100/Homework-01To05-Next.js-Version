// Scrollbar
import style_homework05 from "../../styles/homework05.module.scss";

interface ScrollbarProps {
    min: number;
    max: number;
    step: number;
    value: number;
    onChange: (value: number) => void;
}

const Scrollbar_Vertical: React.FC<ScrollbarProps> = ({ min, max, step, value, onChange }) => {
    return (
        <input placeholder="range" className={style_homework05.vertical} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(+e.target.value)} />
    );
};

export default Scrollbar_Vertical;
