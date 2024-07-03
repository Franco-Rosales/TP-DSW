import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';


export const Ingredientes = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ingredientes, setIngredientes] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [editarIngredienteId, setEditarIngredienteId] = useState(null);
    const [ingrediente, setIngrediente] = useState({});
    const [nombreFiltro, setNombreFiltro] = useState('');

    const cancelar = () => {
        setMostrarFormulario(false);
        setEditarIngredienteId(null);
        setIngrediente({});
    }

    const getIngredientes = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/ingredientes');
            setIngredientes(response.data);
        } catch (error) {
            console.error('Error al traer los datos de los ingredientes:', error);
        }
    };

    const deleteIngrediente = async (id) => {
        if (window.confirm("¿Desea borrar este ingrediente?")) {
            await axios.delete(`http://localhost:3001/api/ingredientes/${id}`);
            getIngredientes();
        }
    };

    const onSubmit = async (data) => {
        try {
            if (editarIngredienteId) {
                await axios.put(`http://localhost:3001/api/ingredientes/${editarIngredienteId}`, data);
            } else {
                await axios.post("http://localhost:3001/api/ingredientes", data);
            }
            cancelar();
            getIngredientes();
        } catch (error) {
            console.error('Error registrando el ingrediente:', error);
        }
    };

    const handleEditarIngrediente = async (id) => {
        try {
            const ingredienteDatos = await axios.get(`http://localhost:3001/api/ingredientes/${id}`);
            setIngrediente(ingredienteDatos.data);
            setMostrarFormulario(true);
            setEditarIngredienteId(id);
        } catch (error) {
            console.error('Error al traer los datos del ingrediente:', error);
        }
    }

    useEffect(() => {
        getIngredientes();
    }, []);

    function handleBuscar() {
        let url = "http://localhost:3001/api/ingredientes?";
        if (nombreFiltro) {
            url += `nombre=${nombreFiltro}&`;
        }
        axios.get(url).then(response => {
            setIngredientes(response.data);
        });
    }

    return (
        <>
            <div className="container text-center">
                <h1>Ingredientes</h1>
                {!mostrarFormulario ? (
                    <>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center" style={{ gap: '10px' }}>
                                <div className="form-floating" style={{ flex: '1' }}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="Buscar Nombre de Categoria"
                                        value={nombreFiltro}
                                        onChange={(e) => setNombreFiltro(e.target.value)}
                                    />
                                    <label htmlFor="floatingInput">Buscar Nombre</label>
                                </div>
                                <button type="button" className="btn btn-primary" onClick={handleBuscar}>Buscar</button>
                            </div>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => setMostrarFormulario(true)}
                            >
                                Crear Nueva Categoria
                            </button>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Popularidad</th>
                                    <th scope="col">Fecha de agregado</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ingredientes.map((i) => (
                                    <tr key={i.id}>
                                        <td>{i.nombre}</td>
                                        <td>{i.popularidad}</td>
                                        <td>{i.fecha_agregado}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-warning me-2"
                                                onClick={() => handleEditarIngrediente(i.id)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() => deleteIngrediente(i.id)}
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
                    <form onSubmit={handleSubmit(onSubmit)} className="col-6 mx-auto">
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={ingrediente.nombre}
                                {...register('nombre', { required: 'El nombre es requerido' })}
                            />
                            <label htmlFor="nombre">Nombre:</label>
                            {errors.nombre && <span className='text-danger'>{errors.nombre.message}</span>}
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                className="form-control"
                                defaultValue={ingrediente.popularidad}
                                {...register('popularidad', { required: 'La popularidad es requerida' })}
                            />
                            <label htmlFor="popularidad">Popularidad:</label>
                            {errors.popularidad && <span className='text-danger'>{errors.popularidad.message}</span>}
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="date"
                                className="form-control"
                                defaultValue={ingrediente.fecha_agregado}
                                {...register('fecha_agregado', { required: 'La fecha de agregado es requerida' })}
                            />
                            <label htmlFor="fecha_agregado">Fecha de agregado:</label>
                            {errors.fecha_agregado && <span className='text-danger'>{errors.fecha_agregado.message}</span>}
                        </div>
                        <div className="d-flex justify-content-between">
                            <button type="submit" className="btn btn-primary">
                                {editarIngredienteId ? 'Confirmar Actualización' : 'Registrar Ingrediente'}
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={cancelar}>
                                Cancelar
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </>
    );
}
