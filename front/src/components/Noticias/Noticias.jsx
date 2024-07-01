import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { NavBar } from "../NavBar/NavBar";

export const Noticias = () => {
    const { register, handleSubmit, reset } = useForm();
    const [noticias, setNoticias] = useState([]);
    const [filtroTitulo, setFiltroTitulo] = useState('');
    const [chefs, setChefs] = useState([]);

    useEffect(() => {
        getNoticias();
        getChefs();
    }, []);

    const getNoticias = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/noticias');
            setNoticias(response.data);
        } catch (error) {
            console.error('Error al obtener noticias:', error);
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
            const response = await axios.post('http://localhost:3001/api/noticias', data);
            console.log('Noticia registrada:', response.data);
            getNoticias(); // Actualizar la lista de noticias después de la creación
            reset(); // Resetear los campos del formulario después de enviar
        } catch (error) {
            console.error('Error al registrar la noticia:', error);
        }
    };

    const onDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3001/api/noticias/${id}`);
            console.log('Noticia eliminada:', response.data);
            getNoticias(); // Actualizar la lista de noticias después de la eliminación
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
            <NavBar />
            <div className="container">
                <h1>Noticias</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="col-6 mx-auto mb-3">
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" {...register('titulo', { required: true })} />
                        <label htmlFor="floatingInput">Título</label>
                    </div>
                    <div className="form-floating mb-3">
                        <textarea className="form-control" {...register('descripcion', { required: true })} />
                        <label htmlFor="floatingTextarea">Descripción</label>
                    </div>
                    <div className="mb-3">
                        <input
                            type="date"
                            className="form-control"
                            {...register('fecha', { required: true })}
                        />
                    </div>
                    <div className="mb-3">
                        <select className="form-control" {...register('chef_id', { required: true })}>
                            <option value="">Selecciona un chef</option>
                            {chefs.map(chef => (
                                <option key={chef.id} value={chef.id}>{chef.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary">Registrar</button>
                    </div>
                </form>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Filtrar por título"
                        value={filtroTitulo}
                        onChange={handleFiltroTituloChange}
                    />
                </div>
                <div className="mt-3">
                    <h2>Lista de Noticias</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Título</th>
                                <th scope="col">Descripción</th>
                                <th scope="col">Fecha</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredNoticias.map(noticia => (
                                <tr key={noticia.id}>
                                    <td>{noticia.titulo}</td>
                                    <td>{noticia.descripcion}</td>
                                    <td>{new Date(noticia.fecha).toLocaleDateString()}</td>
                                    <td>
                                        <button className="btn btn-default me-2" onClick={() => onDelete(noticia.id)}>
                                            <i className="bi bi-trash3 text-danger"></i>
                                        </button>
                                        <Link className="btn btn-default" to={`/noticias/${noticia.id}`}>
                                            <i className="bi bi-pencil text-primary"></i>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};
