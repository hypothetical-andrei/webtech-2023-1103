import { useState, useEffect } from 'react'
import Employee from './Employee'

function EmployeeList() {
  const [employees, setEmployees] = useState([])
  const [selected, setSelected] = useState(-1)

  const getEmployees = async () => {
    try {
      const response = await fetch('http://localhost:8080/employees')
      const data = await response.json()
      setEmployees(data)
    } catch (error) {
      console.log(error)
    }
  }

  const selectEmployee = (id) => {
    setSelected(id)
  }

  useEffect(() => {
    getEmployees()
  }, [])

  return (
    <div>
      {
        employees.map((e) => <Employee item={e} key={e.id} onSelect={selectEmployee} />)
      }
      Selected employee id is: {selected}
    </div>
  )
}

export default EmployeeList