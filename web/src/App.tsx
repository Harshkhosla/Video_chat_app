import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {

  const [link, setLink] = useState<string>('')
  const localVideoRef = useRef<HTMLVideoElement | null>(null)
  const localStreamRef = useRef<MediaStream | null>(null)



  const handleChnage = (e:any)=>{
  setLink(e.target.value)
  }
  const handleSubmit =()=>{

  }

  useEffect(()=>{
    async function setupLocalMedia(){
      try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    console.log(stream, 'Failed')
     localStreamRef.current = stream
     console.log(localStreamRef,'localStreamRef')
      if (localVideoRef.current) localVideoRef.current.srcObject = stream
     console.log(localVideoRef)
      } catch (err) {
        console.error('Failed to get user media', err)
        // show UI message in production
      }
    }
    setupLocalMedia()
     return () => {
      localStreamRef.current?.getTracks().forEach(t => t.stop())
    }
  },[])
  return (
    <>
      <p className="ml-4 mt-10">
        DO A video chat 
      </p>
      <div className='flex justify-center'>
      <input type="text" onChange={handleChnage} value={link} className='border ml-5'/>
      <button className='px-3  py-1 border' onClick={handleSubmit}>Join </button>

      <div className="flex justify-center mt-6">
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          muted
          className="w-80 h-56 bg-black"
        />
      </div>
      </div>
    </>
  )
}

export default App
