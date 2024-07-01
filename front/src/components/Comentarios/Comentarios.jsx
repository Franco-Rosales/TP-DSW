import { NavBar } from "../NavBar/NavBar";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Comentarios = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [comentarios, setComentarios] = useState([]);
    const navigate = useNavigate();
    const [chefs, setChefs] = useState([]);
    const [recetas, setRecetas] = useState([]);

    const onSubmit = async (data) => {
        try {
            console.log('Enviando datos:', data); // Verificar los datos que se envían
            const response = await axios.post("http://localhost:3001/api/comentarios", data);
            console.log('Comentario registrado:', response.data);
            await getComentarios(); // Asegurarse de que los comentarios se actualicen después de registrar uno nuevo
        } catch (error) {
            console.error('Error registrando el comentario:', error);
            console.error('Detalles del error:', error.response.data); // Verificar detalles del error
        }
    };

    const cancelar = () => {
        navigate('/');
    }

    const getComentarios = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/comentarios");
            console.log('Datos de comentarios obtenidos:', response.data); // Verificar los datos obtenidos
            setComentarios(response.data);
        } catch (error) {
            console.error('Error al traer los datos de los comentarios:', error);
        }
    }

    const deleteComentarios = async (id) => {
        if (window.confirm("¿Desea borrar este comentario?")) {
            await axios.delete(`http://localhost:3001/api/comentarios/${id}`);
            getComentarios();
        }
    };

    const getChefs = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/chefs");
            setChefs(response.data)
        } catch (error) {
            console.error('Error al traer los datos de los Chefs:', error);
          }
    };

    const getRecetas = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/recetas");
            setRecetas(response.data)
        } catch (error) {
            console.error('Error al traer los datos de las recetas:', error);
          }
    };

    useEffect(() => {
        getComentarios();
        getChefs();
        getRecetas();
    }, [])

    return (
        <>
            <NavBar />
            <div className="container text-center">
                <h1>Comentarios</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="col-6 mx-auto">
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" {...register('contenido', { required: true })} />
                        <label htmlFor="floatingInput">Contenido</label>
                        {errors.contenido && <span>Este campo es obligatorio</span>}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="date" className="form-control" {...register('fecha_creacion', { required: true })} />
                        <label htmlFor="floatingInput">Fecha de Creación</label>
                        {errors.fecha_creacion && <span>Este campo es obligatorio</span>}
                    </div>
                    <div className="form-floating mb-3">
                        <select className="form-select" {...register('receta_id', { required: true })}>
                            <option value="">Seleccionar receta</option>
                            {recetas.map(r => (
                                <option key={r.id} value={r.id}>{r.nombre}</option>
                            ))}
                        </select>
                        {errors.receta_id && <span>Este campo es obligatorio</span>}
                    </div>
                    <div className="form-floating mb-3">
                        <select className="form-select" {...register('chef_id', { required: true })}>
                            <option value="">Seleccionar chef</option>
                            {chefs.map(c => (
                                <option key={c.id} value={c.id}>{c.nombre}</option>
                            ))}
                        </select>
                        {errors.chef_id && <span>Este campo es obligatorio</span>}
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary">Registrar</button>
                        <button type="button" className="btn btn-secondary" onClick={cancelar}>Cancelar</button>
                    </div>
                </form>
            </div>
            <div className="container">
                <table className="table mt-5 mx-3">
                    <thead>
                        <tr>
                            <th scope="col">Contenido</th>
                            <th scope="col">Fecha de Creación</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comentarios.map((c) => (
                            <tr key={c.id}>
                                <td>{c.contenido}</td>
                                <td>{c.fecha_creacion}</td>
                                <td>
                                    <button
                                        className="btn btn-default"
                                        onClick={() => deleteComentarios(c.id)}
                                    >
                                        <i className="bi bi-trash3 text-danger"></i>
                                    </button>
                                    <Link className="btn btn-default" to={`/comentarios/${c.id}`}>
                                        <i className="bi bi-pencil text-primary"></i>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}