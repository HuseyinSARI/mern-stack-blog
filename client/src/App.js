import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

//  #region ---------------[ Import Components ]-----------------
import BlogDetail from "./pages/BlogDetail";
import BlogList from "./pages/BlogList";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NewBlog from "./pages/NewBlog";
import PrivateRoute from "./pages/PrivateRoute";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
// import EditBlog from "./pages/EditBlog";
//  #endregion ---------------------------------------------------

function App() {
  return (<>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route path='/blogs' element={<PrivateRoute />}>
          <Route path='/blogs' element={<BlogList />} />
        </Route>
        <Route path='/blogs/:id' element={<PrivateRoute />}>
          <Route path='/blogs/:id' element={<BlogDetail />} />
        </Route>
        <Route path='/newblog' element={<PrivateRoute />}>
          <Route path='/newblog' element={<NewBlog />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>);
}

export default App;
