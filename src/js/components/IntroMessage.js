import React from 'react'
import { Message, List } from 'semantic-ui-react'

const Content = () => {
  return (
    <div>
      <List as="ul" style={{marginBottom: 10, marginTop: 10}}>
        <List.Item as="li" style={{marginBottom: 10}}>
          This page is designed to serve as a startpage for your browser.
          You can add feeds and links to the page by using the input fields below.
          Feeds can also be deleted by clicking the feed's close button.
        </List.Item>
        <List.Item as="li" style={{marginBottom: 10}}>
          Please note that when adding Reddit and YouTube feeds,
          you should only include the name without any other characters.
          For example for YouTube you would only import the channel's name found in the channel's URL eg. <i>www.youtube.com/</i><b>channelname</b>
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
