import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import {useParams, useNavigate } from 'react-router-dom';

const Noticias = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const [noticias, setNoticias] = useState([]);
    const [filtroTitulo, setFiltroTitulo] = useState('');
    const [chefs, setChefs] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    useEffect(() => {
        getNoticias();
        getChefs();
        if (id) {
            getNoticia(id);
            setIsEditing(true);
        }
    }, [id]);

    const getNoticias = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/noticias');
            setNoticias(response.data);
        } catch (error) {
            console.error('Error al obtener noticias:', error);
        }
    };

    const getNoticia = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/noticias/${id}`);
            const noticia = response.data;
            setValue('titulo', noticia.titulo);
            setValue('descripcion', noticia.descripcion);
            setValue('fecha', noticia.fecha);
            setValue('chef_id', noticia.chef_id);
        } catch (error) {
            console.error('Error al obtener noticia:', error);
        }
    };

    const getChefs = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/chefs');
            setChefs(response.data);
        } catch (error) {
            console.error('Error al obtener chefs:', error);
        }
    };

    const onSubmit = async (data) => {
        try {
            if (isEditing) {
                await axios.put(`http://localhost:3001/api/noticias/${id}`, data);
            } else {
                await axios.post('http://localhost:3001/api/noticias', data);
            }
            getNoticias();
            reset();
            setMostrarFormulario(false);
            navigate('/noticias');
        } catch (error) {
            console.error('Error al registrar la noticia:', error);
        }
    };

    const onDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/api/noticias/${id}`);
            getNoticias();
        } catch (error) {
            console.error('Error al eliminar la noticia:', error);
        }
    };

    const handleFiltroTituloChange = (e) => {
        setFiltroTitulo(e.target.value);
    };

    const filteredNoticias = noticias.filter(noticia =>
        noticia.titulo.toLowerCase().includes(filtroTitulo.toLowerCase())
    );

    return (
        <>
            <div className="container text-center">
                <h1>Noticias</h1>
                {!mostrarFormulario ? (
                    <>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center" style={{ gap: '10px' }}>
                                <div className="form-floating" style={{ flex: '1' }}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="Filtrar por título"
                                        value={filtroTitulo}
                                        onChange={handleFiltroTituloChange}
                                    />
                                    <label htmlFor="floatingInput">Filtrar por título</label>
                                </div>
                            </div>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => setMostrarFormulario(true)}
                            >
                                Crear Nueva Noticia
                            </button>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Título</th>
                                    <th scope="col">Descripción</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredNoticias.map(noticia => (
                                    <tr key={noticia.id}>
                                        <td>{noticia.titulo}</td>
                                        <td>{noticia.descripcion}</td>
                                        <td>{new Date(noticia.fecha).toLocaleDateString()}</td>
                                        <td>
                                            <button className="btn btn-warning me-2" onClick={() => {
                                                setMostrarFormulario(true);
                                                navigate(`/noticias/${noticia.id}`);
                                            }}>
                                                Editar
                                            </button>
                                            <button className="btn btn-danger" onClick={() => onDelete(noticia.id)}>
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
                            <input
                                type="text"
                                className="form-control"
                                id="titulo"
                                placeholder="Título"
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
                                {...register('fecha', { required: 'La fecha es requerida' })}
                            />
                            <label htmlFor="fecha">Fecha</label>
                            {errors.fecha && <span className='text-danger'>{errors.fecha.message}</span>}
                        </div>
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <select className="form-control" {...register('chef_id', { required: true })}>
                                <option value="">Selecciona un chef</option>
                                {chefs.map(chef => (
                                    <option key={chef.id} value={chef.id}>{chef.nombre}</option>
                                ))}
                            </select>
                            <label htmlFor="chef_id">Chef</label>
                        </div>
                        <div className="d-flex justify-content-between" style={{ width: '50%' }}>
                            <button type="submit" className="btn btn-primary">
                                {isEditing ? 'Actualizar' : 'Registrar'}
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={() => {
                                setMostrarFormulario(false);
                                reset();
                                if (isEditing) navigate('/noticias');
                            }}>
                                Volver
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </>
    );
};

export { Noticias };
