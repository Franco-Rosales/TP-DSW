import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate} from 'react-router-dom';

export const Chefs = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [chefs, setChefs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [editarChefId, setEditarChefId] = useState(null);
    const [chef, setChef] = useState({});
    const navigate = useNavigate();

    const cancelar = () => {
        setMostrarFormulario(false);
        setEditarChefId(null);
        setChef({});
        navigate('/chefs');
    }

    const getChefs = async () => {
        try {
            let url = "http://localhost:3001/api/chefs";
            if (searchTerm) {
                url += `?nombre_like=${searchTerm}`; // Filtra por nombre si hay un término de búsqueda
            }
            const response = await axios.get(url);
            setChefs(response.data);
        } catch (error) {
            console.error('Error al traer los datos de los chefs:', error);
        }
    }

    const deleteChef = async (id) => {
        if (window.confirm("¿Desea borrar este chef?")) {
            await axios.delete(`http://localhost:3001/api/chefs/${id}`);
            getChefs();
        }
    };

    const onSubmit = async (data) => {
        try {
            if (editarChefId) {
                await axios.put(`http://localhost:3001/api/chefs/${editarChefId}`, data);
            } else {
                await axios.post("http://localhost:3001/api/chefs", data);
            }
            cancelar();
            getChefs();
        } catch (error) {
            console.error('Error registrando al chef:', error);
        }
    };

    const handleEditarChef = async (id) => {
        try {
            const chefDatos = await axios.get(`http://localhost:3001/api/chefs/${id}`);
            setChef(chefDatos.data);
            setMostrarFormulario(true);
            setEditarChefId(id);
        } catch (error) {
            console.error('Error al traer los datos del chef:', error);
        }
    }

    useEffect(() => {
        getChefs();
    }, []);

    return (
        <>
            <div className="container text-center">
                <br />
                <h1>Chefs</h1>
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
                                        placeholder="Buscar chefs"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <label htmlFor="floatingInput">Buscar Chefs</label>
                                </div>
                                <button type="button" className="btn btn-primary" onClick={getChefs}>Buscar</button>
                            </div>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => setMostrarFormulario(true)}
                            >
                                Registrar nuevo chef
                            </button>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Biografia</th>
                                    <th scope="col">Cantidad de recetas</th>
                                    <th scope="col">Fecha de nacimiento</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {chefs.map((c) => (
                                    <tr key={c.id}>
                                        <td>{c.nombre}</td>
                                        <td>{c.biografia}</td>
                                        <td>{c.cantidad_recetas}</td>
                                        <td>{c.fecha_nacimiento}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-warning me-2"
                                                onClick={() => handleEditarChef(c.id)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() => deleteChef(c.id)}
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
                                placeholder="Nombre"
                                defaultValue={chef.nombre}
                                {...register('nombre', { required: 'El nombre es requerido' })}
                            />
                            <label htmlFor="nombre">Nombre</label>
                            {errors.nombre && <span className='text-danger'>{errors.nombre.message}</span>}
                        </div>
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <input
                                type="text"
                                className="form-control"
                                id="biografia"
                                placeholder="Biografia"
                                defaultValue={chef.biografia}
                                {...register('biografia', { required: 'La biografia es requerida' })}
                            />
                            <label htmlFor="biografia">Biografia</label>
                            {errors.biografia && <span className='text-danger'>{errors.biografia.message}</span>}
                        </div>
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <input
                                type="number"
                                className="form-control"
                                id="cantidad_recetas"
                                placeholder="Cantidad de recetas"
                                defaultValue={chef.cantidad_recetas}
                                {...register('cantidad_recetas', { required: 'La cantidad de recetas es requerida' })}
                            />
                            <label htmlFor="cantidad_recetas">Cantidad de recetas</label>
                            {errors.cantidad_recetas && <span className='text-danger'>{errors.cantidad_recetas.message}</span>}
                        </div>
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <input
                                type="date"
                                className="form-control"
                                id="fecha_nacimiento"
                                placeholder="Fecha de nacimiento"
                                defaultValue={chef.fecha_nacimiento}
                                {...register('fecha_nacimiento', { required: 'La fecha de nacimiento es requerida' })}
                            />
                            <label htmlFor="fecha_nacimiento">Fecha de nacimiento</label>
                            {errors.fecha_nacimiento && <span className='text-danger'>{errors.fecha_nacimiento.message}</span>}
                        </div>
                        <div className="d-flex justify-content-between" style={{ width: '50%' }}>
                            <button type="submit" className="btn btn-primary">
                                {editarChefId ? 'Confirmar Actualización' : 'Registrar Chef'}
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
