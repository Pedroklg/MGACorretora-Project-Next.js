import db from './utils/db';

export default async function handler(req, res) {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  let searchQuery;
  const searchTerm = '%' + query + '%';
  let queryParams = [];

  if (query.toLowerCase() === 'empresas') {
    searchQuery = `
      SELECT id, titulo, sobre_o_imovel, NULL AS area_construida, NULL AS area_util, NULL AS aceita_permuta, NULL AS tem_divida, NULL AS motivo_da_venda, 
             valor_pretendido, NULL AS condicoes, estado, cidade, endereco 
      FROM empresas;
    `;
  } else if (query.toLowerCase() === 'imoveis') {
    searchQuery = `
      SELECT id, titulo, sobre_o_imovel, area_construida, area_util, aceita_permuta, tem_divida, motivo_da_venda, valor_pretendido, condicoes, estado, cidade, endereco
      FROM imoveis;
    `;
  } else {
    searchQuery = `
      SELECT id, titulo, sobre_o_imovel, NULL AS area_construida, NULL AS area_util, NULL AS aceita_permuta, NULL AS tem_divida, NULL AS motivo_da_venda, valor_pretendido, NULL AS condicoes, estado, cidade, endereco
      FROM empresas
      WHERE estado ILIKE $1
         OR cidade ILIKE $1
         OR titulo ILIKE $1
         OR CAST(id AS TEXT) ILIKE $1
      UNION ALL
      SELECT id, titulo, sobre_o_imovel, area_construida, area_util, aceita_permuta, tem_divida, motivo_da_venda, valor_pretendido, condicoes, estado, cidade, endereco
      FROM imoveis
      WHERE estado ILIKE $1
         OR cidade ILIKE $1
         OR titulo ILIKE $1
         OR CAST(id AS TEXT) ILIKE $1
    `;
    queryParams.push(searchTerm);
  }

  try {
    const { rows } = await db.query(searchQuery, queryParams);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
