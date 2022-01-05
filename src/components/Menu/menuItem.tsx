import React,{useContext} from 'react'
import classNames from 'classnames'
import {menuContext} from './menu'
export interface menuItemProps {
  index?: number,
  disable ?: boolean;
  style ?: React.CSSProperties;
  className ?: string;
}

const MenuItem:React.FC<menuItemProps> = (props) => {
  const {
    index,
    disable,
    style,
    className,
    children
  } = props

  const context = useContext(menuContext)

  const classes = classNames('menu-item',className,{
    'is-disabled':disable,
    'is-active':context.index === index
  })

  const handleClick = () => {
    if(context.onSelect && !disable&&(typeof index === 'number')){
      context.onSelect(index)
    }
  }

  return (
    <li style={style} className={classes} onClick={handleClick}>
      {children}
    </li>
  )
}
MenuItem.displayName = 'MenuItem'
export default MenuItem