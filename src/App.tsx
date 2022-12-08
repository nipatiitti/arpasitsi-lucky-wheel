import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Admin from './routes/Admin'
import Wheel from './routes/Wheel'

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Wheel />} />
            <Route path="/admin" element={<Admin />} />
        </>
    )
)

const App = () => <RouterProvider router={router} />

export default App
