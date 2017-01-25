import React from 'react'
import { Header, Segment, Icon } from 'semantic-ui-react'

const PageHeader = ({toggleHelp}) => (
  <Segment>
    <Header dividing size="huge" color="blue">
      Lounge
      <Icon
        link name='Show Help'
        onClick={toggleHelp}
        style={{float: "right", fontSize: 20}}
        name='help circle'
        color="blue"
      />
    </Header>
  </Segment>
)

export default PageHeader
