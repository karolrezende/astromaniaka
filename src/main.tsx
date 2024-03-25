import ReactDOM from 'react-dom/client'
import './index.css'
import App from './Route'
import { AuthProvider } from './providers/AuthProvider'
import { DataProvider } from './providers/DataProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <DataProvider>
            <App />
        </DataProvider>
    </AuthProvider>

)
