import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'

import {QueryClient, QueryClientProvider} from "react-query"
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./entities";
import './index.css'

import './shared/static/vars.css';


const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </AuthProvider>
        </QueryClientProvider>
    </React.StrictMode>,
)


