import { UsuarioInterfaz } from './usuario-interfaz';

export interface VotacionInterfaz {
  idVotacion: string;
  nombreVotacion: string;
  usuario: UsuarioInterfaz;
  mapPartidosVotos: { [name: string]: number };
}
