import React, { useState } from 'react'

export default function FieldBody({
    fieldName,
    label,
    type = "text",
    placeholder,
    register,
    errors,
    isSubmitting,
    options = [],
}) 
{
      const [isVisible, setIsVisible] = useState(false);

    //   if the type is password we can toggle visibility
    const inputType = type === "password" ? (isVisible ? "text" : "password") : type;


  return (
    <div className='col-span-6 sm:col-span-3'>
    <fieldset className='fieldset'>
        <legend className='fieldset-legend text-black text-[16px] font-medium'>{label}</legend>
        {/* handles select vs input */}
        {type === "select" ? (
            <select
            defaultValue=""
            className='select capitalize w-full'
            {...register(fieldName)}
            disabled={isSubmitting}
            >
                <option value="">Select {label}</option>
                {options.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                ))}
            </select>
        ) : (
            <div className='relative'>
            <input 
                type={inputType}
                className='input input-xl input-neutral w-full text-xs text-gray-300'
                placeholder= {placeholder || label}
                {...register(fieldName)}
                disabled={isSubmitting}
            /> 
            {/* toggle password visibility */}
            {type === "password" && 
            <button type="button" onClick={() => setIsVisible(!isVisible)} className='absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer'>
            {isVisible ? "Hide" : "Show"}
            </button>
            }
            </div>
        )}
        
    </fieldset>
    {/* validation errors */}
        {errors[fieldName]?.message && (
              <span className="text-xs text-red-500">
                {errors[fieldName]?.message}
              </span>
            )}

    </div>
  )
}
