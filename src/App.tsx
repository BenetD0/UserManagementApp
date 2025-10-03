import { BrowserRouter, Routes, Route } from "react-router-dom";
import UsersList from "./pages/UsersList";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import NotFound from "./pages/NotFound";

const App = () => {
  return <BrowserRouter>
  <Routes>

      <Route path="/" element={<UsersList />}/>
      <Route path="/add" element={<AddUser />}/>
      <Route path="/edit/:id" element={<EditUser />}/>
      <Route path="*" element={<NotFound />}/>

    </Routes>
    </BrowserRouter>;
};

export default App;