import React from 'react'

const Button = ({text, color}) => {
  return (
    <div>
      <button style={{ backgroundColor: color}}
      className={`p-2 px-4 cursor-pointer rounded-md`}
      >
        {text}

      </button>
    </div>
  )
}

export default Button
