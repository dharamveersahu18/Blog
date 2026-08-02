import React, {useId} from 'react'

function Select({
 options,
  label,
  className,// empty string todo
  ...props
}, ref){
  const id = useId();
  return (
    <div className='w-full'>
      {label && (
  <label
    htmlFor={id}
    className="block mb-2 text-white font-medium"
  >
    {label}
  </label>
)}
      <select
      {...props}
      id= {id}
      ref = {ref}
 className={`
  w-full
  bg-[#111827]
  text-white
  border
  border-slate-700
  rounded-xl
  px-4
  py-3
  outline-none
  focus:border-blue-500
  focus:ring-2
  focus:ring-blue-500/30
  transition-all
  ${className || ""}
`}

      >
        {options?.map((option) => (
          <option key = {option} value={option}>
            {option}
          </option>
        ))}


      </select>
    </div>
  )
}

export default React.forwardRef (Select)