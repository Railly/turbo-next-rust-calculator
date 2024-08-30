"use client";
import { useState, useEffect } from "react";
import init, {
  calculate,
  format_number as formatNumber,
} from "@repo/rust-math/pkg/rust_math";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const buttons = [
  "C",
  "%",
  "×",
  "÷",
  "7",
  "8",
  "9",
  "×",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "00",
  "0",
  ".",
  "=",
];

export default function Calculator(): React.ReactNode {
  const [display, setDisplay] = useState("0");
  const [preview, setPreview] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [previousValue, setPreviousValue] = useState("");
  const [operation, setOperation] = useState("");
  const [isNewInput, setIsNewInput] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    init().then(() => {
      setIsLoading(false);
    });
  }, []);

  const handleButtonClick = (value: string): void => {
    switch (value) {
      case "C":
        setDisplay("0");
        setPreview("");
        setCurrentValue("");
        setPreviousValue("");
        setOperation("");
        setIsNewInput(true);
        break;
      case "=":
        if (previousValue && currentValue && operation) {
          const result = calculate(
            parseFloat(previousValue),
            parseFloat(currentValue),
            operation,
          );
          const formattedResult = formatNumber(result);
          setDisplay(formattedResult);
          setPreview(`${previousValue} ${operation} ${currentValue} =`);
          setCurrentValue(formattedResult);
          setPreviousValue("");
          setOperation("");
          setIsNewInput(true);
        }
        break;
      case "+":
      case "-":
      case "×":
      case "÷":
      case "%":
        if (currentValue) {
          setPreviousValue(currentValue);
          setOperation(value);
          setPreview(`${currentValue} ${value}`);
          setIsNewInput(true);
        }
        break;
      default:
        if (isNewInput) {
          setCurrentValue(value);
          setDisplay(value);
          setIsNewInput(false);
        } else {
          setCurrentValue((prev) => prev + value);
          setDisplay((prev) => prev + value);
        }
        break;
    }
  };

  if (isLoading) return <div className="text-center">Loading...</div>;

  return (
    <div className="p-4 max-w-xs mx-auto bg-gray-800 rounded-lg shadow-lg">
      <div className="p-4 mb-4 bg-gray-700 rounded-md">
        <div className="text-right text-sm text-gray-400 mb-1 h-5 font-mono">
          {preview}
        </div>
        <div className="text-right text-4xl font-mono text-green-400 bg-gray-900 p-2 rounded-md overflow-x-auto whitespace-nowrap">
          {display}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {buttons.map((btn) => (
          <Button
            key={btn}
            onClick={(): void => {
              handleButtonClick(btn);
            }}
            className={cn(
              "text-xl font-bold py-3",
              btn === "=" ? "col-span-2 bg-gray-600 hover:bg-gray-700" : "",
              ["C", "%", "×", "÷", "-", "+"].includes(btn)
                ? "bg-orange-500 hover:bg-orange-600"
                : "bg-gray-600 hover:bg-gray-700",
            )}
          >
            {btn}
          </Button>
        ))}
      </div>
    </div>
  );
}
