// Scrollbar
interface ScrollbarProps {
    min: number;
    max: number;
    step: number;
    value: number;
    onChange: (value: number) => void;
}

const Scrollbar: React.FC<ScrollbarProps> = ({ min, max, step, value, onChange }) => {
    return (
        <input placeholder="range" type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(+e.target.value)} />
    );
};

export default Scrollbar;
