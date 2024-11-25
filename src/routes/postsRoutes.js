import express from "express";

// Importa a função 'listarPosts' do controlador de posts, que irá lidar com a lógica de listar posts
import { listarPosts } from "../controllers/postsController.js";

// Define a função 'routes', que recebe o objeto 'app' como parâmetro
const routes = (app) => {
    // Utiliza o middleware express.json() para garantir que o corpo das requisições seja interpretado como JSON
    app.use(express.json());
    
    // Define a rota GET para o caminho "/posts". Quando uma requisição GET for feita em "/posts", 
    // a função 'listarPosts' será chamada para processar essa requisição e devolver a resposta
    app.get("/posts", listarPosts);
}

// Exporta a função 'routes' como o módulo padrão, para que ela possa ser utilizada em outros arquivos
export default routes;
