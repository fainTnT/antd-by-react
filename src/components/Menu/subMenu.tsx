import React, { useState,useContext, FunctionComponentElement } from "react";
import classNames from "classnames";
import { menuContext } from "./menu";
import { menuItemProps } from './menuItem'
export interface SubMenuProps {
  index?: string;
  title?: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const {
    index,
    title,
    className,
    children
  } = props
  
  const context = useContext(menuContext)
  // 设置默认展开
  const defaultOpenMenu = context.defaultOpenMenu as Array<string> // 不传是undefined所以做一个断言
  const isOpen = defaultOpenMenu&&defaultOpenMenu.includes(index)?true:false;
  const [toggle,setToggle] = useState<boolean>(isOpen)
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index.split('-')[0] === index
  })
  const toggleClasses = classNames('viking-submenu',{
    'menu-opened':toggle
  })
  // 横向时鼠标移入移出判断下拉显示
  let timer:any;
  const handleMouse = (e:React.MouseEvent,isShow:boolean) => {
    e.preventDefault()
    clearTimeout(timer)
    timer = setTimeout(()=>{
      setToggle(isShow)
    },300)
  }
  const mouseEvents = context.mode !== 'vertical'?{
    onMouseEnter:(e:React.MouseEvent)=>{handleMouse(e,true)},
    onMouseLeave:(e:React.MouseEvent)=>{handleMouse(e,false)},
  }:{}
  // 纵向时鼠标点击判断下拉显示
  const handleClick = (e:React.MouseEvent) => {
    e.preventDefault()
    setToggle(!toggle)
  }
  const clickEvents = context.mode === 'vertical'?{
    onClick:handleClick
  }:{}
  const renderChildren = () => {
    return React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<menuItemProps>
      const { displayName } = childElement.type
      // 判断在标签内存在不是MenuItem的标签
      if (displayName === 'MenuItem') {
        // 给每个MenuItem添加index参数
        return React.cloneElement(childElement, {
          index:`${index}-${i}`
        })
      } else {
        console.error('警告：SubMnue中存在不是MenuItem的标签')
      }
    })
  }
  return (
    <li key={index} className={classes} {...mouseEvents}>
      <div className='submenu-title' {...clickEvents}>
        {title}
      </div>
      <ul className={toggleClasses}>
        {renderChildren()}
      </ul>
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu


