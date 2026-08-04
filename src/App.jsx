import React, { useRef } from 'react'
import gsap from 'gsap'

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
      <h1 ref={h1Ref} className='mono'>I am Ibrahim</h1>
    </div>
  )
}

export default App