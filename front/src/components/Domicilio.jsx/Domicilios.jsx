import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import { NavBar } from "../NavBar/NavBar";


export const Domicilios = () => {
    const [domicilios, setDomicilios] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const getDomicilios = async () => {
        try {
            let url = "http://localhost:3001/api/domicilios";
            if (searchTerm) {
                url += `?calle=${searchTerm}`; // Filtra por nombre si hay un término de búsqueda
            }
            const response = await axios.get(url);
            setDomicilios(response.data);
        } catch (error) {
            console.error('Error al traer los datos de los domicilios:', error);
        }
    };

    const deleteDomicilio = async (id) => {
        if (window.confirm("¿Desea borrar este domicilio?")) {
            await axios.delete(`http://localhost:3001/api/domicilios/${id}`);
            getDomicilios();
        }
    };

    const mostrarFormulario = () => {
        navigate('/domicilio/0');
    };

    useEffect(() => {
        getDomicilios();
    }, []);

    return (
        <>
            <div className="container text-center">
                <br />
                <h1>Domicilios</h1>
                <br />
                    <>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center" style={{ gap: '10px' }}>
                                <div className="form-floating" style={{ flex: '1' }}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="Buscar domicilios"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <label htmlFor="floatingInput">Buscar por calle</label>
                                </div>
                                <button type="button" className="btn btn-primary" onClick={getDomicilios}>Buscar</button>
                            </div>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => mostrarFormulario()}
                            >
                                Registrar nuevo domicilio
                            </button>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Calle</th>
                                    <th scope="col">Numero calle</th>
                                    <th scope="col">Barrio</th>
                                    <th scope="col">Fecha de carga</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {domicilios.map((d) => (
                                    <tr key={d.id}>
                                        <td>{d.calle}</td>
                                        <td>{d.nro_calle}</td>
                                        <td>{d.barrio}</td>
                                        <td>{d.fecha_carga}</td>
                                        <td>
                                        <Link to={`/domicilio/${d.id}`}>
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
                                                onClick={() => deleteDomicilio(d.id)}
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