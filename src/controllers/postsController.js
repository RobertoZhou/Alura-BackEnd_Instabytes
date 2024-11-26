import { getTodosPosts, criarPost } from "../models/postsModels.js";
import fs from "fs"

// Define uma função assíncrona chamada `listarPosts` que será usada como controlador para uma rota HTTP.
export async function listarPosts(req, res) {
    // Chama a função `getTodosPosts` para buscar todos os posts. O `await` faz a função esperar o retorno da consulta ao banco de dados.
    const posts = await getTodosPosts();

    // Retorna os posts encontrados como resposta JSON para o cliente, com status HTTP 200 (que significa "OK").
    res.status(200).json(posts);
}

// Define uma função assíncrona chamada `postarNovoPost` que será usada para criar um novo post.
export async function postarNovoPost(req, res) {
    // Extrai o novo post do corpo da requisição.
    const novoPost = req.body;
    try {
        // Chama a função `criarPost` para inserir o novo post no banco de dados e aguarda o resultado.
        const postCriado = await criarPost(novoPost);
        // Retorna o post criado como resposta JSON para o cliente, com status HTTP 200.
        res.status(200).json(postCriado);
    } catch(erro) {
        // Em caso de erro, imprime a mensagem de erro no console.
        console.error(erro.message);
        // Retorna uma resposta de erro com status HTTP 500 (erro interno do servidor).
        res.status(500).json({"Erro":"Falha na requisição "});
    }
}

// Define uma função assíncrona chamada `uploadImagem` que será usada para fazer o upload de uma imagem e criar um novo post.
export async function uploadImagem(req, res) {
    // Cria um novo objeto de post com a URL da imagem e uma descrição vazia.
    const novoPost = {
        descricao: "",
        urlImagem: req.file.originalname, // Usa o nome original do arquivo enviado.
        alt: "" // Campo 'alt' vazio.
    };
    try {
        // Chama a função `criarPost` para inserir o novo post no banco de dados e aguarda o resultado.
        const postCriado = await criarPost(novoPost);
        // Define o caminho onde a imagem será renomeada e movida.
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        // Renomeia e move o arquivo da imagem para o novo caminho.
        fs.renameSync(req.file.path, imagemAtualizada);
        // Retorna o post criado como resposta JSON para o cliente, com status HTTP 200.
        res.status(200).json(postCriado);
    } catch(erro) {
        // Em caso de erro, imprime a mensagem de erro no console.
        console.error(erro.message);
        // Retorna uma resposta de erro com status HTTP 500 (erro interno do servidor).
        res.status(500).json({"Erro":"Falha na requisição "});
    }
}