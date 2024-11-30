import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModels.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";

// Função para listar todos os posts
export async function listarPosts(req, res) {
    const posts = await getTodosPosts(); // Chama a função para obter todos os posts do banco de dados
    res.status(200).json(posts); // Retorna os posts como resposta com status 200 (sucesso)
}

// Função para criar um novo post
export async function postarNovoPost(req, res) {
    const novoPost = req.body; // Obtém os dados do novo post do corpo da requisição (req.body)
    try {
        const postCriado = await criarPost(novoPost); // Chama a função para criar o post no banco de dados
        res.status(200).json(postCriado); // Retorna o post criado com status 200
    } catch(erro) {
        console.error(erro.message); // Em caso de erro, loga o erro
        res.status(500).json({"Erro": "Falha na requisição "}); // Retorna erro com status 500
    }
}

// Função para fazer o upload de uma imagem e criar um post relacionado a ela
export async function uploadImagem(req, res) {
    const novoPost = {
        descricao: "", // Descrição inicial em branco
        urlImagem: req.file.originalname, // Nome original da imagem recebida no upload
        alt: "" // Texto alternativo (alt) inicial em branco
    };

    try {
        const postCriado = await criarPost(novoPost); // Cria um novo post no banco com a imagem
        // Renomeia a imagem para incluir o ID do post no nome do arquivo
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        fs.renameSync(req.file.path, imagemAtualizada); // Renomeia a imagem fisicamente no sistema
        res.status(200).json(postCriado); // Retorna o post criado com status 200
    } catch(erro) {
        console.error(erro.message); // Loga o erro caso algo falhe
        res.status(500).json({"Erro": "Falha na requisição "}); // Retorna erro com status 500
    }
}

// Função para atualizar um post com uma nova imagem e descrição gerada
export async function atualizarNovoPost(req, res) {
    const id = req.params.id; // Obtém o ID do post da URL
    const urlImagem = `http://localhost:3000/${id}.png`; // Cria a URL da imagem do post com base no ID

    try {
        // Lê o conteúdo da imagem no diretório 'uploads' com o ID do post
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        // Chama a função para gerar uma descrição (alt-text) usando o modelo Gemini
        const descricao = await gerarDescricaoComGemini(imgBuffer);

        // Cria o objeto com os dados do post atualizado
        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt // Obtém o texto alternativo da requisição
        };

        const postCriado = await atualizarPost(id, post); // Atualiza o post no banco de dados
        res.status(200).json(postCriado); // Retorna o post atualizado com status 200
    } catch(erro) {
        console.error(erro.message); // Loga qualquer erro que ocorrer
        res.status(500).json({"Erro": "Falha na requisição"}); // Retorna erro com status 500
    }
}
