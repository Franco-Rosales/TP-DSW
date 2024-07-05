import { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import {useParams, useNavigate } from 'react-router-dom';

export const Noticia = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const [noticia, setNoticia] = useState({});
    const [chefs, setChefs] = useState([]);

    const getChefs = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/chefs');
            setChefs(response.data);
        } catch (error) {
            console.error('Error al obtener chefs:', error);
        }
    };

    const getNoticia = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/noticias/${id}`);
            setNoticia(response.data);
            setFormValues(response.data)
        } catch (error) {
            console.error('Error al obtener noticia:', error);
        }
    };

    const volver = () => {
        navigate('/noticias')
    };

    const onSubmit = async (data) => {
        try {
            if (id > 0) {
                await axios.put(`http://localhost:3001/api/noticias/${id}`, data);
            } else {
                await axios.post('http://localhost:3001/api/noticias', data);
            }
            volver();
        } catch (error) {
            console.error('Error al registrar la noticia:', error);
        }
    };

    const setFormValues = (noticia) => {
        setValue('titulo', noticia.titulo);
        setValue('descripcion', noticia.descripcion);
        setValue('fecha', noticia.fecha);
        setValue('chef_id', noticia.chef_id);
    };

    useEffect(() => {
        getChefs();
        getNoticia(id);
    }, []);

    return (
        <div className="container text-center">
                <br />
                <h1>Noticias</h1>
                <br />
                <>
                <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column align-items-center">
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <input
                                type="text"
                                className="form-control"
                                id="titulo"
                                placeholder="Título"
                                defaultValue={noticia.titulo}
                                {...register('titulo', { required: 'El título es requerido' })}
                            />
                            <label htmlFor="titulo">Título</label>
                            {errors.titulo && <span className='text-danger'>{errors.titulo.message}</span>}
                        </div>
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <textarea
                                className="form-control"
                                id="descripcion"
                                placeholder="Descripción"
                                defaultValue={noticia.descripcion}
                                {...register('descripcion', { required: 'La descripción es requerida' })}
                            />
                            <label htmlFor="descripcion">Descripción</label>
                            {errors.descripcion && <span className='text-danger'>{errors.descripcion.message}</span>}
                        </div>
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <input
                                type="date"
                                className="form-control"
                                id="fecha"
                                placeholder="Fecha"
                                defaultValue={noticia.fecha}
                                {...register('fecha', { required: 'La fecha es requerida' })}
                            />
                            <label htmlFor="fecha">Fecha</label>
                            {errors.fecha && <span className='text-danger'>{errors.fecha.message}</span>}
                        </div>
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <select className="form-control" {...register('chef_id', { required: true })}
                            defaultValue={noticia.chef_id}>
                                <option value="">Selecciona un chef</option>
                                {chefs.map(chef => (
                                    <option key={chef.id} value={chef.id}>{chef.nombre}</option>
                                ))}
                            </select>
                            <label htmlFor="chef_id">Chef</label>
                        </div>
                        <div className="d-flex justify-content-between mt-2 mb-3" style={{ width: '50%' }}>
                            <button type="submit" className="btn btn-primary">
                                {id > 0 ? 'Confirmar Actualización' : 'Registrar Noticia'}
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