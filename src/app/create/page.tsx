"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Return from "../components/return";

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

      const response = await fetch("https://api-academia-alpha.vercel.app/gym", {
        method: "POST",
        body: dados,
      });
      router.push("/");

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        setErro(error.message);
      } else {
        setErro("Erro desconhecido.");
      }
    }
  };

  return (
    <div className=" h-screen justify-center bg-black w-full pt-10 flex flex-col items-center text-white">
    <h1 className="text-center text-white text-2xl mb-8">Novo Usuário</h1>
  
    <form
      className="flex flex-col  bg-black rounded-xl border border-[#2a2a2a] w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] mt-5 mx-auto px-6 py-8 shadow-lg"
      onSubmit={handleSubmit(handleSendBack)}
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
  
      <label className="text-gray-200 font-medium text-sm mt-4">Imagem</label>
      <input
        type="file"
        accept="image/*"
        {...register("imagem")}
        className="text-white mt-2 file:mr-4 file:py-2 file:px-4 file:rounded-md  file:text-sm file:font-semibold file:border file:border-gray-200 file:hover:bg-gray-200 file:hover:text-black file:cursor-pointer hover:text-white transition-all file:bg-transparent  duration-200"
      />
  
      <input
        type="submit"
        value="Enviar"
        className="bg-transparent border border-gray-200  text-white font-semibold rounded-md px-6 py-3 mt-6 hover:bg-white hover:text-black cursor-pointer transition duration-200"
      />
      
      {erro && (
        <p className="text-red-500 text-center text-sm mt-4 font-medium">
          {erro}
        </p>
      )}
    </form>
    <Return/>
  </div>
  
  
  );
}
