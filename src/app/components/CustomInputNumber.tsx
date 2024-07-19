import { ChangeEvent, useEffect, useRef } from 'react';
import { PlusIcon, MinusIcon } from '@radix-ui/react-icons';

interface CustomInputNumberProps {
  step?: number;
  min?: number;
  max?: number;
  value: number;
  name?: string;
  disabled?: boolean;
  isPlusButtonDisabled?: boolean;
  isMinusButtonDisabled?: boolean;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: FocusEvent) => void;
}
enum ClickType {
  PLUS = 'plus',
  MINUS = 'minus',
}
const CustomInputNumber = ({
  value,
  min,
  max,
  step,
  isPlusButtonDisabled,
  isMinusButtonDisabled,
  onChange,
  onBlur,
  ...props
}: CustomInputNumberProps) => {
  const containerRef = useRef<HTMLInputElement>(null);
  const currentValue = Number(value);

  const handleClickButton = (currentValue: number, clickType: ClickType) => {
    containerRef.current?.focus();
    let newValue = currentValue;
    const canReduce = min ? currentValue > min : true;
    const canAdd = max ? currentValue < max : true;
    if (clickType === ClickType.MINUS && canReduce) {
      newValue = step ? currentValue - step : currentValue - 1;
    } else if (clickType === ClickType.PLUS && canAdd) {
      newValue = step ? currentValue + step : currentValue + 1;
    }
    onChange({ target: { value: newValue.toString(), name: props.name } } as ChangeEvent<HTMLInputElement>);
  };

  useEffect(() => {
    const container = containerRef.current;
    const handleBlur = () => {
      onBlur({
        target: { value: value.toString(), name: props.name },
      } as any);
    };
    if (container) {
      container.addEventListener('blur', handleBlur, true);
    }
    return () => {
      if (container) {
        container.removeEventListener('blur', handleBlur, true);
      }
    };
  }, [containerRef, onBlur, props.name]);

  const plusButtonDisabledRule = isPlusButtonDisabled || currentValue === max;
  const minusButtonDisabledRule = isMinusButtonDisabled || currentValue === min;

  return (
    <div className="flex gap-2" ref={containerRef}>
      <button
        className=" flex items-center justify-center w-12 h-12 border border-solid border-primary rounded-[4px] hover:bg-primary-100 disabled:opacity-50 disabled:hover:bg-inherit disabled:cursor-not-allowed shadow focus:shadow-basic"
        onClick={() => handleClickButton(currentValue, ClickType.MINUS)}
        disabled={minusButtonDisabledRule}
      >
        <MinusIcon className="text-primary w-6 h-6" />
      </button>
      <input
        className="w-12 h-12 border border-solid border-black-100 rounded-[4px] text-center"
        type="number"
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event)}
        min={min}
        max={max}
        {...props}
      />
      <button
        className=" flex items-center justify-center w-12 h-12 border border-solid border-primary rounded-[4px] hover:bg-primary-100 disabled:opacity-50 disabled:hover:bg-inherit disabled:cursor-not-allowed shadow focus:shadow-basic"
        disabled={plusButtonDisabledRule}
        onClick={() => handleClickButton(currentValue, ClickType.PLUS)}
      >
        <PlusIcon className="text-primary w-6 h-6" />
      </button>
    </div>
  );
};

export default CustomInputNumber;
