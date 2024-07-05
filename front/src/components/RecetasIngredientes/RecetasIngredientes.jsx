import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const RecetasIngredientes = () => {

    const [recetasIngredientes, setRecetasIngredientes] = useState([]);
    const navigate = useNavigate();
    const [nombreFiltro, setNombreFiltro] = useState('');
    const [ingredientes, setIngredientes] = useState([]);
    const [recetas, setRecetas] = useState([]);

    const getRecetasIngredientes = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/recetas-ingredientes');
            setRecetasIngredientes(response.data);
        } catch (error) {
            console.error('Error fetching recetas ingredientes:', error);
        }
    };

    const deleteRecetasIngredientes = async (id) => {
        if (window.confirm("¿Desea borrar este ingrediente de la receta?")) {
            await axios.delete(`http://localhost:3001/api/recetas-ingredientes/${id}`);
            getRecetasIngredientes();
        }
    };

    function handleBuscar() {
        let url = "http://localhost:3001/api/recetas-ingredientes/";
        if (nombreFiltro) {
            url += `${nombreFiltro}&`;
        }
        axios.get(url).then(response => {
            setRecetasIngredientes(response.data);
        });
    };

    const getIngredienteName = (ingredienteId) => {
        const ingrediente = ingredientes.find(i => i.id === ingredienteId);
        return ingrediente ? ingrediente.nombre : 'Desconocido';
    };

    const getRecetaName = (recetaId) => {
        const receta = recetas.find(r => r.id === recetaId);
        return receta ? receta.nombre : 'Desconocido';
    };

    const mostrarFormulario = () => {
        navigate('/recetas-ingredientes/0')
    };

    const getRecetas = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/recetas');
            setRecetas(response.data);
        } catch (error) {
            console.error('Error fetching recetas:', error);
        }
    };

    const getIngredientes = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/ingredientes');
            setIngredientes(response.data);
        } catch (error) {
            console.error('Error fetching ingredientes:', error);
        }
    };

    useEffect(() => {
        getRecetas()
        getIngredientes()
        getRecetasIngredientes()
    }, []);

    return (
        <div className='container text-center'>
            <br />
            <h1>Ingredientes de Recetas</h1>
            <br />
        <>
        <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="d-flex align-items-center" style={{ gap: '10px' }}>
                <div className="form-floating" style={{ flex: '1' }}>
                    <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="Buscar Nombre de ingrediente"
                        value={nombreFiltro}
                        onChange={(e) => setNombreFiltro(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Buscar por ingrediente</label>
                </div>
                <button type="button" className="btn btn-primary">Buscar</button>
            </div>
            <button
                type="button"
                className="btn btn-success"
                onClick={() => mostrarFormulario()}
            >
            Asociar nuevo ingrediente a receta
            </button>
        </div>
        <table className="table mt-5 mx-3">
            <thead>
                <tr>
                    <th scope="col">Receta</th>
                    <th scope="col">Ingrediente</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Unidad</th>
                    <th scope="col">Acciones</th>
                </tr>
                </thead>
                    <tbody>
                        {recetasIngredientes &&
                            recetasIngredientes.map((ri) => (
                            <tr key={ri.id}>
                            <td>{getRecetaName(ri.receta_id)}</td>
                            <td>{getIngredienteName(ri.ingrediente_id)}</td>
                            <td>{ri.cantidad}</td>
                            <td>{ri.unidad}</td>
                            <td>
                                <Link to={`/recetas-ingredientes/${ri.id}`}>
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
                                    onClick={() => deleteRecetasIngredientes(ri.id)}
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
    );
}