import { db } from ".."
import { inserirLog } from "./funcoesSQLITELogs"

export function criarTabelaEventos() {
    const query = `
        CREATE TABLE IF NOT EXISTS Eventos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            data TEXT,
            usuario_id INTEGER,
            FOREIGN KEY (usuario_id) REFERENCES Usuarios (id)
        );
    `
    db.run(query, (erro) => {
        if (erro) {
            console.log(`Erro ao criar a tabela: ${erro}`)
            inserirLog(`Erro ao criar a tabela: ${erro.message}`)
        } else {
            console.log(`Tabela Eventos criada com sucesso!`)
            inserirLog(`Tabela Eventos criada com sucesso!`)
        }
    })
}

export function inserirEvento(nome: string, data: string, usuario_id: number) {
    const query = `
        INSERT INTO Eventos (nome, data, usuario_id) 
        VALUES (?, ?, ?)
    `
    db.run(query, [nome, data, usuario_id], (erro) => {
        if (erro) {
            console.log(`Erro ao inserir evento: ${erro}`)
            inserirLog(`Erro ao inserir evento: ${erro.message}`)
        } else {
            console.log(`Evento inserido com sucesso!`)
            inserirLog(`Evento ${nome} inserido com sucesso!`)
        }
    })
}

export function listarEventos() {
    const query = `
        SELECT * FROM Eventos
    `
    db.all(query, (erro, linhas) => {
        if (erro) {
            console.log(`Erro ao listar eventos: ${erro}`)
            inserirLog(`Erro ao listar eventos: ${erro.message}`)
        } else {
            console.table(linhas)
            inserirLog('Listando todos os eventos');
        }
    })
}

export function listarEventoID(id: number) {
    const query = `
        SELECT * FROM Eventos WHERE id = ?    
    `
    db.get(query, [id], (erro, linha) => {
        if(erro){
            console.log(`Erro ao listar evento: ${erro}`)
            inserirLog(`Erro ao listar evento de ID ${id}: ${erro.message}`)
        } else {
            console.table(linha);
            inserirLog(`Listar evento de ID ${id}`);
        }
    })
}

export function deletarEvento(id: number) {
    const query = `
        DELETE FROM Eventos WHERE id = ?`
    db.run(query, [id], (erro) => {
        if (erro) {
            console.log(`Erro ao deletar evento: ${erro}`)
            inserirLog(`Erro ao deletar evento de ID ${id}: ${erro.message}`)
        } else {
            console.log(`Evento deletado com sucesso!`)
            inserirLog(`Evento de ID ${id} deletado com sucesso!`)
        }
    })
}