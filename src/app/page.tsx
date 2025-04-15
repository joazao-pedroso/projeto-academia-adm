'use client'

import { Trash, Users, UserPen  } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation"
export default function Home() {
  const router = useRouter()
  interface User {
    id: number;
    nome: string;
    cpf: string,
    status: boolean;
  }
const [users, setUsers] = useState<User[]>([])
async function handleGetUsers() {
  const request = await fetch('https://api-academia-alpha.vercel.app/gym')
  const data = await request.json()
  const safeUsers = Array.isArray(data) ? data : []
  setUsers(safeUsers)
}

const handleDeleteUser = async (id: number) => {
  try {
    const response = await fetch(`https://api-academia-alpha.vercel.app/gym/user/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error(`Erro ao deletar: ${response.statusText}`)
    }
    console.log("Usuario deletado com sucesso!")

    setUsers(users.filter((user) => user.id !== id))

} catch (error) {
    console.error("Erro ao excluir charada:", error)
}

}

useEffect(() => {
  handleGetUsers()
}, [])

  return (
    <div className="h-screen bg-gray-50 w-full pt-10 flex flex-col items-center ">
      <h1 className="text-center text-black text-3xl">Academia ADM</h1>
      <div className="container mt-5 w-full h-[80%] ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-3">
              <Users className="h-6 w-6 text-black" />
              <h2 className="text-xl font-semibold text-gray-800">Lista de Usuários</h2>
              <button onClick={() => router.push('/create')} className="ml-auto px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 cursor-pointer transition-all shadow-md">
              Novo Usuário
            </button>

            </div>
          </div>
          {users.length > 0? 
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CPF
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
               </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                      {user.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.nome}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.cpf}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {user.status == true ? 
                        <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                            Ativo
                        </span>
                      :
                      <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'>
                      Inativo
                      </span>
                    }
                    </td>
                    <td className=" flex  gap-3 px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <button onClick={ () => handleDeleteUser(user.id)} className="border-red-100 border cursor-pointer hover:bg-transparent hover:border-red-800 transition-all bg-red-100 text-red-800 w-7 h-7 rounded flex items-center justify-center">
                      <Trash className="h-4 w-4" />
                    </button>
                    <button onClick={ () => router.push(`/edit?id=${user.id}`)} className="border-blue-100 border cursor-pointer hover:bg-transparent hover:border-blue-800 transition-all bg-blue-100 text-blue-800 w-7 h-7 rounded flex items-center justify-center">
                      <UserPen className="h-4 w-4" />
                    </button>     
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
         :   <div className="p-4 text-center text-gray-500">Nenhum usuário cadastrado.</div>
        }
        </div>
        
      </div>
      </div>
    </div>
  );
}
