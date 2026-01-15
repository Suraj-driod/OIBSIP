import { useState } from 'react'
import './Calculator.css'

const Calculator = () => {
  const [display, setDisplay] = useState('0')
  const [equation, setEquation] = useState('')
  const [hasResult, setHasResult] = useState(false)

  const operators = ['+', '-', '×', '÷']

  const handleNumber = (num) => {
    if (hasResult) {
      setDisplay(num)
      setEquation(num)
      setHasResult(false)
      return
    }

    if (display === '0' && num !== '.') {
      setDisplay(num)
      setEquation(equation + num)
    } else if (num === '.' && display.includes('.')) {
      return
    } else {
      setDisplay(display + num)
      setEquation(equation + num)
    }
  }

  const handleOperator = (op) => {
    setHasResult(false)
    const lastChar = equation.slice(-1)
    
    if (operators.some(o => o === lastChar)) {
      setEquation(equation.slice(0, -1) + op)
    } else if (equation !== '') {
      setEquation(equation + op)
      setDisplay('0')
    }
  }

  const calculate = () => {
    if (!equation) return

    try {
      let evalEquation = equation
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
      
      const lastChar = evalEquation.slice(-1)
      if (['+', '-', '*', '/'].includes(lastChar)) {
        evalEquation = evalEquation.slice(0, -1)
      }

      const result = eval(evalEquation)
      const formatted = Number.isInteger(result) 
        ? result.toString() 
        : parseFloat(result.toFixed(10)).toString()
      
      setDisplay(formatted)
      setEquation(formatted)
      setHasResult(true)
    } catch {
      setDisplay('Error')
      setEquation('')
    }
  }

  const clear = () => {
    setDisplay('0')
    setEquation('')
    setHasResult(false)
  }

  const deleteLast = () => {
    if (hasResult) {
      clear()
      return
    }
    
    if (display.length > 1) {
      setDisplay(display.slice(0, -1))
      setEquation(equation.slice(0, -1))
    } else {
      setDisplay('0')
      if (equation.length > 0) {
        setEquation(equation.slice(0, -1))
      }
    }
  }

  const handlePercent = () => {
    const value = parseFloat(display) / 100
    setDisplay(value.toString())
    setEquation(value.toString())
  }

  const toggleSign = () => {
    if (display !== '0') {
      const newValue = display.startsWith('-') 
        ? display.slice(1) 
        : '-' + display
      setDisplay(newValue)
      
      const match = equation.match(/(-?\d+\.?\d*)$/)
      if (match) {
        const newEquation = equation.slice(0, -match[0].length) + newValue
        setEquation(newEquation)
      }
    }
  }

  const buttons = [
    { label: 'C', action: clear, type: 'function' },
    { label: '±', action: toggleSign, type: 'function' },
    { label: '%', action: handlePercent, type: 'function' },
    { label: '÷', action: () => handleOperator('÷'), type: 'operator' },
    { label: '7', action: () => handleNumber('7'), type: 'number' },
    { label: '8', action: () => handleNumber('8'), type: 'number' },
    { label: '9', action: () => handleNumber('9'), type: 'number' },
    { label: '×', action: () => handleOperator('×'), type: 'operator' },
    { label: '4', action: () => handleNumber('4'), type: 'number' },
    { label: '5', action: () => handleNumber('5'), type: 'number' },
    { label: '6', action: () => handleNumber('6'), type: 'number' },
    { label: '-', action: () => handleOperator('-'), type: 'operator' },
    { label: '1', action: () => handleNumber('1'), type: 'number' },
    { label: '2', action: () => handleNumber('2'), type: 'number' },
    { label: '3', action: () => handleNumber('3'), type: 'number' },
    { label: '+', action: () => handleOperator('+'), type: 'operator' },
    { label: 'DEL', action: deleteLast, type: 'function' },
    { label: '0', action: () => handleNumber('0'), type: 'number' },
    { label: '.', action: () => handleNumber('.'), type: 'number' },
    { label: '=', action: calculate, type: 'equals' },
  ]

  return (
    <div className="calculator">
      <div className="display">
        <div className="equation">{equation || '0'}</div>
        <div className="result">{display}</div>
      </div>
      <div className="buttons">
        {buttons.map((btn, idx) => (
          <button
            key={idx}
            className={`btn btn-${btn.type}`}
            onClick={btn.action}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Calculator
