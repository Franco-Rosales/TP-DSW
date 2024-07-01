import { useParams, useNavigate } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar";
import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
import axios from "axios";

export const EditarNoticia = () => {
    const { id } = useParams();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [noticia, setNoticia] = useState({});
    const navigate = useNavigate();

    const cancelar = () => {
        navigate('/noticias');
    }

    const getNoticia = async (id) => {
        try {
            const noticiaDatos = await axios.get(`http://localhost:3001/api/noticias/${id}`);
            setNoticia(noticiaDatos.data);
        } catch (error) {
            console.error('Error al traer los datos de la noticia:', error);
        }
    }

    const onSubmit = async (data) => {
        try {
            await axios.put(`http://localhost:3001/api/noticias/${id}`, data);
            cancelar();
        } catch (error) {
            console.error('Error al actualizar la noticia:', error);
        }
    }

    useEffect(() => {
        getNoticia(id);
    }, [id]);

    return (
        <>
            <NavBar />
            <form onSubmit={handleSubmit(onSubmit)} className='mt-5'>
                <h1 className='mb-5'>Editar Noticia: {noticia.titulo}</h1>
                <div className="row mt-3">
                    <div className="col-4 text-end">
                        <label htmlFor="titulo">Título:</label>
                    </div>
                    <div className="col-8 text-start">
                        <input type="text"
                            className='form-control'
                            defaultValue={noticia.titulo}
                            {...register('titulo', { required: 'El título es requerido' })}
                        />
                        {errors.titulo && <span className='text-danger'>{errors.titulo.message}</span>}
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-4 text-end">
                        <label htmlFor="descripcion">Descipción:</label>
                    </div>
                    <div className="col-8 text-start">
                        <textarea
                            className='form-control'
                            defaultValue={noticia.descripcion}
                            {...register('descripcion', { required: 'La descripcion es requerida' })}
                        />
                        {errors.descripcion && <span className='text-danger'>{errors.descripcion.message}</span>}
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-4 text-end">
                        <label htmlFor="fecha">Fecha:</label>
                    </div>
                    <div className="col-8 text-start">
                        <input type="date"
                            className='form-control'
                            defaultValue={noticia.fecha}
                            {...register('fecha', { required: 'La fecha de publicación es requerida' })}
                        />
                        {errors.fecha && <span className='text-danger'>{errors.fecha.message}</span>}
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
