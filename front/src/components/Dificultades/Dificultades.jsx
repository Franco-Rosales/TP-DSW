import axios from "axios";
import { useEffect, useState } from "react";
import { NavBar } from "../NavBar/NavBar";

function Dificultades() {
    const [dificultades, setDificultades] = useState([]);
    const [nombreFiltro, setNombreFiltro] = useState('');
    const [nombreDificultad, setNombreDificultad] = useState('');
    const [edad_recomendadaDificultad, setEdadRecomendadaDificultad] = useState('');
    const [descripcionDificultad, setDescripcionDificultad] = useState('');
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [editarDificultadId, setEditarDificultadId] = useState(null);

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
        await axios.delete(`http://localhost:3001/api/dificultades/${id}`);
        getDificultades();
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

    async function handleRegistrarDificultad(e) {
        e.preventDefault();
        try {
            if (editarDificultadId) {
                await axios.put(`http://localhost:3001/api/dificultades/${editarDificultadId}`, {
                    nombre: nombreDificultad,
                    edad_recomendada: edad_recomendadaDificultad,
                    descripcion: descripcionDificultad,
                });
            } else {
                await axios.post("http://localhost:3001/api/dificultades", {
                    nombre: nombreDificultad,
                    edad_recomendada: edad_recomendadaDificultad,
                    descripcion: descripcionDificultad
                });
            }
            setNombreDificultad();
            setEdadRecomendadaDificultad();
            setDescripcionDificultad('');
            setMostrarFormulario(false);
            setEditarDificultadId(null);
            getDificultades();

        } catch (error) {
            console.error('Error al registrar la dificultad:', error);
        }
    }

    function handleEditarDificultad(dificultad) {
        setNombreDificultad(dificultad.nombre);
        setEdadRecomendadaDificultad(dificultad.edad_recomendada);
        setDescripcionDificultad(dificultad.descripcion);
        setEditarDificultadId(dificultad.id);
        setMostrarFormulario(true);
    }

    return (
        <>
            <NavBar />
            <div className="container text-center">
                <br />
                <h1>Consultar Dificultades</h1>
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
                                        placeholder="Buscar Nombre de Dificultad"
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
                                Crear Nueva Dificultad
                            </button>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Edad recomendada</th>
                                    <th scope="col">Descripcion</th>
                                    <th scope="col">Fecha Carga</th>

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
                                            <button
                                                type="button"
                                                className="btn btn-warning me-2"
                                                onClick={() => handleEditarDificultad(d)}
                                            >
                                                Editar
                                            </button>
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
                ) : (
                    <form onSubmit={handleRegistrarDificultad} className="d-flex flex-column align-items-center">
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <input
                                type="text"
                                className="form-control"
                                id="descripcionDificultad"
                                placeholder="Nombre de la Dificultad"
                                value={nombreDificultad}
                                onChange={(e) => setNombreDificultad(e.target.value)}
                                required
                            />
                            <label htmlFor="nombreDificultad">Nombre de la Dificultad</label>
                        </div>
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <input
                                type="text"
                                className="form-control"
                                id="edad_recomendadaDificultad"
                                placeholder="Edad recomendada para la Dificulta"
                                value={edad_recomendadaDificultad}
                                onChange={(e) => setEdadRecomendadaDificultad(e.target.value)}
                                required
                            />
                            <label htmlFor="edad_recomendadaDificultad">Edad recomendada para la dificultad</label>
                        </div>
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <input
                                type="text"
                                className="form-control"
                                id="descripcionDificultad"
                                placeholder="Descripcion de la Dificultad"
                                value={descripcionDificultad}
                                onChange={(e) => setDescripcionDificultad(e.target.value)}
                                required
                            />
                            <label htmlFor="nombreDificultad">Descripcion de la Dificultad</label>
                        </div>
                        <div className="d-flex justify-content-between" style={{ width: '50%' }}>
                            <button type="submit" className="btn btn-primary">
                                {editarDificultadId ? 'Confirmar Actualización' : 'Registrar Dificultad'}
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={() => {
                                setMostrarFormulario(false);
                                setEditarDificultadId(null);
                            }}>
                                Volver
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </>
    );
}

export { Dificultades };