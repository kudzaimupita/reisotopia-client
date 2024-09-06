import React, { useState, useRef, useCallback, MouseEvent } from "react";
import "./Slider.css";

interface RangeSliderProps {
  minRange: number;
  maxRange: number;
  step: number;
  initialMinValue?: number;
  initialMaxValue?: number;
  onChange?: (minValue: number, maxValue: number) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  minRange,
  maxRange,
  step,
  initialMinValue = minRange,
  initialMaxValue = maxRange,
  onChange,
}) => {
  const [minValue, setMinValue] = useState<number>(initialMinValue);
  const [maxValue, setMaxValue] = useState<number>(initialMaxValue);
  const sliderRef = useRef<HTMLDivElement>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const snapToStep = (value: number): number => Math.round(value / step) * step;

  const debounce = (callback: () => void, delay: number) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(callback, delay);
  };

  const handleMouseDown = useCallback(
    (e: MouseEvent, type: "min" | "max") => {
      e.preventDefault();
      const slider = sliderRef.current;
      if (!slider) return;

      const sliderRect = slider.getBoundingClientRect();
      const startX = e.clientX;
      const startMin = minValue;
      const startMax = maxValue;

      const onMouseMove = (event: MouseEvent) => {
        const offsetX = event.clientX - startX;
        const sliderWidth = sliderRect.width;
        const newPercentage = Math.min(
          Math.max((offsetX / sliderWidth) * 100, 0),
          100
        );
        const newValue = snapToStep(
          (newPercentage / 100) * (maxRange - minRange) + minRange
        );

        if (type === "min") {
          const updatedMinValue = Math.min(newValue, maxValue - step);
          setMinValue(updatedMinValue);
          debounce(() => {
            if (onChange) onChange(updatedMinValue, maxValue);
          }, 300);
        } else if (type === "max") {
          const updatedMaxValue = Math.max(newValue, minValue + step);
          setMaxValue(updatedMaxValue);
          debounce(() => {
            if (onChange) onChange(minValue, updatedMaxValue);
          }, 300);
        }
      };

      const onMouseUp = () => {
        document.removeEventListener(
          "mousemove",
          onMouseMove as unknown as EventListener
        );
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener(
        "mousemove",
        onMouseMove as unknown as EventListener
      );
      document.addEventListener("mouseup", onMouseUp);
    },
    [maxValue, minValue, maxRange, minRange, step, snapToStep, onChange]
  );

  return (
    <div className="range-slider" ref={sliderRef} style={{ width: "300px" }}>
      <div
        className="slider-track"
        style={{ width: "100%", position: "relative" }}
      >
        <div
          className="slider-range"
          style={{
            left: `${((minValue - minRange) / (maxRange - minRange)) * 100}%`,
            width: `${((maxValue - minValue) / (maxRange - minRange)) * 100}%`,
          }}
        ></div>
        <div
          className="thumb thumb-min"
          style={{
            left: `${((minValue - minRange) / (maxRange - minRange)) * 100}%`,
          }}
          onMouseDown={(e) => handleMouseDown(e, "min")}
        />
        <div
          className="thumb thumb-max"
          style={{
            left: `${((maxValue - minRange) / (maxRange - minRange)) * 100}%`,
          }}
          onMouseDown={(e) => handleMouseDown(e, "max")}
        />
      </div>
      <div className="range-labels">
        <span>Min: {minValue}</span>
        <span>Max: {maxValue}</span>
      </div>
    </div>
  );
};

export default RangeSlider;
