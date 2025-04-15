'use client'
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export default function Edit() {
  interface IFormInput {
    nome: string
    cpf: string
    imagem_url: string
  }

  const [erro, setErro] = useState<string | null>(null)
  const { register, handleSubmit, setValue } = useForm<IFormInput>()
  const router = useRouter()

  async function handleGetUser(id: string) {
    try {
      const response = await fetch(`https://api-academia-alpha.vercel.app/gym/user/${id}`)
      const data = await response.json()
      console.log("Resposta da API:", data)

      const user = data.user || data // se vier com data.user ou só data direto

      setValue("nome", user.nome)
      setValue("cpf", user.cpf)
      setValue("imagem_url", user.imagem_url || "")
    } catch (err) {
      console.error("Erro ao buscar usuário:", err)
      setErro("Erro ao buscar usuário.")
    }
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')
    console.log("ID recebido pela URL:", id)
    if (id) {
      handleGetUser(id)
    }
  }, [])

  async function handleSendBack(formData: IFormInput) {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')

    try {
      const response = await fetch(`https://api-academia-alpha.vercel.app/gym/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) throw new Error("Erro ao atualizar usuário.")
      router.push("/usuarios")
    } catch (err) {
      console.error(err)
      setErro("Erro ao atualizar usuário.")
    }
  }

  return (
    <div className="h-screen bg-gray-50 w-full pt-10 flex flex-col items-center">
      <h1 className="text-center text-black text-3xl">Academia ADM</h1>
      <form
        className="flex pt-25 flex-col bg-white rounded-xl h-auto shadow-xl w-[80%] xl:w-[30%] mt-5 mx-auto px-4 sm:px-6 lg:px-8"
        onSubmit={handleSubmit(handleSendBack)}
        encType="multipart/form-data"
      >
        <label className="text-gray-700 font-semibold mt-4">Nome</label>
        <input
          {...register("nome")}
          required
          className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-800"
        />

        <label className="text-gray-700 font-semibold mt-4">CPF</label>
        <input
          {...register("cpf")}
          required
          maxLength={11}
          className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-800"
        />

        <label className="text-gray-700 font-semibold mt-4">Imagem URL</label>
        <input
          {...register("imagem_url")}
          className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-800"
        />

        <input
          type="submit"
          value="Enviar"
          className="bg-black text-white font-semibold rounded-lg px-4 py-2 mt-6 hover:bg-gray-700 cursor-pointer transition duration-200"
        />
        {erro && (
          <p className="text-red-600 text-center text-xl mt-4 font-medium">
            {erro}
          </p>
        )}
      </form>
    </div>
  )
}
