import React from 'react'

const CompressTool = (props) => {

    const files = props.files
    const setFiles = props.setFiles

    console.log(files)

    return (
        <div>
            {files[0].name}
        </div>
    )
}

export default CompressTool