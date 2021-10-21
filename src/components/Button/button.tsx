import React from "react";
import classnames from 'classnames'

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link'
}

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm'
}

interface iBaseButtonProps {
  className?:string;
  btnType?:ButtonType;
  btnSize?:ButtonSize;
  href?:string;
  disabled?:boolean;
  children:React.ReactNode
}

// 需要给组件加事件以及标签自带的属性 &：将类型合并
// button上自带的属性
type NativeButtonProps = iBaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
// a标签自带的属性
type NativeAnchorProps = iBaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
// Partial 让类型变成可选的（a标签与button上有些属性不共用）
export type ButtonProps = Partial<NativeButtonProps & NativeAnchorProps>


const Button:React.FC<ButtonProps> = (props) => {
  const {
    className,
    btnType,
    btnSize,
    disabled,
    href,
    children,
    ...restProps // 把剩下的属性取出来
  } = props

  // 键为类名，值为布尔值，避免在标签上写一长串类名判断
  const classname = classnames('btn',className,{
    [`btn-${btnSize}`]:btnSize,
    [`btn-${btnType}`]:btnType,
    [`btn-${className}`]:className,
    disabled:(btnType===ButtonType.Link)&&disabled,
  })

  Button.defaultProps = {
    disabled:false,
    btnType:ButtonType.Default,
    children:'Button'
  }

  if(btnType === ButtonType.Link){
    return <a className={classname} href={href} {...restProps}>{children}</a>
  }else {
    return <button className={classname} disabled={disabled} {...restProps}>{children}</button>
  }
}

export default Button;