import './App.css'
import FormPage from './FormPage'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient
function App() {

  return (
    <>
    <QueryClientProvider client={queryClient}>
    <FormPage/>
    </QueryClientProvider>
    </>
  )
}

export default App
