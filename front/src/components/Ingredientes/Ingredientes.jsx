import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export const Ingredientes = () => {
    const [ingredientes, setIngredientes] = useState([]);
    const [nombreFiltro, setNombreFiltro] = useState('');
    const navigate = useNavigate();

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

    function handleBuscar() {
        let url = "http://localhost:3001/api/ingredientes?";
        if (nombreFiltro) {
            url += `nombre=${nombreFiltro}&`;
        }
        axios.get(url).then(response => {
            setIngredientes(response.data);
        });
    };

    const mostrarFormulario = () => {
        navigate('/ingrediente/0')
    };

    useEffect(() => {
        getIngredientes();
    }, []);

    return (
        <>
            <div className="container text-center">
                <br />
                <h1>Ingredientes</h1>
                <br />
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
                                    <label htmlFor="floatingInput">Buscar por nombre</label>
                                </div>
                                <button type="button" className="btn btn-primary" onClick={handleBuscar}>Buscar</button>
                            </div>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => mostrarFormulario()}
                            >
                                Registrar nuevo ingrediente
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
                                            <Link to={`/ingrediente/${i.id}`}>
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
            </div>
        </>
    );
}
