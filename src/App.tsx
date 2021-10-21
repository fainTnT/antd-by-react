import React from 'react';
import Button,{ButtonType,ButtonSize} from './components/Button/button'
function App() {
  return (
    <div className="App">
      <h1>Button</h1>
      <Button></Button>
      <Button btnSize={ButtonSize.Large} btnType={ButtonType.Primary} onClick={()=>{alert('hello word')}}>Hello Word</Button>
      <Button btnType={ButtonType.Default} btnSize={ButtonSize.Small} disabled={true}>TypeScript</Button>
      <Button btnType={ButtonType.Link} href='//www.baidu.com'  target='_blank'>baidu</Button>
      <Button btnType={ButtonType.Danger} autoFocus>Danger</Button>
    </div>
  );
}

export default App;
