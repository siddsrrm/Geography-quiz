import { HashRouter as Router} from 'react-router-dom'
import AnimatedRoutes from './Components/AnimatedRoutes'
import { QueryClient, QueryClientProvider} from 'react-query'


function App() {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <Router>
        <AnimatedRoutes/>
      </Router>
    </QueryClientProvider>
    
  )
  
}
export default App
