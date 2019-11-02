import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { Tasks } from './components/Tasks'
import { Login } from './components/Login'
import { EditTask } from './components/EditTask'
import { AddTask } from './components/AddTask'

export const App = () => {
  const [selectedTask, setSelectedTask] = useState(0);
  const token = useSelector(state => state.auth.token)

  return (
    <div>
      <Login />
      <Tasks setSelectedTask={setSelectedTask} />
      {token && selectedTask ? <EditTask selectedTask={selectedTask} /> : null}
      <AddTask />
    </div>
  )
}
