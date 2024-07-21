"use client"

import { convertFileToUrl } from '@/lib/utils'
import Image from 'next/image'
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

type FileUploaderProps = {
    files: File[] | undefined, onChange: (files: File[]) => void
}

const FileUploader = ({ files, onChange}: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles : File[]) => {
    onChange(acceptedFiles)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className='file-upload'>
      <input {...getInputProps()} />
      {files && files.length > 0 ? (
        <Image src={convertFileToUrl(files [0])} width={1000} height={1000} alt="Uploaded Image" className='max-h-[400px] overflow-hidden object-cover'/>
      ): (
        <>
        <Image src="/assets/icons/upload.svg"
            width={40}
            height={40}
            alt='Upload'
        />
        <div className='file-upload_label'>
            <p className='text-14-regular'>
                <span className='text-green-500'>
                    Click here to Upload
                </span> or drag and drop files here
            </p>
            <p>
                SVG, PNG, JPEG or Gif (max 800×400)
            </p>
        </div>
        </>
      )}
      
    </div>
  )
}

export default FileUploader;