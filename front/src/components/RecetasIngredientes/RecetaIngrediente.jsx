import { useState, useEffect } from 'react';
import axios from 'axios';
import { NavBar } from '../NavBar/NavBar';
import { useForm } from 'react-hook-form';

export const RecetaIngrediente = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [recetas, setRecetas] = useState([]);
    const [ingredientes, setIngredientes] = useState([]);
    const [recetasIngredientes, setRecetasIngredientes] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [editarRecetaIngredienteId, setEditarRecetaIngredienteId] = useState(null);
    const [recetaIngrediente, setRecetaIngrediente] = useState({});

    const cancelar = () => {
        setMostrarFormulario(false);
        setEditarRecetaIngredienteId(null);
        setRecetaIngrediente({});
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

    const getRecetasIngredientes = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/recetas-ingredientes');
            setRecetasIngredientes(response.data);
        } catch (error) {
            console.error('Error fetching recetas ingredientes:', error);
        }
    };

    const deleteRecetasIngredientes = async (id) => {
        if (window.confirm("¿Desea borrar este ingrediente de la receta?")) {
            await axios.delete(`http://localhost:3001/api/recetas-ingredientes/${id}`);
            getRecetasIngredientes();
        }
    };

    const handleEditarRecetaIngrediente = async (id) => {
        try {
            const recetaIngredienteDatos = await axios.get(`http://localhost:3001/api/recetas-ingredientes/${id}`);
            setRecetaIngrediente(recetaIngredienteDatos.data);
            setMostrarFormulario(true);
            setEditarRecetaIngredienteId(id);
        } catch (error) {
            console.error('Error fetching receta ingrediente:', error);
        }
    };

    const onSubmit = async (data) => {
        try {
            if (editarRecetaIngredienteId) {
                await axios.put(`http://localhost:3001/api/recetas-ingredientes/${editarRecetaIngredienteId}`, data);
            } else {
                await axios.post('http://localhost:3001/api/recetas-ingredientes', data);
            }
            cancelar();
            getRecetasIngredientes();
        } catch (error) {
            console.error('Error submitting receta ingrediente:', error);
        }
    };

    useEffect(() => {
        getRecetas();
        getIngredientes();
        getRecetasIngredientes();
    }, []);

    return (
        <>
            <NavBar />
            <div className='container text-center'>
                <br />
                <h1>Ingredientes de Recetas</h1>
                <br />
                {!mostrarFormulario ? (
                    <>
                        <button
                            type="button"
                            className="btn btn-success mb-3"
                            onClick={() => setMostrarFormulario(true)}
                        >
                            Agregar nuevo ingrediente a receta
                        </button>
                        <table className="table mt-5 mx-3">
                            <thead>
                                <tr>
                                    <th scope="col">Receta</th>
                                    <th scope="col">Ingrediente</th>
                                    <th scope="col">Cantidad</th>
                                    <th scope="col">Unidad</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recetasIngredientes &&
                                    recetasIngredientes.map((ri) => (
                                        <tr key={ri.id}>
                                            <td>{ri.receta_id}</td>
                                            <td>{ri.ingrediente_id}</td>
                                            <td>{ri.cantidad}</td>
                                            <td>{ri.unidad}</td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-warning me-2"
                                                    onClick={() => handleEditarRecetaIngrediente(ri.id)}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={() => deleteRecetasIngredientes(ri.id)}
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </>
                ) : (
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
                        <div className="d-flex justify-content-between" style={{ width: '50%' }}>
                            <button type="submit" className="btn btn-primary">
                                {editarRecetaIngredienteId ? 'Confirmar Actualización' : 'Registrar Ingrediente'}
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={cancelar}>
                                Cancelar
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </>
    );
};
