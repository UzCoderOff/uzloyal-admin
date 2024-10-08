import React from 'react'
import SideBar from './SideBar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './DashBoard'
import Faqs from './Faqs'
import News from "./News";
import Blogs from './Blogs'
import Services from './Services'
import Sources from './Sources'
import Error404 from './Error404'

const MainPanel = () => {
  return (
    <div className='flex flex-row w-full align-middle justify-center'>
        <SideBar/>
        <Routes>
            <Route path='/' element={<Dashboard/>} />
            <Route path='/faqs' element={<Faqs/>} />
            <Route path='/news' element={<News/>} />
            <Route path='/blogs' element={<Blogs/>} />
            <Route path='/services' element={<Services/>}/>
            <Route path='/sources' element={<Sources/>} />
            <Route path='*' element={<Error404/>} />
        </Routes>
    </div>
  )
}

export default MainPanel