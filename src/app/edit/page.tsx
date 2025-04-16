'use client'
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import Return from "../components/return"
interface IFormInput {
  nome: string
  cpf: string
  imagem: FileList
}

export default function Edit() {
  const [user, setUser] = useState<{ nome: string; cpf: string; imagem_url: string }>()
  const [id, setId] = useState<string | null>(null)
  const { register, handleSubmit, setValue } = useForm<IFormInput>()
  const router = useRouter()

  useEffect(() => {
    async function handleGetUser() {
      const urlParams = new URLSearchParams(window.location.search)
      const userId = urlParams.get("id")
      setId(userId)

      if (userId) {
        const request = await fetch(`https://api-academia-alpha.vercel.app/gym/user/id/${userId}`)
        const data = await request.json()
        setUser(data)

        setValue("nome", data.nome)
        setValue("cpf", data.cpf)
      }
    }

    handleGetUser()
  }, [setValue])

  if (!user) {
    return <p>Carregando...</p>
  }

  const onSubmit = async (data: IFormInput) => {
    if (!id) {
      console.error("ID não encontrado")
      return
    }

    const formData = new FormData()
    formData.append("nome", data.nome)
    formData.append("cpf", data.cpf)
    formData.append("status", "true")

    if (data.imagem && data.imagem.length > 0) {
      formData.append("imagem", data.imagem[0])
    }

    try {
      const response = await fetch(`https://api-academia-alpha.vercel.app/gym/user/${id}`, {
        method: "PUT",
        body: formData,
      })

      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.mensagem || "Erro ao atualizar usuário")
      }

      console.log("Usuário atualizado com sucesso", result)
      router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="justify-center h-screen bg-black w-full pt-10 flex flex-col items-center text-white">
      <h1 className=" text-center text-white text-2xl mb-8">Editar Usuário</h1>
    
      <form 
        className=" flex flex-col bg-black rounded-xl border border-[#2a2a2a] w-[95%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] mt-5 mx-auto px-6 py-8 shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <label className="text-gray-200 font-medium text-sm mt-4">Nome</label>
        <input
          {...register("nome")}
          required
          className="bg-[#0d0d0d] border border-[#2a2a2a] text-white rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-300"
        />
    
        <label className="text-gray-200 font-medium text-sm mt-4">CPF</label>
        <input
          {...register("cpf")}
          required
          maxLength={11}
          className="bg-[#0d0d0d] border border-[#2a2a2a] text-white rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-300"
        />
        
        <label className="text-gray-200 font-medium text-sm mt-4">Nova Imagem</label>
        <input
          type="file"
          {...register("imagem")}
          className="text-white mt-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:text-sm file:font-semibold file:border file:border-gray-200 file:hover:bg-gray-200 file:hover:text-black file:cursor-pointer hover:text-white transition-all file:bg-transparent duration-200"
        />
    
        <input
          type="submit"
          value="Enviar"
          className="bg-transparent border border-gray-200 text-white font-semibold rounded-md px-6 py-3 mt-6 hover:bg-white hover:text-black cursor-pointer transition duration-200"
        />
        
        <p className="text-red-500 text-center text-sm mt-4 font-medium">
        </p>
      </form>
      <Return/>
    </div>
  )
}
