import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import CustomSidebar from './components/CustomSidebar.jsx'
import Users from './components/Users.jsx'
import Home from './components/Home.jsx'
// import CustomSidebar from './components/CustomSidebar.jsx'


// const sidebar=[
//   {label:'Accounts',value:['test','jack','john','hemang']},
//   {label:'HTML',value:['mmm','nnnn','jjjj','kkkkkk']},
//   {label:'CSS',value:['wewe','rtrt','yuyu','opop']},
//   {label:'close',value:'close',image:"https://logowik.com/content/uploads/images/close1351.jpg"}
// ]

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
 
  </StrictMode>,
)


// createRoot(document.getElementById('sideBar')).render(
//   <StrictMode>
// <CustomSidebar values={sidebar} />
//   </StrictMode>
// );