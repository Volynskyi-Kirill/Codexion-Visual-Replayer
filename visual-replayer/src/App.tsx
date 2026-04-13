import './App.css'
import { APP_TITLE, UPLOAD_PROMPT } from './constants'

function App() {
  return (
    <div className="app-container">
      <h1>{APP_TITLE}</h1>
      <p>{UPLOAD_PROMPT}</p>
    </div>
  )
}

export default App
