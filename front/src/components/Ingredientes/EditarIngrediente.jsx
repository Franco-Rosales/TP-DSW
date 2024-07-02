import { useParams, useNavigate } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar";
import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
import axios from "axios";

export const EditarIngrediente = () => {
    const {id} = useParams();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ingrediente, setIngrediente] = useState({});
    const navigate = useNavigate();

    const cancelar = () => {
        navigate('/ingredientes');
    }

    const getIngrediente = async (id) => {
        try {
            const ingredienteDatos = await axios.get(`http://localhost:3001/api/ingredientes/${id}`);
            setIngrediente(ingredienteDatos.data);
        } catch (error) { 
            console.error('Error al traer los datos del ingrediente:', error);
        }
    }

    const onSubmit = async(data) => {
        await axios.put(`http://localhost:3001/api/ingredientes/${id}`, data)
        cancelar();
    }

    useEffect(() => {
        getIngrediente(id);
    }, []);

    return (
        <>
            <NavBar/>
            <form onSubmit={handleSubmit(onSubmit)} className='mt-5'>
                <h1 className='mb-5'>Ingrediente {ingrediente.nombre}</h1>
                    <div className="row mt-3">
                        <div className="col-4 text-end">
                            <label htmlFor="nombre">Nombre:</label>
                        </div>
                        <div className="col-8 text-start">
                            <input type="text" 
                                className='form-control'
                                defaultValue = {ingrediente.nombre}
                                {...register('nombre', {required: 'El nombre es requerido'})}
                            />
                            {errors.nombre && <span className='text-danger'>{errors.nombre.message}</span>}
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-4 text-end">
                            <label htmlFor="popularidad">Popularidad:</label>
                        </div>
                        <div className="col-8 text-start">
                            <input type="number" 
                                className='form-control'
                                defaultValue = {ingrediente.popularidad}
                                {...register('popularidad', {required: 'La popularidad es requerida'})}
                            />
                            {errors.popularidad && <span className='text-danger'>{errors.popularidad.message}</span>}
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-4 text-end">
                            <label htmlFor="fecha_agregado">Fecha de agregado:</label>
                        </div>
                        <div className="col-8 text-start">
                            <input type="date" 
                                className='form-control'
                                defaultValue={ingrediente.fecha_agregado}
                                {...register('fecha_agregado', {required: 'La fecha de agregado es requerida'})}
                                />
                                {errors.fecha_agregado && <span className='text-danger'>{errors.fecha_agregado.message}</span>}
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