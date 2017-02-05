import React from 'react'
import Masonry from 'react-masonry-component'

const masonryOptions = {
  gutter: 15
}

const MasonryList = ({feeds}) => {

  let listElements = feeds.map(function(element, index){
    return <div key={index}>{element}</div>
  })

  return(
    <Masonry options={masonryOptions}>{listElements}</Masonry>
  )
}

export default MasonryList
