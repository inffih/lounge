import React from 'react'
import Masonry from 'react-masonry-component'

const masonryOptions = {
  gutter: 20
}

const styles = {
  marginBottom: 10,
  marginTop: 10
}

const MasonryList = ({feeds}) => {

  let listElements = feeds.map(function(element, index){
    return <div style={styles} key={index}>{element}</div>
  })

  return(
    <Masonry options={masonryOptions}>{listElements}</Masonry>
  )
}

export default MasonryList
