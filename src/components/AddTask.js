import React from 'react'
import { useDispatch } from 'react-redux'
import { Form, Field } from 'react-final-form'

import { addTask } from '../redux/modules/tasks'

export const AddTask = () => {
  const dispatch = useDispatch()

  const onSubmit = values => dispatch(addTask(values))

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <h3>Add task</h3>
          <label>
            <Field
              name='username'
              placeholder='User name'
              component='input'
              type='text'
              required
            />
            - User name
          </label>
          <br />
          <label>
            <Field
              name='email'
              placeholder='Email'
              component='input'
              type='email'
              required
            />
            - Email
          </label>
          <br />
          <label>
            <Field
              name='text'
              placeholder='Text'
              component='textarea'
              required
            />
            - Text
          </label>
          <br />
          <br />
          <button type='submit'>Add</button>
        </form>
      )}
    />
  )
}
