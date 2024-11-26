import express from "express";
import routes from "./src/routes/postsRoutes.js";

// Cria uma instância do servidor Express. O 'app' será usado para configurar rotas e middlewares.
const app = express();

// Chama a função 'routes', passando o objeto 'app' como parâmetro.
// Isso vai definir as rotas dentro do Express, registrando o que o servidor deve fazer
// quando uma requisição é feita a determinados caminhos (URLs).
routes(app);

// Faz o servidor Express começar a escutar na porta 3000.
// Quando o servidor estiver pronto, uma mensagem será exibida no console.
app.listen(3000, () => {
    console.log("Servidor escutando...");
});
