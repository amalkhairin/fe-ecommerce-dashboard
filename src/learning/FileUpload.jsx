import React, { useState } from 'react'

function FileUpload() {

    const [file, setFile] = useState(null);
    const [base64Image, setBase64Image] = useState(null);

    return (
        <div className='flex h-screen flex-1 flex-col justify-center items-center'>
            <h1 className='text-2xl'>FileUpload Title</h1>
            <div className='w-96 h-96 border '>
                {<img src={base64Image} alt="" className='w-full h-full'/>}
            </div>
            <label htmlFor="fileinput" className='mt-4'>File Upload</label>
            <input type="file" name='fileinput' className='bg-blue-500 border border-black' accept='image/*' onChange={(e) => {
                const file = e.target.files[0];

                const reader = new FileReader();

                reader.onloadend = (e) => {
                    console.log(e);
                    setBase64Image(e.target.result);
                }

                reader.readAsDataURL(file);

                setFile(file);
            }} />
        </div>
    )
}

export default FileUpload