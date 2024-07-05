import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dificultades() {
    const [dificultades, setDificultades] = useState([]);
    const [nombreFiltro, setNombreFiltro] = useState('');
    const navigate = useNavigate();

    async function getDificultades() {
        try {
            const response = await axios.get("http://localhost:3001/api/dificultades");
            setDificultades(response.data);
        } catch (error) {
            console.error('Error al traer los datos de las dificultades:', error);
        }
    }

    useEffect(() => {
        getDificultades();
    }, []);

    async function eliminarDificultad(id) {
        if (window.confirm("¿Desea borrar este contacto?")) {
            await axios.delete(`http://localhost:3001/api/dificultades/${id}`);
            getDificultades();
        }
    }

    function handleBuscar() {
        let url = "http://localhost:3001/api/dificultades?";
        if (nombreFiltro) {
            url += `nombre=${nombreFiltro}&`;
        }
        axios.get(url).then(response => {
            setDificultades(response.data);
        });
    }

    function mostrarFormulario() {
        navigate('/dificultades/0')
    }

    return (
        <>
            <div className="container text-center">
                <br />
                <h1>Dificultad</h1>
                <br />
                    <>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center" style={{ gap: '10px' }}>
                                <div className="form-floating" style={{ flex: '1' }}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="Buscar por nombre"
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
                                Registrar nueva dificultad
                            </button>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Edad recomendada</th>
                                    <th scope="col">Descripcion</th>
                                    <th scope="col">Fecha de carga</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dificultades && dificultades.map((d) => (
                                    <tr key={d.id}>
                                        <td>{d.nombre}</td>
                                        <td>{d.edad_recomendada}</td>
                                        <td>{d.descripcion}</td>
                                        <td>{d.fechaCarga}</td>

                                        <td>
                                            <Link to={`/dificultades/${d.id}`}>
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
                                                onClick={() => eliminarDificultad(d.id)}
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

export { Dificultades };