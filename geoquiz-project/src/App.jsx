import styles from './App.module.css'
import { HashRouter as Router} from 'react-router-dom'
import AnimatedRoutes from './Components/AnimatedRoutes'


function App() {

  return (
    <Router>
      <AnimatedRoutes/>
    </Router>
  )
  
}
export default App
