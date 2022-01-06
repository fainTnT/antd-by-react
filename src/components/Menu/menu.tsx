import React, { createContext, useState } from 'react'
import classNames from 'classnames'
import {menuItemProps} from './menuItem'
type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: string) => void;

export interface MenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
  defaultOpenMenu?:Array<string>
}

export interface iMenuContextProps {
  index?: string;
  onSelect?: SelectCallback;
  mode?: MenuMode
  defaultOpenMenu?:Array<string>
}

export const menuContext = createContext<iMenuContextProps>({ index: '0' })

const Menu: React.FC<MenuProps> = (props) => {
  const {
    defaultOpenMenu,
    defaultIndex,
    className,
    mode,
    style,
    onSelect,
    children
  } = props
  const [currentActive, setActive] = useState(defaultIndex)
  const classes = classNames('viking-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  })
  const handleSelect = (index: string) => {
    setActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }
  const passedContext: iMenuContextProps = {
    index: currentActive ? currentActive : '0',
    onSelect: handleSelect,
    mode,
    defaultOpenMenu
  }

  const renderChildren = () => {
    return React.Children.map(children,(child,index)=>{
      const childElement = child as React.FunctionComponentElement<menuItemProps>
      const {displayName} = childElement.type
      // 判断在标签内存在不是MenuItem的标签
      if(displayName === 'MenuItem'||displayName === 'SubMenu'){
        // 给每个MenuItem添加index参数
        return React.cloneElement(childElement,{
          index:index.toString()
        })
      }else {
        console.error('警告：Mnue中存在不是MenuItem的标签')
      }
    })
  }

  return (
    <ul className={classes} style={style}>
      <menuContext.Provider value={passedContext}>
        {renderChildren()}
      </menuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  mode: 'horizontal',
  defaultIndex: '0'
}

export default Menu