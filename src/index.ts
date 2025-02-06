import sqlite3 from "sqlite3";
import { cadastrarUsuario, criarTabelaUsuario, deletarUsuario, listarTodosUsuarios, listarUsuarioID } from "./database/funcoesSQLITEUsuario";
import { criarTabelaEventos, deletarEvento, inserirEvento, listarEventoID, listarEventos } from "./database/funcoesSQLITEEvento";
import { criarTabelaLogs } from "./database/funcoesSQLITELogs";

export const db = new sqlite3.Database('./data/BancoEventos.db');

// ############### SQLITE ###############
// criarTabelaLogs()
// criarTabelaUsuario()
// criarTabelaEventos();
// ############### Usuarios ###############
// cadastrarUsuario('Ruan De Oliveira Lopes','ruan.lopes@email.com','Shazam123')
// cadastrarUsuario('Luis Felipe Lopes','luis.felipe@email.com','GadoDeMaisDaTh123')
// cadastrarUsuario('Silvio Huan','silvio.huan@email.com','MacacoAlbino123')
// cadastrarUsuario('Sun Wukong','sun.wukong@email.com','Seila123')
// listarTodosUsuarios();
// listarUsuarioID('1')
// deletarUsuario('4')

// ############### Eventos ###############
// inserirEvento('Evento Teste 1','07/01/2026',1);
// inserirEvento('Evento Teste 2','21/11/2025',1);
// inserirEvento('Evento Teste 3','18/10/2025',1);
// inserirEvento('Evento Teste 4','14/04/2025',1);
// listarEventos();
// listarEventoID(2);
// deletarEvento(4);
