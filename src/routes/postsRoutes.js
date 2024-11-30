import express from "express";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
import multer from "multer";
import cors from "cors";

// Configurações do CORS, permitindo apenas acesso a partir do endereço "http://localhost:8000"
const corsOptions = {
    origin: "http://localhost:8000", // Permite a origem especificada
    optionsSuccessStatus: 200 // Define o código de sucesso como 200
}

// Configuração de armazenamento de arquivos utilizando o multer (para Windows)
const storage = multer.diskStorage({
    // Define o diretório onde os arquivos serão armazenados
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // A pasta "uploads/" será o destino
    },
    // Define o nome do arquivo, mantendo o nome original
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Mantém o nome do arquivo original
    }
})

// Cria a instância do multer para realizar o upload de arquivos, configurando o diretório e o nome
const upload = multer({ dest: "./uploads", storage })

// Caso esteja em um ambiente Linux ou Mac, a configuração alternativa seria a seguinte:
// const upload = multer({ dest: "./uploads" }) 

// Define as rotas para a aplicação
const routes = (app) => {
    // Middleware para analisar dados JSON no corpo das requisições
    app.use(express.json());

    // Middleware para habilitar o CORS com as configurações definidas
    app.use(cors(corsOptions));

    // Rota GET para listar todos os posts
    app.get("/posts", listarPosts);

    // Rota POST para criar um novo post
    app.post("/posts", postarNovoPost);

    // Rota POST para realizar o upload de uma imagem (espera um arquivo com o nome "imagem" no corpo da requisição)
    app.post("/upload", upload.single("imagem"), uploadImagem);

    // Rota PUT para atualizar um post (requer o ID do post na URL)
    app.put("/upload/:id", atualizarNovoPost);
}

// Exporta as rotas para serem usadas na configuração do servidor
export default routes;
