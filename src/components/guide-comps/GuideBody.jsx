import React from 'react'

const GuideBody = (props) => {
    
    const { text, bold } = props

    return (
        <p className={`font-body text-lg ${bold ? 'font-bold' : null}`}>
            {text}
        </p>
    )
}

export default GuideBody