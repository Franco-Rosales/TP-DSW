import { NavBar } from "../NavBar/NavBar";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { ListarReceta } from "./Listado";

export const Recetas = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();
    const [recetas, setRecetas] = useState([]);
    const [chefs, setChefs] = useState([]);

    const onSubmit = async (data) => {
        try {
          const response = await axios.post("http://localhost:3001/api/recetas", data);
          console.log('Receta registrada:', response.data);
        } catch (error) {
          console.error('Error registrando la receta:', error);
        }
    };

    const getRecetas = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/recetas");
            setRecetas(response.data)
        } catch (error) {
            console.error('Error al traer los datos de las recetas:', error);
        }
    };

    const deleteReceta = async (id) => {
        if (window.confirm("¿Desea borrar esta receta?")) {
          await axios.delete(`http://localhost:3001/api/recetas/${id}`);
          getRecetas();
        }
    };

    const getChefs = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/chefs");
            setChefs(response.data)
        } catch (error) {
            console.error('Error al traer los datos de los chefs:', error);
          }
    };

    const cancelar = () => {
        navigate('/');
    };

    useEffect(() => {
        getRecetas();
        getChefs();
    }, []);
    
    return (
        <>
        <NavBar/>
        <div className="container text-center">
            <h1>Recetas</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="col-6 mx-auto">
            <div className="form-floating mb-3">
                <input type="text" className="form-control" {...register('nombre', { required: true })}/>
                <label htmlFor="floatingInput">Nombre</label>
                {errors.nombre && <span>Este campo es obligatorio</span>}
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" {...register('descripcion', { required: true })}/>
                <label htmlFor="floatingInput">Descripcion</label>
                {errors.descripcion && <span>Este campo es obligatorio</span>}
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" {...register('instrucciones', { required: true })}/>
                <label htmlFor="floatingInput">Instrucciones</label>
                {errors.instrucciones && <span>Este campo es obligatorio</span>}
            </div>
            <div className="form-floating mb-3">
                <input type="number" className="form-control" {...register('tiempo_preparacion', { required: true })}/>
                <label htmlFor="floatingInput">Tiempo de preparación en minutos</label>
                {errors.tiempo_preparacion && <span>Este campo es obligatorio</span>}
            </div>
            <div>
                <select className="form-select" 
                {...register('chef_id')}
                >
                <option value="0">Seleccionar chef</option>
                { chefs && chefs.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                </select>
            </div>
            <div>
            <button type="submit" className="btn btn-primary">Registrar</button>
            <button className="btn btn-primary" onClick={cancelar}>Cancelar</button>
            </div>
        </form>
        </div>
        <ListarReceta recetas={recetas} deleteReceta={deleteReceta}/>
        </>
    );
}