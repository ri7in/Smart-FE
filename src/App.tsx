import React from "react";
import AppRoutes from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './index.css'; 
import { AuthProvider } from "./contexts/AuthContext";
import router from "./routes";


const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100">
        <AuthProvider>
          {" "}
          <AppRoutes router={router} />
        </AuthProvider>
      </div>
    </QueryClientProvider>
  );
};

export default App;
