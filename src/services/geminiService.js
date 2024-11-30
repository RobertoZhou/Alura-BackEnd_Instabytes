import { GoogleGenerativeAI } from "@google/generative-ai";

// Cria uma instância do modelo generativo, inicializando com a chave de API do Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Acessa o modelo específico "gemini-1.5-flash" para ser usado na geração de conteúdo
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Função assíncrona para gerar uma descrição (alt-text) para uma imagem
export default async function gerarDescricaoComGemini(imageBuffer) {
  // Define o prompt que será enviado ao modelo para gerar a descrição da imagem
  const prompt =
    "Gere uma descrição em português do brasil para a seguinte imagem, somente retorne a descrição sem a explicação de pergunta";

  try {
    // Converte a imagem para base64 e define o tipo MIME como 'image/png'
    const image = {
      inlineData: {
        data: imageBuffer.toString("base64"), // Converte a imagem para string base64
        mimeType: "image/png", // Define o tipo MIME como PNG
      },
    };

    // Envia o prompt e a imagem para o modelo Gemini para gerar a descrição
    const res = await model.generateContent([prompt, image]);

    // Retorna o texto gerado pelo modelo ou uma mensagem padrão se a descrição não estiver disponível
    return res.response.text() || "Alt-text não disponível.";
  } catch (erro) {
    // Em caso de erro, exibe uma mensagem no console e lança um erro
    console.error("Erro ao obter alt-text:", erro.message, erro);
    throw new Error("Erro ao obter o alt-text do Gemini.");
  }
}
