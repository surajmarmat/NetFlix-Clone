import './App.css';
import Body from './components/body'

function App() {
  localStorage.setItem('count', 0);
  return (
    <div className="App">
      <div className="container">
        <Body />        
      </div>
    </div>
  );
}

export default App;
