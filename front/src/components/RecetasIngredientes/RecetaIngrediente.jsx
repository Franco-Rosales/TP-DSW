import { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

export const RecetaIngrediente = () => {
    const {id} = useParams();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [recetas, setRecetas] = useState([]);
    const [ingredientes, setIngredientes] = useState([]);
    const [recetaIngrediente, setRecetaIngrediente] = useState({});

    const volver = () => {
        navigate('/recetas-ingredientes')
    };

    const getRecetas = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/recetas');
            setRecetas(response.data);
        } catch (error) {
            console.error('Error fetching recetas:', error);
        }
    };

    const getIngredientes = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/ingredientes');
            setIngredientes(response.data);
        } catch (error) {
            console.error('Error fetching ingredientes:', error);
        }
    };

    const getIngredienteReceta = async (id) => {
        try {
            const recetaIngredienteDatos = await axios.get(`http://localhost:3001/api/recetas-ingredientes/${id}`);
            setRecetaIngrediente(recetaIngredienteDatos.data);
        } catch (error) {
            console.error('Error fetching receta ingrediente:', error);
        }
    };

    const onSubmit = async (data) => {
        try {
            if (id > 0) {
                await axios.put(`http://localhost:3001/api/recetas-ingredientes/${id}`, data);
            } else {
                await axios.post('http://localhost:3001/api/recetas-ingredientes', data);
            }
            volver();
        } catch (error) {
            console.error('Error submitting receta ingrediente:', error);
        }
    };

    useEffect(() => {
        getRecetas();
        getIngredientes();
        getIngredienteReceta(id);
    }, []);

    return (
            <div className='container text-center'>
                <br />
                <h1>Ingredientes de Recetas</h1>
                <br />
                <>
                    <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column align-items-center">
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <select className="form-select" {...register('receta_id')} defaultValue={recetaIngrediente.receta_id}>
                                <option value="0">Seleccionar receta</option>
                                {recetas.map(r => (
                                    <option key={r.id} value={r.id}>{r.nombre}</option>
                                ))}
                            </select>
                            {errors.receta_id && <span className='text-danger'>{errors.receta_id.message}</span>}
                        </div>
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <select className="form-select" {...register('ingrediente_id')} defaultValue={recetaIngrediente.ingrediente_id}>
                                <option value="0">Seleccionar ingrediente</option>
                                {ingredientes.map(i => (
                                    <option key={i.id} value={i.id}>{i.nombre}</option>
                                ))}
                            </select>
                            {errors.ingrediente_id && <span className='text-danger'>{errors.ingrediente_id.message}</span>}
                        </div>
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <input
                                type="number"
                                className="form-control"
                                id="cantidad"
                                placeholder="Cantidad"
                                defaultValue={recetaIngrediente.cantidad}
                                {...register('cantidad', { required: 'La cantidad es requerida' })}
                            />
                            <label htmlFor="cantidad">Cantidad</label>
                            {errors.cantidad && <span className='text-danger'>{errors.cantidad.message}</span>}
                        </div>
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <input
                                type="text"
                                className="form-control"
                                id="unidad"
                                placeholder="Unidad"
                                defaultValue={recetaIngrediente.unidad}
                                {...register('unidad', { required: 'La unidad es requerida' })}
                            />
                            <label htmlFor="unidad">Unidad</label>
                            {errors.unidad && <span className='text-danger'>{errors.unidad.message}</span>}
                        </div>
                        <div className="d-flex justify-content-between mt-2 mb-3" style={{ width: '50%' }}>
                            <button type="submit" className="btn btn-primary">
                                {id > 0 ? 'Confirmar Actualización' : 'Registrar Ingrediente'}
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={volver}>
                                Cancelar
                            </button>
                        </div>
                    </form>
                </>
        </div>
    );
};
