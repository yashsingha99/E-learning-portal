import React from 'react'

function Button({
    children,
    className="",
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    ...props
}) {
  return (
    <button className={` px-4 py-2 rounded-lg  ${className} ${type} ${bgColor} ${textColor}`} {...props}>
        {children}
    </button>
  )
}

export default Button