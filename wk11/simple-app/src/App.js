import { useState, useEffect } from 'react'
import EmployeeList from './EmployeeList'

function App() {
  const [steps, setSteps] = useState(0)
  const [isTakeStepHidden, setIsTakeStepHidden] = useState(true)
  const [isWarningHidden, setIsWarningHidden] = useState(true)

  useEffect(() => {
    if (steps > 10) {
      setIsWarningHidden(false)
    }
  }, [steps])

  function takeStep() {
    setSteps(steps + 1)
  }

  const toggleTakeStep = () => {
    setIsTakeStepHidden(!isTakeStepHidden)
  }

  const takeStepArea = (
    <div>
      <input type="button" value="Take step" onClick={() => takeStep()} />
    </div>
  )


  return (
    <>
      <div>
        You have taken {steps} steps
      </div>
      <div>
        <input type="button" value={isTakeStepHidden ? "Show" : "Hide"} onClick={() => toggleTakeStep()} />
      </div>
      {isTakeStepHidden ? null : takeStepArea}
      {isWarningHidden ? null : "That's a lot of steps" }
      <EmployeeList />
    </>
  )
}

export default App
