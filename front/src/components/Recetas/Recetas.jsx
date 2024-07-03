import axios from "axios";
import { useEffect, useState } from "react";
import { NavBar } from "../NavBar/NavBar";
import { useForm } from 'react-hook-form';

const Recetas = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [recetas, setRecetas] = useState([]);
    const [chefs, setChefs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [editarRecetaId, setEditarRecetaId] = useState(null);
    const [receta, setReceta] = useState({});

    useEffect(() => {
        getRecetas();
        getChefs();
        if (editarRecetaId) {
            getReceta(editarRecetaId);
        }
    }, [editarRecetaId]);

    const getRecetas = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/recetas");
            setRecetas(response.data);
        } catch (error) {
            console.error('Error al traer los datos de las recetas:', error);
        }
    };

    const getChefs = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/chefs");
            setChefs(response.data);
        } catch (error) {
            console.error('Error al traer los datos de los chefs:', error);
        }
    };

    const getReceta = async (id) => {
        try {
            const recetaDatos = await axios.get(`http://localhost:3001/api/recetas/${id}`);
            setReceta(recetaDatos.data);
        } catch (error) { 
            console.error('Error al traer los datos de la receta:', error);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/recetas?nombre=${searchTerm}`);
            setRecetas(response.data);
        } catch (error) {
            console.error('Error al buscar las recetas:', error);
        }
    };

    const deleteReceta = async (id) => {
        if (window.confirm("¿Desea borrar esta receta?")) {
            await axios.delete(`http://localhost:3001/api/recetas/${id}`);
            getRecetas();
        }
    };

    const cancelar = () => {
        setMostrarFormulario(false);
        setEditarRecetaId(null);
        setReceta({});
    };

    const onSubmit = async (data) => {
        try {
            if (editarRecetaId) {
                await axios.put(`http://localhost:3001/api/recetas/${editarRecetaId}`, data);
            } else {
                await axios.post("http://localhost:3001/api/recetas", data);
            }
            cancelar();
            getRecetas();
        } catch (error) {
            console.error('Error registrando la receta:', error);
        }
    };

    const handleEditarReceta = (receta) => {
        setEditarRecetaId(receta.id);
        setMostrarFormulario(true);
    };

    return (
        <>
            <NavBar />
            <div className="container text-center">
                <br />
                <h1>Recetas</h1>
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
                                        placeholder="Buscar recetas"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <label htmlFor="floatingInput">Buscar Nombre</label>
                                </div>
                                <button type="button" className="btn btn-primary" onClick={handleSearch}>Buscar</button>
                            </div>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => setMostrarFormulario(true)}
                            >
                                Crear Nueva Receta
                            </button>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Descripcion</th>
                                    <th scope="col">Instrucciones</th>
                                    <th scope="col">Tiempo De Preparacion</th>
                                    <th scope="col">Fecha De Creacion</th>
                                    <th scope="col">Chef</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recetas.map((r) => (
                                    <tr key={r.id}>
                                        <td>{r.nombre}</td>
                                        <td>{r.descripcion}</td>
                                        <td>{r.instrucciones}</td>
                                        <td>{r.tiempo_preparacion}</td>
                                        <td>{r.fecha_creacion}</td>
                                        <td>{r.chef_id}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-warning me-2"
                                                onClick={() => handleEditarReceta(r)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() => deleteReceta(r.id)}
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
                                id="nombre"
                                placeholder="Nombre de la Receta"
                                defaultValue={receta.nombre}
                                {...register('nombre', { required: 'El nombre es requerido' })}
                            />
                            <label htmlFor="nombre">Nombre de la Receta</label>
                            {errors.nombre && <span className='text-danger'>{errors.nombre.message}</span>}
                        </div>
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <input
                                type="text"
                                className="form-control"
                                id="descripcion"
                                placeholder="Descripcion de la Receta"
                                defaultValue={receta.descripcion}
                                {...register('descripcion', { required: 'La descripcion es requerida' })}
                            />
                            <label htmlFor="descripcion">Descripcion de la Receta</label>
                            {errors.descripcion && <span className='text-danger'>{errors.descripcion.message}</span>}
                        </div>
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <input
                                type="text"
                                className="form-control"
                                id="instrucciones"
                                placeholder="Instrucciones de la Receta"
                                defaultValue={receta.instrucciones}
                                {...register('instrucciones', { required: 'Las instrucciones son requeridas' })}
                            />
                            <label htmlFor="instrucciones">Instrucciones de la Receta</label>
                            {errors.instrucciones && <span className='text-danger'>{errors.instrucciones.message}</span>}
                        </div>
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <input
                                type="number"
                                className="form-control"
                                id="tiempo_preparacion"
                                placeholder="Tiempo de preparación en minutos"
                                defaultValue={receta.tiempo_preparacion}
                                {...register('tiempo_preparacion', { required: 'El tiempo de preparación es requerido' })}
                            />
                            <label htmlFor="tiempo_preparacion">Tiempo de preparación en minutos</label>
                            {errors.tiempo_preparacion && <span className='text-danger'>{errors.tiempo_preparacion.message}</span>}
                        </div>
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <select className="form-select" {...register('chef_id')} defaultValue={receta.chef_id}>
                                <option value="0">Seleccionar chef</option>
                                {chefs.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                            </select>
                        </div>
                        <div className="d-flex justify-content-between" style={{ width: '50%' }}>
                            <button type="submit" className="btn btn-primary">
                                {editarRecetaId ? 'Confirmar Actualización' : 'Registrar Receta'}
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
};

export  {Recetas};
