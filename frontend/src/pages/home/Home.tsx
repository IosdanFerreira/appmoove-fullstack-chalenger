import { AlertCircle, Loader2, Search, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { User } from "@/api/interfaces/user.interface";
import { getAllUsers } from "../../api/modules/user/get-all";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Home() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users", page, search],
    queryFn: () => getAllUsers(page, search),
  });

  const handleSearch = () => {
    setPage(1);
    setSearch(searchInput.trim());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Users className="h-6 w-6 text-blue-600" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Gerenciamento de Usuários
          </h1>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Filtrar por nome..."
              value={searchInput}
              onChange={(e) => {
                const value = e.target.value;
                setSearchInput(value);
                if (value === "") {
                  setPage(1);
                  setSearch("");
                }
              }}
              onKeyDown={handleKeyPress}
              className="w-full  py-2 rounded-lg bg-white/90 backdrop-blur-sm"
            />
          </div>
          <Button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <Search className="h-4 w-4 mr-2" />
            Buscar
          </Button>
        </div>
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
          <p className="text-gray-600">Carregando usuários...</p>
        </div>
      )}

      {isError && (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <AlertCircle className="h-8 w-8 text-red-600" />
          <p className="text-red-600 font-medium">Erro ao carregar usuários</p>
          <p className="text-sm text-gray-600 max-w-md text-center">
            {error.message}
          </p>
          <Button
            variant="outline"
            className="mt-2"
            onClick={() => window.location.reload()}
          >
            Tentar novamente
          </Button>
        </div>
      )}

      {users?.items?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
          <Users className="h-12 w-12 text-gray-400" />
          <h3 className="text-xl font-semibold text-gray-700">
            Nenhum usuário encontrado
          </h3>
          <p className="text-gray-500 max-w-md">
            {search
              ? "Não encontramos resultados para sua busca."
              : "Parece que não há usuários cadastrados ainda."}
          </p>
          {search ? (
            <Button
              variant="outline"
              onClick={() => {
                setSearchInput("");
                setSearch("");
              }}
            >
              Limpar busca
            </Button>
          ) : (
            <Button asChild>
              <Link to="/users/new">Cadastrar primeiro usuário</Link>
            </Button>
          )}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {users?.items?.map((user: User) => (
          <Card
            key={user.id}
            className="p-5 hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-100 group overflow-hidden"
          >
            <Link to={`/users/${user.id}`} className="block space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600 font-medium">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="overflow-hidden">
                  <h2 className="text-lg font-semibold text-gray-800 truncate group-hover:text-blue-600 transition-colors">
                    {user.name}
                  </h2>
                  <p className="text-sm text-gray-600 truncate">{user.email}</p>
                </div>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-500 mt-4">
                <span>ID: {user.id}</span>
                <span className="px-2 py-1 bg-gray-100 rounded-full">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </Link>
          </Card>
        ))}
      </div>

      {users?.meta && users.items.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 mt-6 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              Anterior
            </Button>

            <span className="text-sm text-gray-700 px-3 py-1.5 bg-gray-100 rounded-md">
              Página {page} de {users?.meta?.pagination.totalPages}
            </span>

            <Button
              variant="outline"
              onClick={() => setPage((p) => p + 1)}
              disabled={users?.meta?.pagination.totalPages === page}
              className="gap-1"
            >
              Próxima
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </Button>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-medium">Total:</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
              {users?.meta?.pagination.totalItems} usuários
            </span>
          </div>
        </div>
      )}
    </main>
  );
}
