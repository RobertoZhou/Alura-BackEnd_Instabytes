import { getTodosPosts } from "../models/postsModels.js";

// Define uma função assíncrona chamada `listarPosts` que será usada como controlador para uma rota HTTP.
export async function listarPosts(req, res) {
    // Chama a função `getTodosPosts` para buscar todos os posts. O `await` faz a função esperar o retorno da consulta ao banco de dados.
    const posts = await getTodosPosts();

    // Retorna os posts encontrados como resposta JSON para o cliente, com status HTTP 200 (que significa "OK").
    res.status(200).json(posts);
}
