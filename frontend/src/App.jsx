import "./App.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateProduct from "./pages/Admin/Products/CreateProduct/CreateProduct";
import ViewProduct from "./pages/Admin/Products/ViewProduct/ViewProduct";
import RestaurantRegistration from "./pages/Restaurant/registration/RestaurantRegistration";
import RestaurantLogin from "./pages/Restaurant/login/RestaurantLogin";
import RestaurantDashboard from "./pages/Restaurant/RestaurantDashboard";
import ViewRestaurants from "./pages/Admin/AdminRestaurant/ViewRestaurants";
import UserNavbar from "./pages/User/UserNavbar";
// import SelectProduct from "./pages/Restaurant/SelectProduct";




function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admindashboard" element={<AdminDashboard />}>
            <Route
              path="/admindashboard/createproduct"
              element={<CreateProduct />}
            />
            <Route
              path="/admindashboard/viewproduct"
              element={<ViewProduct />}
            />
            <Route
              path="/admindashboard/viewrestaurants"
              element={<ViewRestaurants />}
            />
          </Route>

          {/* restaurant routes */}
          <Route path="/restaurant" element={<RestaurantRegistration/>} />
          <Route path="/restaurantlogin" element={<RestaurantLogin/>} />
          <Route path="/restaurantdashboard" element={<RestaurantDashboard/>}>
              <Route
                  path="/restaurantdashboard/createproduct"
                  element={<CreateProduct />}
                />
                <Route
                  path="/restaurantdashboard/viewproduct"
                  element={<ViewProduct />}
                />
                
          </Route>

          {/* user routes */}
          <Route path="/userlogin" element={<UserNavbar/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
