import SignUpPage from './pages/SignUpPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import TransactionPage from './pages/TransactionPage'
import NotFoundPage from './pages/NotFoundPage'
import {Routes, Route} from 'react-router-dom'
import Header from './components/ui/Header'


function App() {
  const authUser=false;
  return (
    <>
      {/* {authUser && <Header/>}
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='login' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/transaction/:id' element={<TransactionPage/>}/>
        <Route path="" element={<NotFoundPage/>}/>
      </Routes> */}
      <HomePage/>
    </>
  )
}

export default App
