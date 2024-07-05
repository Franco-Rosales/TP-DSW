import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export const Comentario = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const {id} = useParams();
    const navigate = useNavigate();
    const [comentario, setComentario] = useState({});
    const [chefs, setChefs] = useState([]);
    const [recetas, setRecetas] = useState([]);

    const volver = () => {
        navigate('/comentarios')
    };

    const getComentario = async (id) => {
        try {
            const comentarioDatos = await axios.get(`http://localhost:3001/api/comentarios/${id}`);
            setComentario(comentarioDatos.data);
        } catch (error) {
            console.error('Error al traer los datos del comentario:', error);
        }
    };

    const onSubmit = async (data) => {
        try {
            if (id > 0) {
                await axios.put(`http://localhost:3001/api/comentarios/${id}`, data);
            } else {
                await axios.post("http://localhost:3001/api/comentarios", data);
            }
            volver();
        } catch (error) {
            console.error('Error registrando el comentario:', error);
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
        getComentario(id);
        getRecetas();
        getChefs();
    }, [])

    return (
        <div className="container text-center">
                <br />
                <h1>Comentarios</h1>
                <br />
                <>
                <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column align-items-center">
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <input
                                type="text"
                                className="form-control"
                                id="contenido"
                                placeholder="Contenido"
                                defaultValue={comentario.contenido}
                                {...register('contenido', { required: 'El contenido es requerido' })}
                            />
                            <label htmlFor="contenido">Contenido</label>
                            {errors.contenido && <span className='text-danger'>{errors.contenido.message}</span>}
                        </div>
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <input
                                type="date"
                                className="form-control"
                                id="fecha_creacion"
                                placeholder="Fecha de Creación"
                                defaultValue={comentario.fecha_creacion}
                                {...register('fecha_creacion', { required: 'La fecha de creación es requerida' })}
                            />
                            <label htmlFor="fecha_creacion">Fecha de Creación</label>
                            {errors.fecha_creacion && <span className='text-danger'>{errors.fecha_creacion.message}</span>}
                        </div>
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <select
                                className="form-select"
                                {...register('receta_id')}
                                defaultValue={comentario.receta_id}
                            >
                                <option value="">Seleccionar receta</option>
                                {recetas.map(r => (
                                    <option key={r.id} value={r.id}>{r.nombre}</option>
                                ))}
                            </select>
                            {errors.receta_id && <span className='text-danger'>{errors.receta_id.message}</span>}
                        </div>
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <select
                                className="form-select"
                                {...register('chef_id')}
                                defaultValue={comentario.chef_id}
                            >
                                <option value="">Seleccionar chef</option>
                                {chefs.map(c => (
                                    <option key={c.id} value={c.id}>{c.nombre}</option>
                                ))}
                            </select>
                            {errors.chef_id && <span className='text-danger'>{errors.chef_id.message}</span>}
                        </div>
                        <div className="d-flex justify-content-between mt-2 mb-3" style={{ width: '50%' }}>
                            <button type="submit" className="btn btn-primary">
                                {id > 0 ? 'Confirmar Actualización' : 'Registrar Comentario'}
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={volver}>
                                Volver
                            </button>
                        </div>
                    </form>
                </>
        </div>
    );
}