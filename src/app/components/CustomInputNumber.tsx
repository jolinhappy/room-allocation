import { ChangeEvent, useEffect, useRef, useState } from 'react';
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
  const [newValue, setNewValue] = useState<number>(Number(value));
  const timeoutTimer = useRef<number | null>(null);
  const intervalTimer = useRef<number | null>(null);
  const isLongPress = useRef<boolean>(false);

  const handleClickButton = (current: number, clickType: ClickType) => {
    containerRef.current?.focus();
    let newValue = current;
    const canReduce = min !== undefined ? current > min : true;
    const canAdd = max ? current < max : true;
    if (clickType === ClickType.MINUS && canReduce && !isMinusButtonDisabled) {
      newValue = step ? current - step : current - 1;
    } else if (clickType === ClickType.PLUS && canAdd && !isPlusButtonDisabled) {
      newValue = step ? current + step : current + 1;
    }
    if (!isLongPress.current) {
      setNewValue(newValue);
      onChange({ target: { value: newValue.toString(), name: props.name } } as ChangeEvent<HTMLInputElement>);
    }
  };

  const handleStartAdjustCount = (clickType: ClickType) => {
    isLongPress.current = true;
    timeoutTimer.current = window.setTimeout(() => {
      intervalTimer.current = window.setInterval(() => {
        setNewValue((prev) => {
          let value = prev;
          const canReduce = min !== undefined ? prev > min : true;
          const canAdd = max !== undefined ? prev < max : true;

          if (clickType === ClickType.MINUS && canReduce && !isMinusButtonDisabled) {
            value = step ? prev - step : prev - 1;
          } else if (clickType === ClickType.PLUS && canAdd && !isPlusButtonDisabled) {
            value = step ? prev + step : prev + 1;
          }

          onChange({ target: { value: value.toString(), name: props.name } } as ChangeEvent<HTMLInputElement>);
          return value;
        });
      }, 100);
    }, 300);
  };

  const handleStopAdjustCount = () => {
    isLongPress.current = false;
    if (intervalTimer.current) {
      window.clearInterval(intervalTimer.current);
      intervalTimer.current = null;
    }
    if (timeoutTimer.current) {
      window.clearTimeout(timeoutTimer.current);
      timeoutTimer.current = null;
    }
  };

  useEffect(() => {
    setNewValue(Number(value));
  }, [value]);

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
  }, [containerRef, onBlur, props.name, value]);

  const plusButtonDisabledRule = isPlusButtonDisabled || newValue === max;
  const minusButtonDisabledRule = isMinusButtonDisabled || newValue === min;

  return (
    <div className="flex gap-2" ref={containerRef}>
      <button
        className=" flex items-center justify-center w-12 h-12 border border-solid border-primary rounded-[4px] hover:bg-primary-100 disabled:opacity-50 disabled:hover:bg-inherit disabled:cursor-not-allowed shadow focus:shadow-basic"
        disabled={minusButtonDisabledRule}
        onClick={() => handleClickButton(newValue, ClickType.MINUS)}
        onMouseDown={() => handleStartAdjustCount(ClickType.MINUS)}
        onMouseLeave={handleStopAdjustCount}
        onMouseUp={handleStopAdjustCount}
      >
        <MinusIcon className="text-primary w-6 h-6" />
      </button>
      <input
        className="w-12 h-12 border border-solid border-black-100 rounded-[4px] text-center"
        type="number"
        value={newValue}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event)}
        min={min}
        max={max}
        {...props}
      />
      <button
        className=" flex items-center justify-center w-12 h-12 border border-solid border-primary rounded-[4px] hover:bg-primary-100 disabled:opacity-50 disabled:hover:bg-inherit disabled:cursor-not-allowed shadow focus:shadow-basic"
        disabled={plusButtonDisabledRule}
        onClick={() => handleClickButton(newValue, ClickType.PLUS)}
        onMouseDown={() => handleStartAdjustCount(ClickType.PLUS)}
        onMouseLeave={handleStopAdjustCount}
        onMouseUp={handleStopAdjustCount}
      >
        <PlusIcon className="text-primary w-6 h-6" />
      </button>
    </div>
  );
};

export default CustomInputNumber;
