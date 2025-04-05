import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import Home from './pages/Home.jsx';
import Toolkit from './pages/Toolkit.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import Contact from './pages/Contact.jsx';
import Signup from './pages/signup.jsx';
import Login from './pages/login.jsx';
import CraneMaintenance from './pages/CraneMaintenance.jsx';
import CraneRental from './pages/CraneRental.jsx';
import CustomSolution from './pages/CustomSolution.jsx';
import ToolkitPage from './pages/ToolkitPage.jsx';

// Create a new layout component that includes all the desired components
const MainLayout = () => {
  return (
    <div className="main-layout">
      <Home />
      <div className="section-spacing"></div>
      <Toolkit />
      <div className="section-spacing"></div>
      <About />
      <div className="section-spacing"></div>
      <Services />
      <div className="section-spacing"></div>
      <Contact />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

// Separate component to handle conditional rendering of Header and Footer
const AppContent = () => {
  const location = useLocation(); // Get the current route location
  
  // Conditionally render Header and Footer based on the route
  const shouldShowHeader = location.pathname !== '/ToolkitPage';
  const shouldShowFooter = location.pathname !== '/ToolkitPage';
  
  // Smooth scroll to top on route change
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Enable smooth scrolling
    });
  }, [location.pathname]); // Trigger on route change
  
  return (
    <>
      {shouldShowHeader && <Header />} {/* Render Header only if not on ToolkitPage */}
      <Routes>
        {/* Render the MainLayout component for the root path */}
        <Route path="/" element={<MainLayout />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/toolkit" element={<Toolkit />} />
        <Route path="/signin" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ToolkitPage" element={<ToolkitPage />} />
        <Route path="/CraneMaintenance" element={<CraneMaintenance />} />
        <Route path="/CraneRental" element={<CraneRental />} />
        <Route path="/CustomSolution" element={<CustomSolution />} />
      </Routes>
      {shouldShowFooter && <Footer />} {/* Render Footer only if not on ToolkitPage */}
    </>
  );
};

export default App;