import nextConnect from 'next-connect';
import multer from 'multer';
import db from './utils/db';

// Configure multer storage
const storage = multer.diskStorage({
    destination: 'public/imgEmpresas',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

const apiRoute = nextConnect({
    onError: (err, req, res) => {
        console.error(err.stack);
        res.status(500).end('Something broke!');
    },
    onNoMatch: (req, res) => {
        res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    },
});

apiRoute.use(upload.single('imagem'));

apiRoute.post(async (req, res) => {
    try {
        console.log('POST Request Body:', req.body);
        console.log('Uploaded File:', req.file);

        const {
            titulo, tempo_de_mercado, funcionarios, motivo_da_venda, valor_pretendido,
            condicoes, sobre_o_imovel, endereco, aceita_permuta, tem_divida,
            estado, cidade, categoria
        } = req.body;

        const imageUrl = req.file ? `/imgEmpresas/${req.file.filename}` : null;

        const result = await db.query(
            'INSERT INTO empresas (titulo, tempo_de_mercado, funcionarios, motivo_da_venda, valor_pretendido, condicoes, sobre_o_imovel, endereco, aceita_permuta, tem_divida, imagem, estado, cidade, categoria) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *',
            [
                titulo, tempo_de_mercado, funcionarios, motivo_da_venda, valor_pretendido,
                condicoes, sobre_o_imovel, endereco, aceita_permuta, tem_divida,
                imageUrl, estado, cidade, categoria
            ]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error in POST /api/empresas:', error.message);
        res.status(500).json({ error: 'Failed to create empresa' });
    }
});

apiRoute.get(async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM empresas');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error in GET /api/empresas:', error.message);
        res.status(500).json({ error: 'Failed to fetch empresas' });
    }
});

apiRoute.put(async (req, res) => {
    try {
        const { id } = req.query;
        const {
            titulo, tempo_de_mercado, funcionarios, motivo_da_venda, valor_pretendido,
            condicoes, sobre_o_imovel, endereco, aceita_permuta, tem_divida,
            estado, cidade, categoria
        } = req.body;

        let imageUrl = null;
        if (req.file) {
            const { filename } = req.file;
            imageUrl = filename ? `/imgEmpresas/${filename}` : null;
        }

        const result = await db.query(
            'UPDATE empresas SET titulo = $1, tempo_de_mercado = $2, funcionarios = $3, motivo_da_venda = $4, valor_pretendido = $5, condicoes = $6, sobre_o_imovel = $7, endereco = $8, aceita_permuta = $9, tem_divida = $10, imagem = $11, estado = $12, cidade = $13, categoria = $14 WHERE id = $15 RETURNING *',
            [
                titulo, tempo_de_mercado, funcionarios, motivo_da_venda, valor_pretendido,
                condicoes, sobre_o_imovel, endereco, aceita_permuta, tem_divida,
                imageUrl, estado, cidade, categoria, id
            ]
        );

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error in PUT /api/empresas:', error.message);
        res.status(500).json({ error: 'Failed to update empresa' });
    }
});

apiRoute.delete(async (req, res) => {
    try {
        const { id } = req.query;
        await db.query('DELETE FROM empresas WHERE id = $1', [id]);
        res.status(200).json({ message: 'Empresa deleted successfully' });
    } catch (error) {
        console.error('Error in DELETE /api/empresas:', error.message);
        res.status(500).json({ error: 'Failed to delete empresa' });
    }
});

export const config = {
    api: {
        bodyParser: false, // Disable body parsing, so multer can handle it
    },
};

export default apiRoute;
