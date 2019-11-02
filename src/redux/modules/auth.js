import { createAction, handleActions } from 'redux-actions'
import axios from 'axios'

import { DEVELOPER } from '../../constants'

const loginRequest = createAction('LOGIN_REQUEST')
const loginSuccess = createAction('LOGIN_SUCCESS')
const loginFailure = createAction('LOGIN_FAILURE')

export const logout = createAction('LOGOUT')

export const login = payload => async (dispatch) => {
  dispatch(loginRequest(payload))

  const formData = new FormData()

  Object.keys(payload).forEach((item) => {
    formData.append(item, payload[item])
  })

  try {
    const res = await axios.post(`/login?developer=${DEVELOPER}`, formData) 

    if (res.data.status === 'error') {
      dispatch(loginFailure(res.data))
    } else {
      dispatch(loginSuccess(res.data))
    }
    
  } catch(e) {
    dispatch(loginFailure(e.response))
  }
}

const initialState = {
  token: null,
  error: null,
}

export const auth = handleActions({
  [loginSuccess]: (state, action) => ({ token: action.payload.message.token, error: null }),
  [loginFailure]: (state, action) => ({ ...state, error: action.payload.message }),
  [logout]: () => initialState,
}, initialState)
