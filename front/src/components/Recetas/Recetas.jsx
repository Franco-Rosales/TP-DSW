import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate, useParams, Link } from 'react-router-dom'; 

const Recetas = () => {
    const [recetas, setRecetas] = useState([]);
    const [chefs, setChefs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const [categorias, setCategorias] = useState([]);
    const [dificultad, setDificultad] = useState([]);

    const getRecetas = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/recetas");
            setRecetas(response.data);
        } catch (error) {
            console.error('Error al traer los datos de las recetas:', error);
        }
    };

    const getChefs = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/chefs");
            setChefs(response.data);
        } catch (error) {
            console.error('Error al traer los datos de los chefs:', error);
        }
    };

    const getCategorias = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/categorias");
            setCategorias(response.data);
        } catch (error) {
            console.error('Error al traer los datos de las categorias:', error);
        }
    };

    const getDificultades = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/dificultades");
            setDificultad(response.data);
        } catch (error) {
            console.error('Error al traer los datos de las dificultades:', error);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/recetas?nombre=${searchTerm}`);
            setRecetas(response.data);
        } catch (error) {
            console.error('Error al buscar las recetas:', error);
        }
    };

    const deleteReceta = async (id) => {
        if (window.confirm("¿Desea borrar esta receta?")) {
            await axios.delete(`http://localhost:3001/api/recetas/${id}`);
            getRecetas();
        }
    };

    const mostrarFormulario = () => {
        navigate('/receta/0')
    };

    const getChefName = (chefId) => {
        const chef = chefs.find(c => c.id === chefId);
        return chef ? chef.nombre : 'Desconocido';
    };

    const getCategoriaName = (categoriaId) => {
        const categoria = categorias.find(c => c.id === categoriaId);
        return categoria ? categoria.nombre : 'Desconocido';
    };

    const getDificultadesName = (dificultadId) => {
        const dif = dificultad.find(c => c.id === dificultadId);
        return dif ? dif.nombre : 'Desconocido';
    };

    useEffect(() => {
        getRecetas();
        getChefs();
        getCategorias();
        getDificultades();
    }, []);

    return (
        <>
            <div className="container text-center">
                <br />
                <h1>Recetas</h1>
                <br />
                    <>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center" style={{ gap: '10px' }}>
                                <div className="form-floating" style={{ flex: '1' }}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="Buscar recetas"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <label htmlFor="floatingInput">Buscar por nombre</label>
                                </div>
                                <button type="button" className="btn btn-primary" onClick={handleSearch}>Buscar</button>
                            </div>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => mostrarFormulario()}
                            >
                                Registrar nueva receta
                            </button>
                        </div>
                        <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Descripcion</th>
                                <th scope="col">Instrucciones</th>
                                <th scope="col">Tiempo De Preparacion</th>
                                <th scope="col">Fecha De Creacion</th>
                                <th scope="col">Chef</th>
                                <th scope="col">Categoria</th>
                                <th scope="col">Dificultad</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recetas.map((r) => (
                                <tr key={r.id}>
                                    <td>{r.nombre}</td>
                                    <td>{r.descripcion}</td>
                                    <td>{r.instrucciones}</td>
                                    <td>{r.tiempo_preparacion}</td>
                                    <td>{r.fecha_creacion}</td>
                                    <td>{getChefName(r.chef_id)}</td>
                                    <td>{getCategoriaName(r.categoria_id)}</td>
                                    <td>{getDificultadesName(r.dificultad_id)}</td>
                                    <td>
                                        <Link to={`/receta/${r.id}`}>
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
                                            onClick={() => deleteReceta(r.id)}
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
};

export  {Recetas};
