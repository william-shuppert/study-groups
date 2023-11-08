import React from 'react'
import Select from 'react-select';

const daysOptions = [
    { value: 'sunday', label: 'Sunday' },
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
  ]
  

const DaySelection = ({ onChange, value, required=false }) => {
  return (
    <Select
        value={value}
        isMulti
        name="meeting-days"
        options={daysOptions}
        className="multi-select"
        classNamePrefix="select"
        onChange={onChange}
        required={required}
    />
  )
}

export default DaySelection