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
const [searchTerm, setSearchTerm] = useState('')
const filteredUsers = users.filter((user) =>
  user.nome.toLowerCase().includes(searchTerm.toLowerCase())
)
async function handleGetUsers() {
  const request = await fetch('https://api-academia-alpha.vercel.app/gym')
  const data = await request.json()
  const safeUsers = Array.isArray(data) ? data : []
  setUsers(safeUsers)
}

const handleDeleteUser = async (id: number) => {
  const confirmDelete = confirm("Deseja excluir o usuario?")
  if (confirmDelete == true){
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
}}
return

}

useEffect(() => {
  handleGetUsers()
}, [])

  return (
    <div className="h-screen bg-black w-full pt-10 flex flex-col items-center text-white">
    <h1 className="text-center text-white text-3xl">Pulse Fit</h1>
  
    <div className="container mt-5 w-full h-[80%]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0d0d0d] rounded-lg shadow-lg overflow-hidden border border-[#2a2a2a]">
          <div className="px-6 py-4 border-b border-[#2a2a2a] bg-black">
            <div className="flex items-center space-x-3">
              <Users className="h-6 w-6 text-white" />
              <h2 className="text-xl font-semibold text-white">Lista de Usuários</h2>
              <button 
                onClick={() => router.push('/create')} 
                className="ml-auto px-4 py-2 bg-transparent border border-gray-200 text-gray-200 hover:text-black rounded-lg hover:bg-gray-200 cursor-pointer transition-all shadow-md"
              >
                Novo Usuário
              </button>
            </div>
          </div>
  
          {users.length > 0 ? (
            <div className="overflow-x-auto">
              <div className="px-6 py-4 bg-black">
                <input
                  type="text"
                  placeholder="Buscar usuário por nome..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 rounded border border-[#2a2a2a] bg-[#1a1a1a] text-white placeholder-gray-500"
                />
              </div>
              <table className="min-w-full divide-y divide-[#2a2a2a]">
                <thead className="bg-black">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Nome</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">CPF</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="bg-[#0d0d0d] divide-y divide-[#2a2a2a]">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-[#1a1a1a] transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{user.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{user.nome}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{user.cpf}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {user.status === true ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-800 text-green-100">
                            Ativo
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-800 text-red-100">
                            Inativo
                          </span>
                        )}
                      </td>
                      <td className="flex gap-3 px-6 py-4 whitespace-nowrap text-sm text-white">
                        <button 
                          onClick={() => handleDeleteUser(user.id)} 
                          className=" border cursor-pointer hover:text-white border-red-500 text-red-500 transition-all hover:bg-red-500 w-7 h-7 rounded flex items-center justify-center"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => router.push(`/edit?id=${user.id}`)} 
                          className="border cursor-pointer hover:bg-blue-500 border-blue-500 transition-all bg-transparent text-blue-500 hover:text-white w-7 h-7 rounded flex items-center justify-center"
                        >
                          <UserPen className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-4 text-center text-gray-400">Nenhum usuário cadastrado.</div>
          )}
        </div>
      </div>
    </div>
  </div>
  
  );
}
