import React from 'react'
import { Message, List } from 'semantic-ui-react'

const Content = () => {
  return (
    <div>
      <List as="ul" style={{marginBottom: 10, marginTop: 10}}>
        <List.Item as="li" style={{marginBottom: 10}}>
          This page is designed to serve as a startpage for your browser.
          You can add feeds and links to the page by using the input fields below.
        </List.Item>
        <List.Item as="li" style={{marginBottom: 10}}>
        Feeds can be deleted by clicking the feed's close button, or 'Clear all feeds'.
        </List.Item>
        <List.Item as="li" style={{marginBottom: 10}}>
          Feeds are stored in to the browser's cache, so deleting browser history will also delete added feeds!    
        </List.Item>

      </List>
    </div>
  )
}

const IntroMessage = ({closeMessage}) => (
  <Message
    onDismiss={closeMessage}
    header='Welcome'
    content={Content()}
  />
)

export default IntroMessage
