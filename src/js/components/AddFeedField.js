import React from 'react'
import { Form, Header, Message } from 'semantic-ui-react'

// Input field UI component for adding new feeds on the page
const AddFeedField = ({
  handleChange,
  handleSubmit,
  name,
  value,
  labelText,
  defaultText,
  handleErrorDismiss,
  inputErrorMsgVisible
}) => (

  <Form error={inputErrorMsgVisible} onSubmit={handleSubmit}>
    <Header size="tiny">{labelText}</Header>
    <Form.Input
      error={inputErrorMsgVisible}
      icon={{
        onClick: handleSubmit,
        label: name,
        name: 'search',
        circular: true,
        link: true
      }}
      value={value}
      placeholder={defaultText}
      onChange={handleChange}
      name={name + "field"}
    />
    <Message
      error
      header='Channel not found'
      content='Type a'
      onDismiss={handleErrorDismiss}
    />
  </Form>

)

export default AddFeedField;
