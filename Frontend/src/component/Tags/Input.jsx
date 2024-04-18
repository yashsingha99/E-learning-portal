import React, {useId} from 'react'


// this is only a input component..... 
const Input = React.forwardRef(function Input({
  label,
  className="",
  type="text",
  ...props
}, ref){
    const Id = useId();
   return(
    <div>

        {label && 
        <label
        htmlFor={Id}
        className='inline-block mb-1 pl-1' 
        > {label}</label>
        }
        
        <input 
        type={type} 
         className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full  ${className}`}
         ref={ref}
         id={Id}
         {...props}
        />
    </div>
   )
})

export default Input
