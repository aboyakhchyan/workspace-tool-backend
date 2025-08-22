export interface IEnv {
  api: IApi;
  db: IDatabase;
  client: IClient;
  jwt: IJwt;
  nodeEnv: string;
}

export interface IApi {
  port: number;
  host: string;
  prefix: string;
}

export interface IJwt {
  access: string;
  accessTtl: number;
  refresh: string;
  refreshTtl: number;
}

export interface IDatabase {
  host: string;
  port: number;
  name: string;
  password: string;
  user: string;
}

export interface IClient {
  uri: string;
}
