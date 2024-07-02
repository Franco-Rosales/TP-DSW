import { useParams, useNavigate } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";

export const EditarReceta = () => {
    const {id} = useParams();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [receta, setReceta] = useState({});
    const [chefs, setChefs] = useState([]);
    const navigate = useNavigate();

    const cancelar = () => {
        navigate('/recetas');
    }

    const getReceta = async (id) => {
        try {
            const recetaDatos = await axios.get(`http://localhost:3001/api/recetas/${id}`);
            setReceta(recetaDatos.data);
        } catch (error) { 
            console.error('Error al traer los datos de la receta:', error);
        }
    }

    const getChefs = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/chefs");
            setChefs(response.data)
        } catch (error) {
            console.error('Error al traer los datos de los chefs:', error);
          }
    };

    const onSubmit = async(data) => {
        await axios.put(`http://localhost:3001/api/recetas/${id}`, data)
        cancelar();
    }

    useEffect(() => {
        getReceta(id);
        getChefs();
    }, []);

    return (
        <>
            <NavBar/>
            <form onSubmit={handleSubmit(onSubmit)} className='mt-5'>
                <h1 className='mb-5'>Receta {receta.nombre}</h1>
                    <div className="row mt-3">
                        <div className="col-4 text-end">
                            <label htmlFor="nombre">Nombre:</label>
                        </div>
                        <div className="col-8 text-start">
                            <input type="text" 
                                className='form-control'
                                defaultValue = {receta.nombre}
                                {...register('nombre', {required: 'El nombre es requerido'})}
                            />
                            {errors.nombre && <span className='text-danger'>{errors.nombre.message}</span>}
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-4 text-end">
                            <label htmlFor="descripcion">Descripcion:</label>
                        </div>
                        <div className="col-8 text-start">
                            <input type="text" 
                                className='form-control'
                                defaultValue = {receta.descripcion}
                                {...register('descripcion', {required: 'La descripcion es requerida'})}
                            />
                            {errors.descripcion && <span className='text-danger'>{errors.descripcion.message}</span>}
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-4 text-end">
                            <label htmlFor="instrucciones">Instrucciones:</label>
                        </div>
                        <div className="col-8 text-start">
                            <input type="text" 
                                className='form-control'
                                defaultValue={receta.instrucciones}
                                {...register('instrucciones', {required: 'Las instrucciones son requeridas'})}
                                />
                                {errors.instrucciones && <span className='text-danger'>{errors.instrucciones.message}</span>}
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-4 text-end">
                            <label htmlFor="tiempo_preparacion">Tiempo de preparación en minutos:</label>
                        </div>
                        <div className="col-8 text-start">
                            <input type="text" 
                                className='form-control'
                                defaultValue = {receta.tiempo_preparacion}
                                {...register('tiempo_preparacion', {required: 'El tiempo de preparación es requerido'})}
                                />
                                {errors.tiempo_preparacion && <span className='text-danger'>{errors.tiempo_preparacion.message}</span>}
                        </div>
                    <div className="row mt-3">
                        <div className="col-4 text-end">
                            <label htmlFor="chef">Chef:</label>
                        </div>
                        <div className="col-8 text-start">
                            <select className="form-select" 
                            {...register('chef_id')}
                            defaultValue = {receta.chef_id}
                            >
                            { chefs && chefs.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                            </select>
                        </div>
                    </div>
                    </div>
                    <div className="mt-5 mb-5">
                        <button className='btn btn-danger ms-2' onClick={cancelar}>Cancelar</button>
                        <input className="btn btn-success ms-2" type="submit" value={'Actualizar'} />
                    </div>
            </form>
        </>
    );
}