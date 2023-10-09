import React from "react";
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label";

interface SettingsProps {
    value: number;
    onChange: (value: number) => void;
    minDataLength: number;
    maxDataLength: number;
}

export const Settings: React.FC<SettingsProps> = ({ value, onChange, minDataLength, maxDataLength }) => {
    const handleChange = (value: number[]) => {
        onChange(value[0]);
    }

    return (
        <div className="px-4">
            <div className="text-left mb-4">
                <Label className="inline-block mb-2" htmlFor="limit">Limit</Label>
                <Slider
                    name="limit"
                    value={[value]}
                    min={minDataLength}
                    max={maxDataLength}
                    step={1}
                    onValueChange={handleChange}
                />
            </div>

            <div className="flex justify-between">
                <div>{minDataLength}</div>
                <div>{value}</div>
                <div>{maxDataLength}</div>
            </div>
        </div>
    )
}
