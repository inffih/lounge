import React from 'react'
import { Form, Header } from 'semantic-ui-react'

// Input field UI component for adding new feeds on the page
const AddFeedField = ({handleChange, handleSubmit, name, value, labelText, defaultText}) => (
  <Form onSubmit={handleSubmit}>
    <Header size="tiny">{labelText}</Header>
    <Form.Input
      icon={{
        onClick: handleSubmit,
        label: name,
        name: 'plus',
        circular: true,
        link: true
      }}
      value={value}
      placeholder={defaultText}
      onChange={handleChange}
      name={name + "field"}
    />
  </Form>
)

export default AddFeedField;
