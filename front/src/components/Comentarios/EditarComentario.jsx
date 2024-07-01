import { useParams, useNavigate } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar";
import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
import axios from "axios";

export const EditarComentario = () => {
    const { id } = useParams();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [comentario, setComentario] = useState({});
    const navigate = useNavigate();
    const [recetas, setRecetas] = useState([]); 
    const [chefs, setChefs] = useState([]); 

    const cancelar = () => {
        navigate('/comentarios');
    }

    const getComentario = async (id) => {
        try {
            const comentarioDatos = await axios.get(`http://localhost:3001/api/comentarios/${id}`);
            setComentario(comentarioDatos.data);
        } catch (error) {
            console.error('Error al traer los datos del comentario:', error);
        }
    }

    const onSubmit = async (data) => {
        await axios.put(`http://localhost:3001/api/comentarios/${id}`, data)
        cancelar();
    }

    const getRecetas = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/recetas");
            setRecetas(response.data)
        } catch (error) {
            console.error('Error al traer los datos de las recetas:', error);
        }
    };

    const getChefs = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/chefs");
            setChefs(response.data)
        } catch (error) {
            console.error('Error al traer los datos de los chefs:', error);
        }
    };

    useEffect(() => {
        getComentario(id);
        getRecetas();
        getChefs();
    }, [id]);

    return (
        <>
            <NavBar />
            <form onSubmit={handleSubmit(onSubmit)} className='mt-5'>
                <h1 className='mb-5'>Comentario {comentario.contenido}</h1>
                <div className="row mt-3">
                    <div className="col-4 text-end">
                        <label htmlFor="nombre">Comentario:</label>
                    </div>
                    <div className="col-8 text-start">
                        <input type="text"
                            className='form-control'
                            defaultValue={comentario.contenido}
                            {...register('contenido', { required: 'El contenido es requerido' })}
                        />
                        {errors.contenido && <span className='text-danger'>{errors.contenido.message}</span>}
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-4 text-end">
                        <label htmlFor="fecha_creacion">Fecha de creación:</label>
                    </div>
                    <div className="col-8 text-start">
                        <input type="date"
                            className='form-control'
                            defaultValue={comentario.fecha_creacion}
                            {...register('fecha_creacion', { required: 'La fecha de creación es requerida' })}
                        />
                        {errors.fecha_creacion && <span className='text-danger'>{errors.fecha_creacion.message}</span>}
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-4 text-end">
                        <label htmlFor="chefs">Chefs:</label>
                    </div>
                    <div className="col-8 text-start">
                        <select className="form-select"
                            {...register('chefs_id')}
                            defaultValue={comentario.chefs_id}
                        >
                            {chefs.map(u => <option key={u.id} value={u.id}>{u.nombre}</option>)}
                        </select>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-4 text-end">
                        <label htmlFor="receta">Receta:</label>
                    </div>
                    <div className="col-8 text-start">
                        <select className="form-select"
                            {...register('receta_id')}
                            defaultValue={comentario.receta_id}
                        >
                            {recetas.map(r => <option key={r.id} value={r.id}>{r.nombre}</option>)}
                        </select>
                    </div>
                </div>
                <div className="mt-5 mb-5">
                    <button className='btn btn-danger ms-2' onClick={cancelar}>Cancelar</button>
                    <input className="btn btn-success ms-2" type="submit" value={'Actualizar'} />
                </div>
            </form>
        </>
    );
}