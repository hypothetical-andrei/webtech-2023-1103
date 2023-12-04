function Employee(props) {
  const { item, onSelect } = props

  return (
    <div>
      {item.name} is a {item.role} with a salary of {item.salary}
      <input type="button" value="select" onClick={() => onSelect(item.id)} />
    </div>
  )
}

export default Employee