import { UsuarioInterfaz } from './usuario-interfaz';

export interface VotacionInterfaz {
  idVotacion: number;
  nombreVotacion: string;
  usuario: UsuarioInterfaz;
  mapPartidosVotos: { [name: string]: number };
}
