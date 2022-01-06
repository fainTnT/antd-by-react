import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Alert, { AlertType } from './components/Alert/alert'
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
function App() {
  return (
    <div className="App">
      <h1>Menu</h1>
      <Menu onSelect={(index) => { console.log(index) }} defaultIndex='3-1' defaultOpenMenu={['3']} mode='vertical'>
        <MenuItem>1</MenuItem>
        <MenuItem disable={true}>2</MenuItem>
        <MenuItem>3</MenuItem>
        <SubMenu title='subMenu'>
          <MenuItem>1</MenuItem>
          <MenuItem>2</MenuItem>
          <MenuItem>3</MenuItem>
        </SubMenu>
      </Menu>
      <h1>Button</h1>
      <Button></Button>
      <Button btnSize={ButtonSize.Large} btnType={ButtonType.Primary} onClick={() => { alert('hello word') }}>Hello Word</Button>
      <Button btnType={ButtonType.Default} btnSize={ButtonSize.Small} disabled={true}>TypeScript</Button>
      <Button btnType={ButtonType.Link} href='//www.baidu.com' target='_blank'>baidu</Button>
      <Button btnType={ButtonType.Danger} autoFocus>Danger</Button>
      <h1>Alert</h1>
      <Alert alertType={AlertType.Success} message='title' showIcon={true}></Alert>
      <br />
      <Alert alertType={AlertType.Info} message='title' description='infinfoinfoinfoinfoo'></Alert>
      <br />
      <Alert closable={true} alertType={AlertType.Danger} message='title' description='dangerdangerdangerdanger'></Alert>
      <br />
      <Alert
        onClick={() => { console.log(1111) }}
        onClose={() => { console.log('close alert') }}
        closable={true}
        showIcon={false}
        alertType={AlertType.Warning}
        message='title'
        description='warningwarningwarningwarning'
      >
      </Alert>

    </div>
  );
}

export default App;
