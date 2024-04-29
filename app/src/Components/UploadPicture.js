import React from 'react'
import '../ComponentCSS/UploadPicture.css'
export default function UploadPicture() {
  return (
    
    <div className='UploadPicture'>
      
      <form>
        <label>
          Upload Picture:
          <input type="file" name="file" accept="image/*"/>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
