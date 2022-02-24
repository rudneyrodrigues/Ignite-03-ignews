import { Client } from 'faunadb';

export const fauna = new Client({
  secret: String(process.env.FAUNADB_KEY),
  // domain: 'db.us.fauna.com', // Esta opção é utilizada para especificar o domínio do servidor FaunaDB
});