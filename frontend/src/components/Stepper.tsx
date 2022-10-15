type StepperProps = {
  stepSize: number;
  value: number;
  onChange: (newVal: number) => void;
  children: React.ReactElement;
  minValue?: number;
  maxValue?: number;
};

const Stepper = ({
  value,
  onChange,
  stepSize,
  children,
  minValue,
  maxValue,
}: StepperProps) => {
  const change = (v: number) => {
    if (minValue != null && v < minValue) return;
    if (maxValue != null && v > maxValue) return;
    onChange(v);
  };
  return (
    <div className="flex mt-2 flex-1">
      <button className="btn btn-sm" onClick={() => change(value - stepSize)}>
        -
      </button>
      {children}
      <button className="btn btn-sm" onClick={() => change(value + stepSize)}>
        +
      </button>
    </div>
  );
};

export default Stepper;
