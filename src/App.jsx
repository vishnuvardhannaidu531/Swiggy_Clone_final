import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Header'
import FoodOption from './FoodOption'
import GroceryOption from './Component/GroceryOption'
import DineOption from './Component/DineOption'
import Restaurant from './Component/Restaurant'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Component/Home'
import RestaurantMenu from './Component/RestaurantMenu'
import SearchFood from './Component/SearchFood'
import SecondaryHome from './Component/SecondaryHome'
import store from "./Stored/Store"
import { Provider } from 'react-redux'
import Checkout from './Component/Checkout'
function App() {

  return (
    <>
      <Provider store={store}>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route element={<SecondaryHome/>}>
        <Route path='/restaurant' element={<Restaurant/>}></Route>
        <Route path='/city/mumbai/:id' element={<RestaurantMenu/>}></Route>
        <Route path='/city/mumbai/:id/search' element={<SearchFood/>}></Route>
        <Route path='/Checkout' element={<Checkout/>}></Route>
        </Route>
      </Routes>
      </BrowserRouter>
      </Provider>
      

    </>
  )
}

export default App
