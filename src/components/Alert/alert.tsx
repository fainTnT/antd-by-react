import React, { useState, useEffect } from "react";
import classnames from 'classnames'

export enum AlertType {
  Info = 'info',
  Success = 'success',
  Danger = 'danger',
  Warning = 'warning'
}

interface iAlertProps {
  className?: string;
  alertType?: AlertType;
  message?: string;
  description?: string;
  closable?: boolean;
  showIcon?:boolean;
  onClose?: () => any
}

type NativeAlertProps = iAlertProps & React.HTMLAttributes<HTMLElement>

const Alert: React.FC<NativeAlertProps> = (props) => {
  const [show, setShow] = useState<boolean>(true)
  const [fadeOut, setFadeOut] = useState<boolean>(false)
  const [font, setFont] = useState<React.ReactNode>()
  const {
    className,
    alertType,
    message,
    description,
    closable,
    showIcon,
    onClose,
    ...restProps // 把剩下的属性取出来
  } = props

  useEffect(() => {
    if (!!description) {
      switch (alertType) {
        case AlertType.Success:
          setFont(<i className={fontClass}>&#xe657;</i>)
          break;
        case AlertType.Info:
          setFont(<i className={fontClass}>&#xe6e5;</i>)
          break;
        case AlertType.Danger:
          setFont(<i className={fontClass}>&#xe659;</i>)
          break;
        case AlertType.Warning:
          setFont(<i className={fontClass}>&#xe663;</i>)
          break;
      }
    }else {
      switch (alertType) {
        case AlertType.Success:
          setFont(<i className={fontClass}>&#xe656;</i>)
          break;
        case AlertType.Info:
          setFont(<i className={fontClass}>&#xe6e4;</i>)
          break;
        case AlertType.Danger:
          setFont(<i className={fontClass}>&#xe658;</i>)
          break;
        case AlertType.Warning:
          setFont(<i className={fontClass}>&#xe662;</i>)
          break;
      }
    }
  }, [])

  const classname = classnames('alert', className, {
    [`alert-${alertType}`]: alertType,
    ['alert-remove']: fadeOut,
  })

  const fontClass = classnames('iconfont', {
    success: alertType === AlertType.Success,
    info: alertType === AlertType.Info,
    danger: alertType === AlertType.Danger,
    warning: alertType === AlertType.Warning,
    ['font-sm']: !description,
    ['font-lg']: !!description
  })

  const closeClick = () => {
    // 设置移除动画
    setFadeOut(true)
    // 动画结束后移除DOM
    setTimeout(() => {
      setShow(false)
    }, 1000)
    // 点击关闭回调
    if (!onClose) return
    onClose()
  }
  if (show) {
    return (
      <div className={classname} {...restProps}>
        {showIcon && font}
        <div className="alert-content">
          <p className="alert-message">{message}</p>
          <p className="alert-description">{description}</p>
        </div>
        {
          closable && <span className='alert-close' onClick={closeClick}>x</span>
        }
      </div>
    )
  } else {
    return <></>
  }

}

Alert.defaultProps = {
  showIcon:true,
  closable: false,
}

export default Alert;