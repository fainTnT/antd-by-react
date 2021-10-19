import React from 'react'

interface iHelloProps {
  message?:string
}

const Hello:React.FC<iHelloProps>= (props) => {
  return (
    <h2>hello {props.message}</h2>
  )
}
Hello.defaultProps= {
  message:'yyyyyyy'
}

export default Hello

