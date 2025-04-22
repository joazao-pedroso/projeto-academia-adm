'use client'

import { Trash, Users, UserPen, LockKeyhole, LockKeyholeOpen, MessageCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  interface User {
    id: number
    nome: string
    cpf: string
    telefone: number
    status: boolean
  }

  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [popupUserId, setPopupUserId] = useState<number | null>(null)
  const [popupDeleteId, setPopupDeleteId] = useState<number | null>(null)

  const filteredUsers = users.filter((user) =>
    user.nome.toLowerCase().includes(searchTerm.toLowerCase()) || user.cpf.toLowerCase().includes(searchTerm.toLowerCase())
  )

  async function handleGetUsers() {
    const request = await fetch('https://api-academia-alpha.vercel.app/gym')
    const data = await request.json();
    const safeUsers = Array.isArray(data) ? data : []
    setUsers(safeUsers)
  }

  async function handleSendMsgWpp(id: number) {
    const response = await fetch(`https://api-academia-alpha.vercel.app/gym/user/wpp/${id}`);
    const data = await response.json()
    console.log(data)
  }

  async function handleChangeStats(id: number, status: boolean) {
    const bodyData = { status: status.toString(), id }

    try {
      const response = await fetch(`https://api-academia-alpha.vercel.app/gym/user/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyData),
      })

      if (!response.ok) {
        throw new Error(`Erro ao atualizar status: ${response.statusText}`);
      }

      const updatedUsers = users.map(user =>
        user.id === id ? { ...user, status: status } : user
      )
      setUsers(updatedUsers)

      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.error("Erro ao atualizar status:", error)
    }
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
        console.log("Usuário deletado com sucesso!");
        setUsers(users.filter((user) => user.id !== id))
        setPopupDeleteId(null)

      } catch (error) {
        console.error("Erro ao excluir usuário:", error)
      }
    
  }

  useEffect(() => {
    handleGetUsers();
  }, []);

  const renderPopupMessage = () => {
    if (popupUserId === null) return null

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
        <div className="bg-black border border-gray-50 text-white rounded-lg p-6 max-w-md w-full shadow-lg">
          <h2 className="text-xl text-center font-bold mb-4">Mensagem</h2>
          <p className="text-gray-300 text-center">
            Enviar mensagem de cobrança para esse usuario?
          </p>
          <div className="flex items-center justify-center mt-4 gap-3">
            <button
              onClick={() => setPopupUserId(null)}
              className="px-4 py-2 border-red-500 border w-40 text-red-500 hover:text-white transition-all cursor-pointer hover:bg-red-500 rounded"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                handleSendMsgWpp(popupUserId)
                setPopupUserId(null)
              }}
              className="px-4 py-2 border-lime-500 border w-40 text-lime-500 hover:text-white transition-all cursor-pointer hover:bg-lime-500 rounded"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    )
  }
  const renderPopupDelete = () => {
    if (popupDeleteId === null) return null

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
        <div className="bg-black border border-gray-50 text-white rounded-lg p-6 max-w-md w-full shadow-lg">
          <h2 className="text-xl text-center font-bold mb-4">Excluir</h2>
          <p className="text-gray-300 text-center">
            Excluir esse usuario?
          </p>
          <div className="flex items-center justify-center mt-4 gap-3">
            <button
              onClick={() => setPopupDeleteId(null)}
              className="px-4 py-2 border-red-500 border w-40 text-red-500 hover:text-white transition-all cursor-pointer hover:bg-red-500 rounded"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                handleDeleteUser(popupDeleteId)
                setPopupUserId(null)
              }}
              className="px-4 py-2 border-lime-500 border w-40 text-lime-500 hover:text-white transition-all cursor-pointer hover:bg-lime-500 rounded"
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    )
  }

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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Telefone</th>
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{user.telefone}</td>
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
                            onClick={() => setPopupDeleteId(user.id)}
                            className="border cursor-pointer hover:text-white border-red-500 text-red-500 transition-all hover:bg-red-500 w-7 h-7 rounded flex items-center justify-center"
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => router.push(`/edit?id=${user.id}`)}
                            className="border cursor-pointer hover:bg-blue-500 border-blue-500 transition-all bg-transparent text-blue-500 hover:text-white w-7 h-7 rounded flex items-center justify-center"
                          >
                            <UserPen className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleChangeStats(user.id, !user.status)}
                            className="border cursor-pointer hover:bg-orange-500 border-orange-500 transition-all bg-transparent text-orange-500 hover:text-white w-7 h-7 rounded flex items-center justify-center"
                          >
                            {user.status == true ? <LockKeyhole className="h-4 w-4" /> : <LockKeyholeOpen className="h-4 w-4" />}
                          </button>
                          <button
                            onClick={() => setPopupUserId(user.id)} 
                            className="border cursor-pointer hover:bg-lime-500 border-lime-500 transition-all bg-transparent text-lime-500 hover:text-white w-7 h-7 rounded flex items-center justify-center"
                          >
                            <MessageCircle className="h-4 w-4" />
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

      {renderPopupMessage()} 
      {renderPopupDelete()}
    </div>
  );
}
