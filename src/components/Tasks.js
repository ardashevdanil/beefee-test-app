import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'

import { Select } from '../components/Select'
import { fetchTasks } from '../redux/modules/tasks'

export const Tasks = ({ setSelectedTask }) => {
  const [
    token,
    tasks,
    pages,
    error,
  ] = useSelector(state => [
    state.auth.token,
    state.tasks.data.tasks,
    Math.ceil(state.tasks.data.total_task_count / 3) + 1,
    state.tasks.error,
  ])

  const [sortOptions, setSortOptions] = useState({})

  const dispatch = useDispatch()

  const onButtonClick = (page) => {
    setSortOptions({
      ...sortOptions,
      page,
    })
  }

  const onChange = (e) => {
    setSortOptions({
      ...sortOptions,
      sort_field: e.target.dataset.type,
      sort_direction: e.target.value,
    })
  }

  useEffect(() => {
    dispatch(fetchTasks(sortOptions))
  }, [dispatch, sortOptions])

  if (error) return <div>Error: {Object.keys(error).map(k => error[k]).join(', ')}</div>

  return (
    <div>
      <h3>Tasks:</h3>
      <table border='1' cellPadding='10'>
        <tbody>
          <tr>
            <th>
              User name&nbsp;
              <Select name='username' onChange={onChange}/>
            </th>
            <th>
              Email
              <Select name='email' onChange={onChange}/>
            </th>
            <th>
              Text
            </th>
            <th>
              Status
              <Select name='status' onChange={onChange}/>
            </th>
          </tr>
          {
            tasks.length
              ? tasks.map(t => (
                <tr
                  key={t.id}
                  onClick={() => token ? setSelectedTask(t.id) : null}
                  style={{ cursor: token ? 'pointer' : 'initial' }}
                >
                  <td>{t.username}</td>
                  <td>{t.email}</td>
                  <td>{t.text}</td>
                  <td>{t.status === 10 ? 'Done' : 'Todo'}</td>
                </tr>
              ))
              : null
          }
        </tbody>
      </table>
      <div>
        Pages:&nbsp;
        {
          pages
            ? [...Array(pages).keys()].slice(1).map(p => (
              <button
                key={p}
                onClick={() => onButtonClick(p)}
                type='button'
                style={{
                  color: p === sortOptions.page && 'red',
                }}
              >
                {p}
              </button>
            ))
            : null
        }
      </div>
    </div>
  )
}

Tasks.propTypes = {
  setSelectedTask: PropTypes.func.isRequired,
}
