// Importa o módulo 'express', que é um framework para criar aplicações web em Node.js
import express from "express";
import { listarPosts, postarNovoPost, uploadImagem } from "../controllers/postsController.js";
import multer from "multer";

//  Para Windows
// Configura o armazenamento para o multer, definindo como os arquivos serão salvos
const storage = multer.diskStorage({
    // Define o destino onde os arquivos enviados serão armazenados
    destination: function (req, file, cb) {
        // Chama o callback com null (sem erro) e o diretório 'uploads/' como destino
        cb(null, 'uploads/');
    },
    // Define o nome do arquivo que será salvo
    filename: function (req, file, cb) {
        // Chama o callback com null (sem erro) e o nome original do arquivo
        cb(null, file.originalname);
    }
})

// Configura o multer para usar o armazenamento definido e especifica o diretório de destino
// Para Windows, define o destino como "./uploads" e utiliza a configuração de armazenamento
const upload = multer({ dest: "./uploads", storage })

// Para Linux ou Mac, a linha abaixo pode ser utilizada em vez da anterior
// const upload = multer({ dest: "./uploads"})


// Define a função 'routes', que recebe o objeto 'app' como parâmetro
const routes = (app) => {
    // Utiliza o middleware express.json() para garantir que o corpo das requisições seja interpretado como JSON
    app.use(express.json());
    
    // Rota para buscar todos os posts, utilizando a função listarPosts como callback
    app.get("/posts", listarPosts);
    
    // Rota para criar um novo post, utilizando a função postarNovoPost como callback
    app.post("/posts", postarNovoPost)
    
    // Rota para fazer upload de uma imagem, utilizando o middleware do multer para processar o arquivo
    // 'upload.single("imagem")' indica que apenas um arquivo com o campo 'imagem' será aceito
    app.post("/upload", upload.single("imagem"), uploadImagem)
}

// Exporta a função 'routes' como o módulo padrão, permitindo que seja utilizada em outros arquivos
export default routes;