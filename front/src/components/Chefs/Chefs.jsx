import { NavBar } from "../NavBar/NavBar";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Chefs = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ chefs, setChefs ] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    

    const onSubmit = async (data) => {
        try {
          const response = await axios.post("http://localhost:3001/api/chefs", data);
          console.log('Chef registrado:', response.data);
        } catch (error) {
          console.error('Error registrando al chef:', error);
        }
    };

    const cancelar = () => {
        navigate('/');
    }
    
    const getChefs = async () => {
        try {
            let url = "http://localhost:3001/api/chefs";
            if (searchTerm) {
                url += `?nombre_like=${searchTerm}`; // Filtra por nombre si hay un término de búsqueda
            }
            const response = await axios.get(url);
            setChefs(response.data)
        } catch (error) {
            console.error('Error al traer los datos de los chefs:', error);
        }
    }

    const deleteChef = async (id) => {
        if (window.confirm("¿Desea borrar este chef?")) {
          await axios.delete(`http://localhost:3001/api/chefs/${id}`);
          getChefs();
        }
      };
    

    useEffect(() => {
        getChefs();
    }, [])
    
    return (
        <>
        <NavBar/>
        <div className="container text-center">
            <h1>Chefs</h1>
                <div className="d-flex justify-content-start mb-4">
                        <input
                            type="text"
                            className="form-control me-2"
                            placeholder="Buscar chefs"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ maxWidth: '300px' }}
                        />
                        <button className="btn btn-primary" onClick={getChefs}>Buscar</button>
                </div>
            <form onSubmit={handleSubmit(onSubmit)} className="col-6 mx-auto">
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" {...register('nombre', { required: true })}/>
                    <label htmlFor="floatingInput">Nombre</label>
                    {errors.nombre && <span>Este campo es obligatorio</span>}
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" {...register('biografia', { required: true })}/>
                    <label htmlFor="floatingInput">Biografia</label>
                    {errors.biografia && <span>Este campo es obligatorio</span>}
                </div>
                <div className="form-floating mb-3">
                    <input type="number" className="form-control" {...register('cantidad_recetas', { required: true })}/>
                    <label htmlFor="floatingInput">Cantidad de recetas</label>
                    {errors.cantidad_recetas && <span>Este campo es obligatorio</span>}
                </div>
                <div className="form-floating mb-3">
                <input type="date" className="form-control" {...register('fecha_nacimiento', { required: true })}/>
                    <label htmlFor="floatingInput">Fecha de nacimiento</label>
                    {errors.fecha_nacimiento && <span>Este campo es obligatorio</span>}
                </div>
                <div>
                <button type="submit" className="btn btn-primary" onClick={getChefs}>Registrar</button>
                <button className="btn btn-primary" onClick={cancelar}>Cancelar</button>
                </div>
            </form>
        </div>
        <div className="container">
            <table className="table mt-5 mx-3">
                        <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Biografia</th>
                            <th scope="col">Cantidad de recetas</th>
                            <th scope="col">Fecha de nacimiento</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {chefs &&
                            chefs.map((c) => {
                            return (
                                <tr>
                                <td>{c.nombre}</td>
                                <td>{c.biografia}</td>
                                <td>{c.cantidad_recetas}</td>
                                <td>{c.fecha_nacimiento}</td>
                                <td>
                                    <button
                                    className="btn btn-default"
                                    onClick={() => deleteChef(c.id)}
                                    >
                                    <i className="bi bi-trash3 text-danger"></i>
                                    </button>
                                </td>
                                <td>
                                    <Link className="btn btn-default" to={`/chef/${c.id}`} >
                                        <i className="bi bi-pencil text-primary"></i>
                                    </Link>
                                </td>
                                </tr>
                            );
                            })}
                        </tbody>
            </table>
        </div>
        </>
    );
}