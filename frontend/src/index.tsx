import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './common/providers/UserProvider'
import { APIErrorProvider } from './common/providers/APIErrorProvider'
import { QueryClient, QueryClientProvider, QueryCache } from 'react-query'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const queryCache = new QueryCache()
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  queryCache,
})

root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <APIErrorProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </APIErrorProvider>
    </BrowserRouter>
  </QueryClientProvider>
)
