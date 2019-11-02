import { createAction, handleActions, combineActions } from 'redux-actions'
import axios from 'axios'

import { DEVELOPER } from '../../constants'

const fetchTasksRequest = createAction('FETCH_TASKS_REQUEST')
const fetchTasksSuccess = createAction('FETCH_TASKS_SUCCESS')
const fetchTasksFailure = createAction('FETCH_TASKS_FAILURE')

export const fetchTasks = (payload = {}) => async (dispatch) => {
  dispatch(fetchTasksRequest())

  try {
    const res = await axios('/', {
      params: {
        developer: DEVELOPER,
        ...payload
      }
    })

    if (res.data.status === 'error') {
      dispatch(fetchTasksFailure(res.data))
    } else {
      dispatch(fetchTasksSuccess(res.data))
    }

  } catch (e) {
    dispatch(fetchTasksFailure(e.response))
  }
}

const addTaskRequest = createAction('ADD_TASK_REQUEST')
const addTaskSuccess = createAction('ADD_TASK_SUCCESS')
const addTaskFailure = createAction('ADD_TASK_FAILURE')

export const addTask = payload => async (dispatch) => {
  dispatch(addTaskRequest())

  const formData = new FormData()

  Object.keys(payload).forEach((item) => {
    formData.append(item, payload[item])
  })

  try {
    const res = await axios.post(`/create?developer=${DEVELOPER}`, formData)

    if (res.data.status === 'error') {
      dispatch(addTaskFailure(res.data))
    } else {
      dispatch(addTaskSuccess(res.data))
      dispatch(fetchTasks())
    }

  } catch (e) {
    dispatch(addTaskFailure(e.response))
  }
}

const editTaskRequest = createAction('EDIT_TASK_REQUEST')
const editTaskSuccess = createAction('EDIT_TASK_SUCCESS')
const editTaskFailure = createAction('EDIT_TASK_FAILURE')

export const editTask = ({ values, id }) => async (dispatch, getState) => {
  dispatch(editTaskRequest())

  const { token } = getState().auth
  const formData = new FormData()

  formData.append('token', token)

  Object.keys(values).forEach((item) => {
    formData.append(item, values[item])
  })

  try {
    const res = await axios.post(`/edit/${id}?developer=${DEVELOPER}`, formData)

    if (res.data.status === 'error') {
      dispatch(editTaskFailure(res.data))
    } else {
      dispatch(editTaskSuccess(res.data))
      dispatch(fetchTasks())
    }

  } catch (e) {
    dispatch(editTaskFailure(e.response))
  }
}

const initialState = {
  data: { tasks: [], total_task_count: 0 },
  error: null,
}

export const tasks = handleActions({
  [fetchTasksSuccess]: (state, action) => ({ data: action.payload.message, error: null }),
  [combineActions(
    fetchTasksFailure,
    addTaskFailure,
    editTaskFailure,
  )]: (state, action) => ({ ...state, error: action.payload.message }),
}, initialState)
