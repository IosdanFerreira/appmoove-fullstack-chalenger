import { Cloud, Home, Menu, UserPlus, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { useState } from "react";

export function Header() {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Página Inicial", icon: <Home size={18} /> },
    {
      path: "/users/new",
      label: "Cadastro de Usuário",
      icon: <UserPlus size={18} />,
    },
    { path: "/weather", label: "Clima da Cidade", icon: <Cloud size={18} /> },
  ];

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cloud size={28} className="text-white" />
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
            WeatherApp
          </h1>
        </div>

        {/* Botão hambúrguer mobile */}
        <button
          className="lg:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors"
          onClick={() => setIsOpen(true)}
          aria-label="Abrir menu"
        >
          <Menu size={24} />
        </button>

        {/* Navegação desktop */}
        <nav className="hidden lg:flex gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                pathname === item.path
                  ? "bg-white/20 text-white"
                  : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Overlay mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black/80 transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Menu mobile - Removido o gradiente e ajustado o bg */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-blue-600 shadow-xl z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-blue-700">
          <div className="flex items-center gap-2">
            <Cloud size={24} className="text-white" />
            <h2 className="text-xl font-semibold text-white">Menu</h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Fechar menu"
          >
            <X size={24} className="text-white" />
          </button>
        </div>

        <nav className="flex flex-col p-4 gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all ${
                pathname === item.path
                  ? "bg-white/20 text-white"
                  : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </header>
  );
}
