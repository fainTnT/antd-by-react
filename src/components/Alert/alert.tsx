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
  onClose?: () => any
}

const Alert: React.FC<iAlertProps> = (props) => {
  const [show, setShow] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  const [font, setFont] = useState('')
  const {
    className,
    alertType,
    message,
    description,
    closable,
    onClose
  } = props

  useEffect(() => {
    if (!!description) {
      switch (alertType) {
        case AlertType.Success:
          setFont('&#xe657;')
          break;
        case AlertType.Info:
          setFont('&#xe6e5;')
          break;
        case AlertType.Danger:
          setFont('&#xe659;')
          break;
        case AlertType.Warning:
          setFont('&#xe663;')
          break;
      }
    }else {
      switch (alertType) {
        case AlertType.Success:
          setFont('&#xe656;')
          break;
        case AlertType.Info:
          setFont('&#xe6e4;')
          break;
        case AlertType.Danger:
          setFont('&#xe658;')
          break;
        case AlertType.Warning:
          setFont('&#xe662;')
          break;
      }
    }
  }, [])

  const classname = classnames('alert', className, {
    [`alert-${alertType}`]: alertType,
    ['alert-remove']: fadeOut,
  })

  const fontClass = classnames('iconfont', {
    success: alertType == AlertType.Success,
    info: alertType == AlertType.Info,
    danger: alertType == AlertType.Danger,
    warning: alertType == AlertType.Warning,
    ['font-sm']: !description,
    ['font-lg']: !!description
  })

  Alert.defaultProps = {
    closable: false,
  }

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
      <div className={classname}>
        <i className={fontClass}>{font}</i>
        <div className="alert-content">
          <p className="alert-message">{message}</p>
          <p className="alert-description">{description}</p>
        </div>
        {
          closable ? <span className='alert-close' onClick={closeClick}>x</span> : <></>
        }
      </div>
    )
  } else {
    return <></>
  }

}

export default Alert;