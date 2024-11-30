import express from "express";
import routes from "./src/routes/postsRoutes.js";

// Cria uma instância do servidor Express
const app = express();

// Serve arquivos estáticos da pasta 'uploads', permitindo o acesso direto a arquivos como imagens
app.use(express.static("uploads"));

// Configura as rotas importadas para o aplicativo Express
routes(app);

// Inicia o servidor na porta 3000 e exibe uma mensagem no console quando o servidor estiver funcionando
app.listen(3000, () => {
    console.log("Servidor escutando...");
});
