import React from 'react'
import CustomLinksItem from './CustomLinksItem'

const CustomLinks = ({links}) => (
  <div>
    {links.map((link, index) => {
      return <CustomLinksItem key={index} url={link.url} name={link.name}/>
    })}
  </div>
)

export default CustomLinks
