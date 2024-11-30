import { MongoClient } from 'mongodb';

// Função assíncrona para conectar ao banco de dados MongoDB usando a string de conexão fornecida
export default async function conectarAoBanco(stringConexao) {
    let mongoClient;

    try {
        // Cria uma nova instância do MongoClient usando a string de conexão fornecida
        mongoClient = new MongoClient(stringConexao);

        // Exibe uma mensagem no console indicando que a conexão está sendo estabelecida
        console.log('Conectando ao cluster do banco de dados...');

        // Realiza a conexão com o banco de dados de forma assíncrona
        await mongoClient.connect();

        // Exibe uma mensagem no console indicando que a conexão foi bem-sucedida
        console.log('Conectado ao MongoDB Atlas com sucesso!');

        // Retorna a instância do MongoClient para que a aplicação possa usar a conexão
        return mongoClient;
    } catch (erro) {
        // Se houver erro na conexão, exibe a mensagem de erro no console
        console.error('Falha na conexão com o banco!', erro);

        // Encerra o processo caso a conexão falhe
        process.exit();
    }
}
