import { AuthProvider } from "./context/AuthContext";
import App from "./App.jsx";
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <AuthProvider>
      <App />
  </AuthProvider>
);

