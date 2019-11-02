import React from 'react'
import PropTypes from 'prop-types'

export const Select = ({ onChange, name }) => (
  <select
    onChange={onChange}
    data-type={name}
  >
    <option>asc</option>
    <option>desc</option>
  </select>
)

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
}
