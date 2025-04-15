"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Create() {
  const [erro, setErro] = useState<string>();
  const router = useRouter();
  const { register, handleSubmit } = useForm<IFormInput>();

  interface IFormInput {
    nome: string;
    cpf: string;
    imagem: FileList;
  }

  const handleSendBack = async (formData: IFormInput) => {
    try {
      const dados = new FormData();

      dados.append("nome", formData.nome);
      dados.append("cpf", formData.cpf);

      if (formData.imagem && formData.imagem.length > 0) {
        dados.append("imagem", formData.imagem[0])
      }

      const response = await fetch("http://10.142.227.147:5000/gym", {
        method: "POST",
        body: dados,
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
      }

      const data_post = await response.json();
      console.log("Resposta do backend:", data_post);

      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        setErro(error.message);
      } else {
        setErro("Erro desconhecido.");
      }
    }
  };

  return (
    <div className="h-screen bg-gray-50 w-full pt-10 flex flex-col items-center ">
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

        <label className="text-gray-700 font-semibold mt-4">Imagem</label>
        <input
          type="file"
          accept="image/*"
          {...register("imagem")}
          className="mt-2"
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
  );
}
