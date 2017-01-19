import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

const loaderComponent = ({item}) => (
  <Dimmer active inverted>
    <Loader inverted>Loading</Loader>
  </Dimmer>
)

export default loaderComponent
