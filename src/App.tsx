import React from 'react';
import Button,{ButtonType,ButtonSize} from './components/Button/button'
import Alert,{AlertType} from './components/Alert/alert'
function App() {
  return (
    <div className="App">
      <h1>Button</h1>
      <Button></Button>
      <Button btnSize={ButtonSize.Large} btnType={ButtonType.Primary} onClick={()=>{alert('hello word')}}>Hello Word</Button>
      <Button btnType={ButtonType.Default} btnSize={ButtonSize.Small} disabled={true}>TypeScript</Button>
      <Button btnType={ButtonType.Link} href='//www.baidu.com'  target='_blank'>baidu</Button>
      <Button btnType={ButtonType.Danger} autoFocus>Danger</Button>
      <h1>Alert</h1>
      <Alert alertType={AlertType.Success} message='title'></Alert>
      <br />
      <Alert alertType={AlertType.Info} message='title' description='infinfoinfoinfoinfoo'></Alert>
      <br />
      <Alert closable={true} alertType={AlertType.Danger} message='title' description='dangerdangerdangerdanger'></Alert>
      <br />
      <Alert 
        onClose={()=>{console.log('close alert')}}
        closable={true} 
        alertType={AlertType.Warning} 
        message='title' 
        description='warningwarningwarningwarning'
      >
      </Alert>

    </div>
  );
}

export default App;
