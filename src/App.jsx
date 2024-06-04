import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import AppRouter from "./components/appRouter/AppRouter";

import './App.css'
import './index.css';


function App() {
  return (
    <div className="w-screen min-h-screen flex flex-col justify-between font-montserrat">
      <Navbar />
      <AppRouter />
      <Footer />
    </div>
  );
  
}

export default App
