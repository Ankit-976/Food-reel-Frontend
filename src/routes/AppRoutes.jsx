import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserRegister from '../pages/UserRegister'
import UserLogin from '../pages/UserLogin'
import FoodPartnerRegister from '../pages/FoodPartnerRegister'
import FoodPartnerLogin from '../pages/FoodPartnerLogin'
import Home from '../pages/general/Home'
import CreateFood from '../pages/food-partner/CreateFood'
import Profile from '../pages/food-partner/Profile'
import Hero from '../pages/Hero'

const AppRoutes = () => {
    return(
        <Router>
            <Routes>
                <Route path='/user/register' element = {<UserRegister />} />
                <Route path='/user/login' element = {<UserLogin />} />
                <Route path='/food-partner/register' element = {<FoodPartnerRegister />} />
                <Route path='/food-partner/login' element = {<FoodPartnerLogin />} />
                <Route path='/home' element = {<Home />} />
                <Route path='/' element = {<Hero />} />
                <Route path='/create-food' element = {<CreateFood />} />
                <Route path='/food-partner/:id' element = {<Profile />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes;