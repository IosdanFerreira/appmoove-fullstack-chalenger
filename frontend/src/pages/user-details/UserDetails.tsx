import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  Loader2,
  Mail,
  User as UserIcon,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { getUserById } from "@/api/modules/user/get-by-id";
import { useQuery } from "@tanstack/react-query";

// src/pages/users/[id].tsx

export default function UserDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id!),
    enabled: !!id,
    retry: 1,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
        <p className="text-gray-600">Carregando usuário...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <AlertCircle className="h-8 w-8 text-red-600" />
        <h3 className="text-xl font-semibold text-red-600">
          Erro ao carregar usuário
        </h3>
        <p className="text-gray-600 max-w-md text-center">{error.message}</p>
        <div className="flex gap-2 mt-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <Button onClick={() => window.location.reload()}>
            Tentar novamente
          </Button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <UserIcon className="h-8 w-8 text-gray-400" />
        <h3 className="text-xl font-semibold text-gray-700">
          Usuário não encontrado
        </h3>
        <p className="text-gray-600">
          O usuário solicitado não foi encontrado.
        </p>
        <Button onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para a lista
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="gap-2 px-2"
        >
          <ArrowLeft size={18} />
          Voltar
        </Button>
      </div>

      <Card className="p-6 shadow-sm border-0 bg-gradient-to-br from-white to-gray-50">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="h-20 w-20 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-2xl font-bold border-2 border-blue-100">
            {user.items.name.charAt(0).toUpperCase()}
          </div>

          <p className="  text-blue-400 text-xs font-bold">{user.items.id}</p>

          <div>
            <h1 className="text-xl font-bold text-gray-800">
              {user.items.name}
            </h1>
            <p className="text-blue-600">{user.items.email}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-3">
          <DetailItem
            icon={<Mail className="h-4 w-4" />}
            label="Email"
            value={user.items.email}
          />
          <DetailItem
            icon={<Calendar className="h-4 w-4" />}
            label="Cadastrado em"
            value={format(new Date(user.items.createdAt), "dd/MM/yyyy")}
          />
        </div>
      </Card>
    </div>
  );
}

const DetailItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
    <div className="text-gray-500 mt-0.5">{icon}</div>
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  </div>
);
