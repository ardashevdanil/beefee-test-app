import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Field } from 'react-final-form'

import { editTask } from '../redux/modules/tasks'

export const EditTask = ({ selectedTask }) => {
  const dispatch = useDispatch()

  const [task] = useSelector(state => ([
    state.tasks.data.tasks.find(t => selectedTask === t.id),
  ]))

  const onSubmit = values => dispatch(editTask({ values, id: selectedTask }))

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={task}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <h3>Edit task</h3>
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
          <label>
            <Field
              name='status'
              type='checkbox'
              parse={v => v ? 10 : 0}
              render={({ input }) => (
                <input
                  type='checkbox'
                  value={input.value}
                  checked={input.value === 10 ? true : false}
                  onChange={input.onChange}
                />
              )}
            />
            Status
          </label>
          <br />
          <br />
          <button type='submit'>Edit</button>
        </form>
      )}
    />
  )
}

EditTask.propTypes = {
  selectedTask: PropTypes.number.isRequired,
}
