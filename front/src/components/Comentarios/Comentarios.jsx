import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export const Comentarios = () => {
    const navigate = useNavigate();
    const [comentarios, setComentarios] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [chefs, setChefs] = useState([]);
    const [recetas, setRecetas] = useState([]);

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

    const mostrarFormulario = () => {
        navigate('/comentarios/0')
    };

    const getRecetaName = (recetaId) => {
        const receta = recetas.find(r => r.id === recetaId);
        return receta ? receta.nombre : 'Desconocido';
    };

    const getChefName = (chefId) => {
        const chef = chefs.find(c => c.id === chefId);
        return chef ? chef.nombre : 'Desconocido';
    };

    useEffect(() => {
        getComentarios();
        getRecetas();
        getChefs();
    }, []);

    return (
        <>
            <div className="container text-center">
                <br />
                <h1>Comentarios</h1>
                <br />
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
                                    <label htmlFor="floatingInput">Buscar por contenido</label>
                                </div>
                                <button type="button" className="btn btn-primary" onClick={handleSearch}>Buscar</button>
                            </div>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => mostrarFormulario()}
                            >
                                Registrar nuevo comentario
                            </button>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Contenido</th>
                                    <th scope="col">Fecha de Creación</th>
                                    <th scope="col">Recetas</th>
                                    <th scope="col">Chef</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comentarios.map((c) => (
                                    <tr key={c.id}>
                                        <td>{c.contenido}</td>
                                        <td>{c.fecha_creacion}</td>
                                        <td>{getRecetaName(c.receta_id)}</td>
                                        <td>{getChefName(c.chef_id)}</td>
                                        <td>
                                            <Link to={`/comentarios/${c.id}`}>
                                            <button
                                                type="button"
                                                className="btn btn-warning me-2"
                                            >
                                                Editar
                                            </button>
                                            </Link>
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
            </div>
        </>
    );
}
