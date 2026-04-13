"use client"

import { LucideIcon, Eye, EyeOff, Info } from "lucide-react";
import React, { useState } from "react";

interface Props {
    name: string;
    label: string;
    type?: string;
    isRequired?: boolean;
    placeholder: string;
    value: string;
    icon?: LucideIcon;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    autocomplete?: string;
    isPasswordIcon?: boolean;
    validate?: (value: string) => string | null;
    tooltip?: string;
}

const TextInput = ({
    name,
    label,
    type = "text",
    isRequired = false,
    placeholder = "",
    value,
    icon: Icon,
    onChange,
    autocomplete = "off",
    isPasswordIcon = false,
    validate,
    tooltip
}: Props) => {
    const [showPassword, setShowPassword] = useState(false);
    const [inputError, setInputError] = useState<string | null>(null);
    const [isShowTooltip, setIsShowTooltip] = useState(false);

    //check the validation
    const handleValidation = () => {
        //check first is required or not
        if (isRequired && !value.trim()) {
            setInputError(`${label} is required`)
            return;
        }
        //check custom validation
        if (validate) {
            const error = validate(value);
            setInputError(error);
            return;
        }
    }

    //onchange handler<
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e);
        if (inputError) setInputError(""); //clear error while typing
    }
    return (
        <>
            {/* <label htmlFor={name} className="input-label">{label}</label> */}
            <div className="flex items-center gap-2 relative">
                <label htmlFor={name} className="input-label !mb-0">
                    {label}
                </label>

                {tooltip && (
                    <div className="relative flex items-center">
                        <button
                            type="button"
                            onClick={() => setIsShowTooltip(!isShowTooltip)}
                            onBlur={() => setIsShowTooltip(false)}
                            className="text-slate-400 hover:text-secondary transition-colors"
                        >
                            <Info size={14} />
                        </button>

                        {/* Tooltip Popup */}
                        {isShowTooltip && (
                            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-3 bg-primary text-white text-[11px] rounded-xl shadow-2xl z-50 animate-in fade-in zoom-in-95">
                                <p className="leading-relaxed">{tooltip}</p>
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-primary" />
                            </div>
                        )}
                    </div>
                )}
            </div>


            <div className="relative group">
                {Icon && <Icon className="input-icon" />}
                <input
                    name={name}
                    type={isPasswordIcon ? showPassword ? "text" : "password" : type}
                    autoComplete={autocomplete}
                    placeholder={placeholder}
                    className={`input ${inputError ? 'input-error' : ''}`}
                    value={value}
                    onChange={handleOnChange}
                    onBlur={handleValidation} //validate when user leaves field
                />
                {
                    isPasswordIcon && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="password-protect-icon"

                        >
                            {showPassword ? <Eye className="w-5 h-5 input-icon-color" /> : <EyeOff className="w-5 h-5 input-icon-color" />}
                        </button>
                    )
                }
            </div>
            {inputError && (
                <p className="text-red-500 text-xs mt-[-20px] px-1 font-medium animate-in fade-in slide-in-from-top-1">
                    {inputError}
                </p>
            )}
        </>
    )
}

export default TextInput