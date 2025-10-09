import { UploadIcon } from 'lucide-react'
import React from 'react'

const Left = () => {
  return (
    <div>
        <div className="w-full lg:w-1/4 xl:w-1/5 bg-[#2d3748] p-6 rounded-xl flex flex-col gap-8 shadow-lg">
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Upload PDF</h2>
        <div 
            className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center text-gray-400 mb-4 cursor-pointer hover:border-white hover:text-white"
            onClick={() => fileInputRef.current.click()}
        >
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf"
            />
            <p className="text-sm">{fileName || 'No file chosen'}</p>
        </div>
        <Button onClick={handleUpload} className="w-full">
          <Icon path="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          Upload
        </Button>
      </div>
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Documents</h2>
        <div className="bg-[#1a202c] p-4 rounded-lg text-center text-gray-400 text-sm">
          No documents yet
        </div>
      </div>
      <div>
        <Button variant="secondary" className="w-full">
            <Icon path="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
            Explain Document (MP3)
        </Button>
      </div>
    </div>
    </div>
  )
}

export default Left
