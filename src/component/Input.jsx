
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
       className="block mb-1"
        htmlFor={id} > {label}
        </label>
        }

        <input
        type= {type}
        className={` px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        
        ref = {ref}
        {...props}
        id = {id}
        
        />
    </div>
  )
})
export default Input