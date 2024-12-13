import { useState } from 'react'
import { loginEndpoint } from './components/login/loginEndpoint'

function App() {

  return (
    <>
      <div className='hi'>
        <a href={loginEndpoint}>Log In</a>
      </div>

    </>
  )
}

export default App
