import conectarAoBanco from "../config/dbConfig.js";

// Estabelece a conexão com o banco de dados usando a string de conexão armazenada na variável de ambiente `STRING_CONEXAO`.
// O `await` é usado para esperar que a conexão seja feita antes de prosseguir com o código.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Declara uma função assíncrona chamada `getTodosPosts` que busca todos os posts do banco de dados.
export async function getTodosPosts() {
    // Acessa o banco de dados "Imersao-instabytes" usando a conexão já estabelecida.
    const db = conexao.db("Imersao-instabytes");

    // Acessa a coleção "posts" do banco de dados.
    const colecao = db.collection("posts");

    // Executa a consulta para encontrar todos os documentos na coleção "posts" e converte os resultados para um array.
    return colecao.find().toArray();
}
