import { useState, useEffect } from 'react';
import axios from 'axios';
import { NavBar } from '../NavBar/NavBar';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';

export const RecetaIngrediente = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ recetas, setRecetas ] = useState([]);
    const [ ingredientes, setIngredientes ] = useState([]);
    const [ recetasIngredientes, setRecetasIngredientes ] = useState([]);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
          const response = await axios.post("http://localhost:3001/api/recetas-ingredientes", data);
          console.log('Ingrediente de receta registrado:', response.data);
        } catch (error) {
          console.error('Error registrando el ingrediente de receta:', error);
        }
    };

    const getRecetas = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/recetas');
            setRecetas(response.data);
        } catch (error) {
            console.error('Error fetching recetas:', error);
        }
    };

    const cancelar = () => {
        navigate('/');
    }

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
            console.error('Error al traer los datos de los ingredientes de las recetas:', error);
        }
    };

    const deleteRecetasIngredientes = async (id) => {
        if (window.confirm("¿Desea borrar este ingrediente de la receta?")) {
          await axios.delete(`http://localhost:3001/api/recetas-ingredientes/${id}`);
          getRecetasIngredientes();
        }
    };

    useEffect(() => {
        getRecetas();
        getIngredientes();
        getRecetasIngredientes();
    }, []);

    return (
        <>
            <NavBar/>
            <div className='container text-center'>
                <h1>Agregar ingrediente a receta</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="col-6 mx-auto">
                    <div className="mb-3">
                        <select {...register('receta_id')} className="form-select">
                            <option value="0">Seleccionar receta</option>
                            {recetas && recetas.map(r => (
                                <option key={r.id} value={r.id}>{r.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <select {...register('ingrediente_id')} className="form-select">
                            <option value="0">Seleccionar ingrediente</option>
                            {ingredientes && ingredientes.map(i => (
                                <option key={i.id} value={i.id}>{i.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="number" className="form-control" {...register('cantidad', { required: true })}/>
                        <label htmlFor="floatingInput">Cantidad:</label>
                        {errors.cantidad && <span>Este campo es obligatorio</span>}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" {...register('unidad', { required: true })}/>
                        <label htmlFor="floatingInput">Unidad:</label>
                        {errors.unidad && <span>Este campo es obligatorio</span>}
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary">Registrar</button>
                        <button className="btn btn-primary" onClick={cancelar}>Cancelar</button>
                    </div>
                </form>
            </div>
            <div className="container">
                <table className="table mt-5 mx-3">
                            <thead>
                            <tr>
                                <th scope="col">Receta</th>
                                <th scope="col">Ingrediente</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Unidad</th>
                                <th></th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {recetasIngredientes &&
                                recetasIngredientes.map((ri) => {
                                return (
                                    <tr>
                                    <td>{ri.receta_id}</td>
                                    <td>{ri.ingrediente_id}</td>
                                    <td>{ri.cantidad}</td>
                                    <td>{ri.unidad}</td>
                                    <td>
                                        <button
                                        className="btn btn-default"
                                        onClick={() => deleteRecetasIngredientes(ri.id)}
                                        >
                                        <i className="bi bi-trash3 text-danger"></i>
                                        </button>
                                    </td>
                                    <td>
                                        <Link className="btn btn-default" to={`/recetas-ingredientes/${ri.id}`} >
                                            <i className="bi bi-pencil text-primary"></i>
                                        </Link>
                                    </td>
                                    </tr>
                                );
                                })}
                            </tbody>
                </table>
            </div>
        </>
    );
};