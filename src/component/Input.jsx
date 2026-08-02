
//the parent needs the actual HTML input.You may want to
// focus it
// clear it
// select text
// integrate with libraries like react-hook-form

// React components don't automatically expose their DOM elements.

// forwardRef() passes the ref from the parent to the inner <input>.


import React , {useId} from "react";
// hook forwardRef
const Input = React.forwardRef(function input({
  label,
  type = "Text",
  className="",
  ...props
}, ref){
  const id = useId()
  return(
    <div className="w-full">
      {label && 
      <label
      className="inline-block mb-2 text-white"
        htmlFor={id} > {label}
        </label>
        }

    <input
  type={type}
  ref={ref}
  id={id}
  className={`
    w-full
    bg-[#111827]
    text-white
    placeholder:text-slate-400
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
    ${className}
  `}
  {...props}
/>
    </div>
  )
})
export default Input