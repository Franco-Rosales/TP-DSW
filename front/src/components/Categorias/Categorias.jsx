import axios from "axios";
import { useEffect, useState } from "react";


function Categorias() {
    const [categorias, setCategorias] = useState([]);
    const [nombreFiltro, setNombreFiltro] = useState('');
    const [nombreCategoria, setNombreCategoria] = useState('');
    const [descripcionCategoria, setDescripcionCategoria] = useState('');
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [editarCategoriaId, setEditarCategoriaId] = useState(null);

    async function getCategories() {
        try {
            const response = await axios.get("http://localhost:3001/api/categorias");
            setCategorias(response.data);
        } catch (error) {
            console.error('Error al traer los datos de las categorias:', error);
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    async function eliminarCategoria(id) {
        await axios.delete(`http://localhost:3001/api/categorias/${id}`);
        getCategories();
    }

    function handleBuscar() {
        let url = "http://localhost:3001/api/categorias?";
        if (nombreFiltro) {
            url += `nombre=${nombreFiltro}&`;
        }
        axios.get(url).then(response => {
            setCategorias(response.data);
        });
    }

    async function handleRegistrarCategoria(e) {
        e.preventDefault();
        try {
            if (editarCategoriaId) {
                await axios.put(`http://localhost:3001/api/categorias/${editarCategoriaId}`, {
                    nombre: nombreCategoria,
                    descripcion: descripcionCategoria
                });
            } else {
                await axios.post("http://localhost:3001/api/categorias", {
                    nombre: nombreCategoria,
                    descripcion: descripcionCategoria
                });
            }
            setNombreCategoria('');
            setDescripcionCategoria('');
            setMostrarFormulario(false);
            setEditarCategoriaId(null);
            getCategories();
        } catch (error) {
            console.error('Error al registrar la categoria:', error);
        }
    }

    function handleEditarCategoria(categoria) {
        setNombreCategoria(categoria.nombre);
        setDescripcionCategoria(categoria.descripcion);
        setEditarCategoriaId(categoria.id);
        setMostrarFormulario(true);
    }

    return (
        <>
            <div className="container text-center">
                <br />
                <h1>Consultar Categorias</h1>
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
                                            <button
                                                type="button"
                                                className="btn btn-warning me-2"
                                                onClick={() => handleEditarCategoria(categoria)}
                                            >
                                                Editar
                                            </button>
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
                ) : (
                    <form onSubmit={handleRegistrarCategoria} className="d-flex flex-column align-items-center">
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <input
                                type="text"
                                className="form-control"
                                id="nombreCategoria"
                                placeholder="Nombre de la Categoria"
                                value={nombreCategoria}
                                onChange={(e) => setNombreCategoria(e.target.value)}
                                required
                            />
                            <label htmlFor="nombreCategoria">Nombre de la Categoria</label>
                        </div>
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <input
                                type="text"
                                className="form-control"
                                id="descripcionCategoria"
                                placeholder="Descripcion de la Categoria"
                                value={descripcionCategoria}
                                onChange={(e) => setDescripcionCategoria(e.target.value)}
                                required
                            />
                            <label htmlFor="descripcionCategoria">Descripcion de la Categoria</label>
                        </div>
                        <div className="d-flex justify-content-between" style={{ width: '50%' }}>
                            <button type="submit" className="btn btn-primary">
                                {editarCategoriaId ? 'Confirmar Actualización' : 'Registrar Categoria'}
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={() => {
                                setMostrarFormulario(false);
                                setEditarCategoriaId(null);
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

export { Categorias };
