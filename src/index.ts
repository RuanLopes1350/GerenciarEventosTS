import sqlite3 from "sqlite3";
import readline from 'readline'
import { cadastrarUsuario, criarTabelaUsuario, deletarUsuario, listarTodosUsuarios, listarUsuarioID } from "./database/funcoesSQLITEUsuario";
import { criarTabelaEventos, deletarEvento, inserirEvento, listarEventoID, listarEventos } from "./database/funcoesSQLITEEvento";
import { criarTabelaLogs } from "./database/funcoesSQLITELogs";
import { logarNoBancoDeDados, usuarioLogado } from "./database/funcaoSQLiteLogar";

// criação do Banco de Dados
export const db = new sqlite3.Database('./data/BancoEventos.db');

//criação da interface ReadLine
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//criação função perguntar
export const perguntar = (pergunta: string): Promise<string> => {
    return new Promise((resolve) => {
        rl.question(pergunta, (resposta) => {
            console.log('');
            resolve(resposta);
        });
    });
};


//função main da ReadLine
const main = async () => {
    //criar tabelas caso não existam ainda
    await criarTabelaLogs();
    await criarTabelaUsuario();
    await criarTabelaEventos();
    //fazer login no Banco
    let autorizado = await logarNoBancoDeDados();
    while (autorizado) {
        //menu inicial
        console.log("\nO que gostaria de fazer? ");
        console.log('1 - Menu Eventos!');
        console.log('2 - Menu Usuarios!');
        console.log('3 - Sair!');
        const escolher = await perguntar('Informe a opção desejada: ');

        switch (escolher) {
            case '1':
                //menu de Eventos
                let menuEventosAtivo: boolean = true
                while (menuEventosAtivo) {
                    console.log('\nMenu Eventos...')
                    console.log('1 - Cadastrar Evento!');
                    console.log('2 - Listar Eventos!');
                    console.log('3 - Buscar Evento Por ID!');
                    console.log('4 - Excluir Evento!');
                    console.log('5 - Voltar');
                    const menuEventos = await perguntar('Informe a opção desejada: ');
                    switch (menuEventos) {
                        case '1':
                            //Cadastar novo Evento
                            const nomeEvento = await perguntar('Informe o nome do Evento: ');
                            const dataEvento = await perguntar('Informe a data do Evento: ');
                            await inserirEvento(nomeEvento, dataEvento, usuarioLogado.id);
                            break;
                        case '2':
                            //Listar os eventos
                            await listarEventos(usuarioLogado.id);
                            break;
                        case '3':
                            //Buscar evento por id
                            const idEventoBuscarString = await perguntar('Informe o ID do Evento que deseja buscar: ')
                            const idEventoBuscar = Number(idEventoBuscarString)
                            await listarEventoID(idEventoBuscar, usuarioLogado.id)
                            break;
                        case '4':
                            //excluir um evento
                            const idEventoDeletarString = await perguntar('Informe o ID do Evento que deseja deletar: ')
                            const idEventoDeletar = Number(idEventoDeletarString)
                            await deletarEvento(idEventoDeletar, usuarioLogado.id)
                            break;
                        case '5':
                            //retornar ao menu inicial
                            console.log('Menu anterior...');
                            menuEventosAtivo = false;
                            break;
                        default:
                            console.log('Opção Inválida, por favor tente novamente!')
                            break;
                    }
                }
                break;
            case '2':
                //menu de Usuarios
                let menuUsuariosAtivo = true;
                while (menuUsuariosAtivo) {
                    console.log('\nMenu Usuarios...');
                    console.log('1 - Cadastrar Usuario!');
                    console.log('2 - Listar Usuarios!');
                    console.log('3 - Buscar Usuario Por ID!');
                    console.log('4 - Excluir Usuario!');
                    console.log('5 - Voltar');
                    const menuUsuarios = await perguntar('Informe a opção desejada: ');
                    switch (menuUsuarios) {
                        case '1':
                            //Cadastrar Usuario
                            const nomeUsuario = await perguntar('Informe o nome do Usuario: ');
                            const emailUsuario = await perguntar('Informe o email do Usuario: ');
                            const senhaUsuario = await perguntar('Informe a senha do Usuario: ');
                            await cadastrarUsuario(nomeUsuario, emailUsuario, senhaUsuario, usuarioLogado.id);
                            break;
                        case '2':
                            //Listar usuarios
                            await listarTodosUsuarios(usuarioLogado.id);
                            break;
                        case '3':
                            //Buscar Usuario por id
                            const idUsuario = await perguntar('Informe o ID do Usuario que deseja buscar: ');
                            await listarUsuarioID(idUsuario, usuarioLogado.id);
                            break;
                        case '4':
                            //Excluir usuario
                            const idUsuarioExcluir = await perguntar('Informe o ID do Usuario que deseja deletar: ');
                            await deletarUsuario(idUsuarioExcluir, usuarioLogado.id);
                            break;
                        case '5':
                            //Retornar ao menu inicial
                            console.log('Menu anterior...');
                            menuUsuariosAtivo = false;
                            break;
                        default:
                            console.log('Opção inválida!');
                            break;
                    }
                }
                break;
            case '3':
                //encerrar execução e finalizar a ReadLine
                autorizado = false;
                console.log('Saindo...');
                rl.close();
                return;
            default:
                console.log('Opção inválida!');
                break;
        }
    }
};

main();
