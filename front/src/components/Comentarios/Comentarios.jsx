import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export const Comentarios = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [comentarios, setComentarios] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [chefs, setChefs] = useState([]);
    const [recetas, setRecetas] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [editarComentarioId, setEditarComentarioId] = useState(null);
    const [comentario, setComentario] = useState({});

    const cancelar = () => {
        setMostrarFormulario(false);
        setEditarComentarioId(null);
        setComentario({});
    }

    const getComentarios = async (search = '') => {
        try {
            const response = await axios.get(`http://localhost:3001/api/comentarios?contenido=${search}`);
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

    const handleSearch = async () => {
        await getComentarios(searchTerm);
    };

    const onSubmit = async (data) => {
        try {
            if (editarComentarioId) {
                await axios.put(`http://localhost:3001/api/comentarios/${editarComentarioId}`, data);
            } else {
                await axios.post("http://localhost:3001/api/comentarios", data);
            }
            cancelar();
            getComentarios();
        } catch (error) {
            console.error('Error registrando el comentario:', error);
        }
    };

    const handleEditarComentario = async (id) => {
        try {
            const comentarioDatos = await axios.get(`http://localhost:3001/api/comentarios/${id}`);
            setComentario(comentarioDatos.data);
            setMostrarFormulario(true);
            setEditarComentarioId(id);
        } catch (error) {
            console.error('Error al traer los datos del comentario:', error);
        }
    }

    useEffect(() => {
        getComentarios();
        getChefs();
        getRecetas();
    }, []);

    return (
        <>
            <div className="container text-center">
                <br />
                <h1>Comentarios</h1>
                <br />
                {!mostrarFormulario ? (
                    <>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center" style={{ gap: '10px' }}>
                                <div className="form-floating" style={{ flex: '1' }}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="Buscar comentarios"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <label htmlFor="floatingInput">Buscar Comentarios</label>
                                </div>
                                <button type="button" className="btn btn-primary" onClick={handleSearch}>Buscar</button>
                            </div>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => setMostrarFormulario(true)}
                            >
                                Registrar nuevo comentario
                            </button>
                        </div>
                        <table className="table">
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
                                                type="button"
                                                className="btn btn-warning me-2"
                                                onClick={() => handleEditarComentario(c.id)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() => deleteComentarios(c.id)}
                                            >
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
                        <div className="d-flex justify-content-between" style={{ width: '50%' }}>
                            <button type="submit" className="btn btn-primary">
                                {editarComentarioId ? 'Confirmar Actualización' : 'Registrar Comentario'}
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={cancelar}>
                                Volver
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </>
    );
}
