import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/layout";
import Discover from "./pages/discover/Discover";
import Profile from "./pages/profile/profile";
import VenueInfo from "./pages/venueInfo/venueInfo";
import Login from "./pages/login/login";
import Register from "./pages/register/Register";
import Home from './pages/home/home';

const queryClient = new QueryClient();


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} /> 
            <Route path="discover" element={<Discover />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route path="venueInfo/:id" element={<VenueInfo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;