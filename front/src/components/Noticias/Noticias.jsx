import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import {useParams, useNavigate, Link } from 'react-router-dom';

const Noticias = () => {
    const navigate = useNavigate();
    const [noticias, setNoticias] = useState([]);
    const [chefs, setChefs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const getNoticias = async () => {
        try {
            let url = "http://localhost:3001/api/noticias";
            if (searchTerm) {
                url += `?titulo_like=${searchTerm}`; 
            }
            const response = await axios.get(url);
            setNoticias(response.data);
            console.log(noticias);
        } catch (error) {
            console.error('Error al traer los datos de las noticias:', error);
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

    const onDelete = async (id) => {
        if (window.confirm("¿Desea borrar esta noticia?")) {
            await axios.delete(`http://localhost:3001/api/noticias/${id}`);
            getNoticias();
        }
    };

    const getChefName = (chefId) => {
        const chef = chefs.find(c => c.id === chefId);
        return chef ? chef.nombre : 'Desconocido';
    };

    const mostrarFormulario = () => {
        navigate('/noticias/0');
    };

    useEffect(() => {
        getNoticias();
        getChefs();
    }, []);

    return (
        <>
            <div className="container text-center">
                <br />
                <h1>Noticias</h1>
                <br />
                    <>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center" style={{ gap: '10px' }}>
                                <div className="form-floating" style={{ flex: '1' }}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="Buscar por título"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <label htmlFor="floatingInput">Buscar por título</label>
                                </div>
                                <button type="button" className="btn btn-primary" onClick={getNoticias}>Buscar</button>
                            </div>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => mostrarFormulario()}
                            >
                                Registrar nueva noticia
                            </button>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Título</th>
                                    <th scope="col">Descripción</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Chef</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {noticias.map(noticia => (
                                    <tr key={noticia.id}>
                                        <td>{noticia.titulo}</td>
                                        <td>{noticia.descripcion}</td>
                                        <td>{noticia.fecha}</td>
                                        <td>{getChefName(noticia.chef_id)}</td>
                                        <td>
                                            <Link to={`/noticias/${noticia.id}`}>
                                                <button 
                                                className="btn btn-warning me-2" >
                                                    Editar
                                                </button>
                                            </Link>
                                            <button className="btn btn-danger" onClick={() => onDelete(noticia.id)}>
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
            </div>
        </>
    );
};

export { Noticias };
