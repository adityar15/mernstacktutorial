import React from 'react'

export default function Button({children, buttontype="primary", className, ...rest}) {

    const color = buttontype == "primary" ? "bg-sky-500" :"bg-rose-500"

    return (
        <button
          {...rest}
          className={`${color} text-white font-semibold text-lg focus:outline-none px-7 py-2 ${className}`}
        >
          {children}
        </button>
    )
}
