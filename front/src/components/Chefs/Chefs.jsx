import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, Link} from 'react-router-dom';

export const Chefs = () => {
    const [chefs, setChefs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

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
    };

    const deleteChef = async (id) => {
        if (window.confirm("¿Desea borrar este chef?")) {
            await axios.delete(`http://localhost:3001/api/chefs/${id}`);
            getChefs();
        }
    };

    const mostrarFormulario = () => {
        navigate('/chef/0');
    };

    useEffect(() => {
        getChefs();
    }, []);

    return (
        <>
            <div className="container text-center">
                <br />
                <h1>Chefs</h1>
                <br />
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
                                    <label htmlFor="floatingInput">Buscar por nombre</label>
                                </div>
                                <button type="button" className="btn btn-primary" onClick={getChefs}>Buscar</button>
                            </div>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => mostrarFormulario()}
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
                                        <Link to={`/chef/${c.id}`}>
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
            </div>
        </>
    );
}
