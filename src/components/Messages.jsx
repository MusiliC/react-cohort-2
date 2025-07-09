import React from 'react'
import { useNavigate } from 'react-router'

const Messages = () => {

    const navigate = useNavigate()

    const handleNavigate = () => {
        const id = Math.random().toString(36).substring(2); 
        navigate(`/messages/${id}`)
    }

  return (
    <div>
        <button className='p-5 bg-blue-700 text-white' onClick={handleNavigate}>
            Click here to message one
        </button>
    </div>
  )
}

export default Messages