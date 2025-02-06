import { db } from ".."
import { inserirLog } from "./funcoesSQLITELogs"

export function criarTabelaUsuario() {
    const query = `
        CREATE TABLE IF NOT EXISTS Usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            email TEXT,
            senha TEXT);
    `
    db.run(query, (erro) => {
        if (erro) {
            console.log(`Erro ao criar a tabela: ${erro}`)
            inserirLog(`Erro ao criar a tabela: ${erro.message}`)
        } else {
            console.log(`Tabela Usuarios criada com sucesso!`)
            inserirLog(`Tabela Usuarios criada com sucesso!`)
        }
    })
}

export function listarTodosUsuarios() {
    const query = `
    SELECT * FROM Usuarios;
    `
    db.all(query, (erro, linhas) => {
        if (erro) {
            console.log(`Erro ao listar Usuarios ${erro}`)
            inserirLog(`Erro ao listar Usuarios: ${erro.message}`)
        } else {
            console.table(linhas)
            inserirLog('Listando todos os Usuarios')
        }
    })
}

export function cadastrarUsuario(nome: string, email: string, senha: string) {
    const query = `
        INSERT INTO Usuarios (nome, email, senha)
        VALUES (?, ?, ?);
    `;
    db.run(query, [nome, email, senha], (erro) => {
        if (erro) {
            console.log(`Erro ao cadastrar Usuario: ${erro}`);
            inserirLog(`Erro ao cadastrar Usuario: ${erro.message}`)
        } else {
            console.log(`Usuario cadastrado com sucesso!`);
            inserirLog(`Usuario ${nome} cadastrado com sucesso!`)
        }
    });
}

export function listarUsuarioID(id: string) {
    const query = `
    SELECT * FROM Usuarios WHERE id = ?
    `
    db.get(query, [id], (erro, linha) => {
        if(erro){
            console.log(`Erro ao listar Usuario: ${erro}`)
            inserirLog(`Erro ao listar Usuario com ID ${id}: ${erro.message}`)
        } else {
            console.table(linha)
            inserirLog(`Listar Usuario com ID ${id}`)
        }
    })
}

export function deletarUsuario(id: string) {
    const query = `
    DELETE FROM Usuarios WHERE id = ?
    `
    db.run(query, [id], (erro) => {
        if(erro){
            console.log(`Erro ao deletar Usuario: ${erro}`)
            inserirLog(`Erro ao deletar Usuario com ID ${id}: ${erro.message}`)
        } else {
            console.log(`Usuario deletado com sucesso!`)
            inserirLog(`Usuario com ID ${id} deletado com sucesso!`)
        }
    })
}