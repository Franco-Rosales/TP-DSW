import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Categorias() {
    const [categorias, setCategorias] = useState([]);
    const [nombreFiltro, setNombreFiltro] = useState('');
    const navigate = useNavigate();

    async function getCategories() {
        try {
            const response = await axios.get("http://localhost:3001/api/categorias");
            setCategorias(response.data);
        } catch (error) {
            console.error('Error al traer los datos de las categorias:', error);
        }
    };

    function mostrarFormulario() {
        navigate('/categorias/0')
    };

    async function eliminarCategoria(id) {
        if (window.confirm("¿Desea borrar esta categoria?")) {
            await axios.delete(`http://localhost:3001/api/categorias/${id}`);
            getCategories();
        }
    };

    function handleBuscar() {
        let url = "http://localhost:3001/api/categorias?";
        if (nombreFiltro) {
            url += `nombre=${nombreFiltro}&`;
        }
        axios.get(url).then(response => {
            setCategorias(response.data);
        });
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <>
            <div className="container text-center">
                <br />
                <h1>Categorias</h1>
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
                                Crear Nueva Categoria
                            </button>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Numero de Categoria</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Descripcion</th>
                                    <th scope="col">Fecha de Agregado</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categorias.map((categoria) => (
                                    <tr key={categoria.id}>
                                        <td>{categoria.id}</td>
                                        <td>{categoria.nombre}</td>
                                        <td>{categoria.descripcion}</td>
                                        <td>{categoria.fecha_agregado}</td>
                                        <td>
                                            <Link to={`/categorias/${categoria.id}`}>
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
                                                onClick={() => eliminarCategoria(categoria.id)}
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

export { Categorias };
