import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { Heart } from 'lucide-react'
import { useGSAP } from '@gsap/react'

const App = () => {

  const h1Ref = useRef(null)

  useGSAP(() => {
    gsap.to(h1Ref.current, {
      scale: 2,
    })
  }, [])

  return (
    <div className='flex justify-center items-center w-screen h-screen'>
      <h1 ref={h1Ref} className='font-mono'>I am Ibrahim</h1>
      <h1 className='font-body'>I am also Ibrahim</h1>
      <Heart />

      <Link to="/tools/tool1">Tool 1</Link>
      <Link to="/tools/tool2">Tool 2</Link>
    </div>
  )
}

export default App