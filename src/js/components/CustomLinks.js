import React from 'react'
import { List } from 'semantic-ui-react'

const CustomLinks = ({links}) => (
  <List celled horizontal>
    {links.map((link, index) => {
      return (
        <List.Item
          key={index}
          as="a"
          href={link.url}
          target="_blank"
        >
          {link.name}
        </List.Item>
      )
    })}
  </List>
)

export default CustomLinks
