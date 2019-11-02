import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Field } from 'react-final-form'

import { login, logout } from '../redux/modules/auth'

export const Login = () => {
  const dispatch = useDispatch()
  const [error, token] = useSelector(state => [state.auth.error, state.auth.token])

  const onSubmit = values => dispatch(login(values))
  const onLogout = values => dispatch(logout(values))

  if (token) return <button type='button' onClick={onLogout}>Logout</button>

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <h3>Login</h3>
          <Field
            name='username'
            placeholder='User name'
            component='input'
            type='text'
            required
          />
          <Field
            name='password'
            placeholder='Password'
            component='input'
            type='password'
            required
          />
          <button type='submit'>Login</button>
          {error && <div>Error: {Object.keys(error).map(k => error[k]).join(', ')}</div>}
        </form>
      )}
    />
  )
}
