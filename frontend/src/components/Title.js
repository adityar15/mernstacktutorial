import React from 'react'

export default function Title({content, number, ...rest}) {
    return (
        <h1 {...rest}>
          {content}
          {number}
        </h1>
    )
}

