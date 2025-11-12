import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { HistoryPage } from './pages/HistoryPage';
import { Toaster } from './components/ui/sonner';
import { Coffee, History, Sparkles } from 'lucide-react';

function Navigation() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="border-b bg-gradient-to-r from-background via-background to-primary/5 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-primary to-primary/60 rounded-xl shadow-lg">
              <Coffee className="size-6 text-primary-foreground" />
            </div>
            <div>
              <span className="font-semibold">UI Pedidos</span>
              <p className="text-xs text-muted-foreground">Sistema de Bebidas</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Link
              to="/"
              className={`px-5 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 ${
                isActive('/')
                  ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/30 scale-105'
                  : 'hover:bg-muted hover:scale-105'
              }`}
            >
              <Coffee className="size-4" />
              <span className="hidden sm:inline">Nuevo Pedido</span>
            </Link>
            <Link
              to="/historial"
              className={`px-5 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 ${
                isActive('/historial')
                  ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/30 scale-105'
                  : 'hover:bg-muted hover:scale-105'
              }`}
            >
              <History className="size-4" />
              <span className="hidden sm:inline">Historial</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <Navigation />
        
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/historial" element={<HistoryPage />} />
            <Route path="/preview_page.html" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        <Toaster position="top-right" />
      </div>
    </BrowserRouter>
  );
}