import React, { ReactNode } from 'react'
import Nabver from '../Navber/Nabver'

type Props = {
    children : ReactNode
}

const Layout = ({children}:Props) => {
  return (
    <div>
        <Nabver />
        {children}
    </div>
  )
}

export default Layout