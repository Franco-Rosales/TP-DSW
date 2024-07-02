import { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { NavBar } from '../NavBar/NavBar';
import { Link, useNavigate } from 'react-router-dom';

export const Ingredientes = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ingredientes, setIngredientes] = useState([]);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
          const response = await axios.post("http://localhost:3001/api/ingredientes", data);
          console.log('Ingrediente registrado:', response.data);
        } catch (error) {
          console.error('Error registrando al ingrediente:', error);
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
            console.error('Error al traer los datos de los ingredientes:', error);
        }
    };

    const deleteIngrediente = async (id) => {
        if (window.confirm("¿Desea borrar este ingrediente?")) {
          await axios.delete(`http://localhost:3001/api/ingredientes/${id}`);
          getIngredientes();
        }
    };

    useEffect(() => {
        getIngredientes();
    }, []);

    return (
        <>  
            <NavBar/>
            <div className="container text-center">
                <h1>Ingredientes</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="col-6 mx-auto">
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" {...register('nombre', { required: true })}/>
                        <label htmlFor="floatingInput">Nombre:</label>
                        {errors.nombre && <span>Este campo es obligatorio</span>}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="number" className="form-control" {...register('popularidad', { required: true })}/>
                        <label htmlFor="floatingInput">Popularidad:</label>
                        {errors.popularidad && <span>Este campo es obligatorio</span>}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="date" className="form-control" {...register('fecha_agregado', { required: true })}/>
                        <label htmlFor="floatingInput">Fecha de agregado:</label>
                        {errors.fecha_agregado && <span>Este campo es obligatorio</span>}
                    </div>
                    <div>
                    <button type="submit" className="btn btn-primary" onClick={getIngredientes}>Registrar</button>
                    <button className="btn btn-primary" onClick={cancelar}>Cancelar</button>
                    </div>
                </form>
                </div>
                <div className="container">
                <table className="table mt-5 mx-3">
                            <thead>
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Popularidad</th>
                                <th scope="col">Fecha de creacion</th>
                                <th></th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {ingredientes &&
                                ingredientes.map((i) => {
                                return (
                                    <tr>
                                    <td>{i.nombre}</td>
                                    <td>{i.popularidad}</td>
                                    <td>{i.fecha_agregado}</td>
                                    <td>
                                        <button
                                        className="btn btn-default"
                                        onClick={() => deleteIngrediente(i.id)}
                                        >
                                        <i className="bi bi-trash3 text-danger"></i>
                                        </button>
                                    </td>
                                    <td>
                                        <Link className="btn btn-default" to={`/ingrediente/${i.id}`} >
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