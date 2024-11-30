import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Estabelece a conexão com o banco de dados usando a string de conexão fornecida nas variáveis de ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função para buscar todos os posts no banco de dados
export async function getTodosPosts() {
    // Acessa o banco de dados 'Imersao-instabytes' usando a conexão estabelecida
    const db = conexao.db("Imersao-instabytes");

    // Acessa a coleção 'posts' dentro do banco de dados
    const colecao = db.collection("posts");

    // Retorna todos os documentos da coleção 'posts' convertidos em um array
    return colecao.find().toArray();
}

// Função para criar um novo post no banco de dados
export async function criarPost(novoPost) {
    // Acessa o banco de dados 'Imersao-instabytes' usando a conexão estabelecida
    const db = conexao.db("Imersao-instabytes");

    // Acessa a coleção 'posts' dentro do banco de dados
    const colecao = db.collection("posts");

    // Insere um novo post na coleção 'posts' e retorna o resultado da inserção
    return colecao.insertOne(novoPost);
}

// Função para atualizar um post existente no banco de dados
export async function atualizarPost(id, novoPost) {
    // Acessa o banco de dados 'Imersao-instabytes' usando a conexão estabelecida
    const db = conexao.db("Imersao-instabytes");

    // Acessa a coleção 'posts' dentro do banco de dados
    const colecao = db.collection("posts");

    // Converte o 'id' recebido (em formato de string) para um ObjectId válido do MongoDB
    const objID = ObjectId.createFromHexString(id);

    // Atualiza o post encontrado pelo seu ObjectId, substituindo seus dados pelos novos dados fornecidos
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set: novoPost});
}
