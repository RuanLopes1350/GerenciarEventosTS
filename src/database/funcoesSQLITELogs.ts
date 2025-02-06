import { db } from ".."

export function criarTabelaLogs(){
    const query = `
        CREATE TABLE IF NOT EXISTS Logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        message TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `
    db.run(query, (erro) =>{
        if(erro){
            console.log(`Erro ao criar a tabela logs: ${erro}`)
        } else {
            console.log('Tabela logs criada com sucesso!')
        }
    })
}

export function inserirLog(messagem:string){
    const query = `
        INSERT INTO Logs (message)
        VALUES (?)
    `
    db.run(query, [messagem], (erro) =>{
        if(erro){
            console.log(`Erro ao inserir log: ${erro}`)
        } else {
            console.log('Log inserido com sucesso!')
        }
    })
}