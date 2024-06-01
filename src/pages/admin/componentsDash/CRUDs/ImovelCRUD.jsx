import React, { useState, useEffect } from 'react';

const ImoveisCRUD = ({ item }) => {
    const initialImovelData = {
        titulo: '',
        imagem: null,
        area_construida: '',
        area_util: '',
        aceita_permuta: false,
        tem_divida: false,
        motivo_da_venda: '',
        valor_pretendido: '',
        condicoes: '',
        sobre_o_imovel: '',
        estado: '',
        cidade: '',
        endereco: '',
        aluguel: false,
    };

    const [imovelData, setImovelData] = useState(initialImovelData);

    // Set initial state based on the provided item when component mounts
    useEffect(() => {
        if (item) {
            setImovelData(item);
        }
    }, [item]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setImovelData(prevData => ({ ...prevData, [name]: newValue }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Get the first selected file
        setImovelData(prevData => ({ ...prevData, imagem: file }));
    };

    const createOrUpdateImovel = async () => {
        try {
            const formData = new FormData();
            Object.entries(imovelData).forEach(([key, value]) => {
                formData.append(key, value);
            });
    
            const endpoint = item ? `/api/imoveis?id=${item.id}` : '/api/imoveis';
            const method = item ? 'PUT' : 'POST';
    
            const response = await fetch(endpoint, {
                method: method,
                body: formData,
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create or update imovel');
            }
    
            console.log('Imovel created or updated successfully');
            alert('Imovel criada ou atualizada com sucesso!');
            // Reset form state to initial values
            setImovelData(initialImovelData);
        } catch (error) {
            console.error('Error creating or updating imovel:', error.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createOrUpdateImovel();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="conteiner flex flex-col justify-center items-center w-5/6">
                <div className="flex flex-col gap-4 self-start w-full">
                    <input className="p-1 rounded-lg shadow-lg"
                        type="text" name="titulo" value={imovelData.titulo} onChange={handleChange} placeholder="Titulo" />
                    <input className="p-1 rounded-lg shadow-lg"
                        type="number" name="area_construida" value={imovelData.area_construida} onChange={handleChange} placeholder="Área Construída" />
                    <input className="p-1 rounded-lg shadow-lg"
                        type="number" name="area_util" value={imovelData.area_util} onChange={handleChange} placeholder="Área Útil" />
                    <input className="p-1 rounded-lg shadow-lg"
                        type="text" name="motivo_da_venda" value={imovelData.motivo_da_venda} onChange={handleChange} placeholder="Motivo da Venda" />
                    <input className="p-1 rounded-lg shadow-lg"
                        type="number" name="valor_pretendido" value={imovelData.valor_pretendido} onChange={handleChange} placeholder="Valor Pretendido" />
                    <input className="p-1 rounded-lg shadow-lg"
                        type="text" name="condicoes" value={imovelData.condicoes} onChange={handleChange} placeholder="Condições" />
                    <input className="p-1 rounded-lg shadow-lg"
                        type="text" name="sobre_o_imovel" value={imovelData.sobre_o_imovel} onChange={handleChange} placeholder="Sobre o Imóvel" />
                    <input className="p-1 rounded-lg shadow-lg"
                        type="text" name="estado" value={imovelData.estado} onChange={handleChange} placeholder="Estado" />
                    <input className="p-1 rounded-lg shadow-lg"
                        type="text" name="cidade" value={imovelData.cidade} onChange={handleChange} placeholder="Cidade" />
                    <input className="p-1 rounded-lg shadow-lg"
                        type="text" name="endereco" value={imovelData.endereco} onChange={handleChange} placeholder="Endereço" />
                    <div className='flex p-3 gap-10 text-lg'>
                        <label>
                            <input className="p-1 rounded-lg shadow-lg"
                                type="checkbox"
                                name="aceita_permuta"
                                checked={imovelData.aceita_permuta}
                                onChange={handleChange}
                            />
                            <span className="p-2">Aceita Permuta</span>
                        </label>
                        <label>
                            <input className="p-1 rounded-lg shadow-lg"
                                type="checkbox"
                                name="tem_divida"
                                checked={imovelData.tem_divida}
                                onChange={handleChange}
                            />
                            <span className="p-2">Tem Dívida</span>
                        </label>
                    </div>
                    <input className="p-1 rounded-lg"
                        type="file"
                        accept="image/jpeg, image/png"
                        onChange={handleImageChange}
                    />
                </div>
                <button className="p-2 m-5 bg-green-600 hover:bg-green-700 rounded-xl text-xl font-bold text-gray-200 shadow-xl" type="submit">Salvar</button>
            </div>
        </form>
    );
}

export default ImoveisCRUD;
