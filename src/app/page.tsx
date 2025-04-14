'use client'

import { Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation"
export default function Home() {
  const router = useRouter()
  interface User {
    id: number;
    nome: string;
    status: boolean;
  }
const [users, setUsers] = useState<User[]>([])
async function handleGetUsers() {
  let request = await fetch('https://api-academia-alpha.vercel.app/gym')
  let data = await request.json()
  setUsers(data)
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
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acoes
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.nome}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
      </div>
      </div>
    </div>
  );
}
