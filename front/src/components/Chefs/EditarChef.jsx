import { useParams, useNavigate } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar";
import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
import axios from "axios";

export const EditarChef = () => {
    const {id} = useParams();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [chef, setChef] = useState({});
    const navigate = useNavigate();

    const cancelar = () => {
        navigate('/chefs');
    }

    const getChef = async (id) => {
        try {
            const chefDatos = await axios.get(`http://localhost:3001/api/chefs/${id}`);
            setChef(chefDatos.data);
            console.log(chefDatos.data);
        } catch (error) { 
            console.error('Error al traer los datos del chef:', error);
        }
    }

    const onSubmit = async(data) => {
        await axios.put(`http://localhost:3001/api/chefs/${id}`, data)
        cancelar();
    }

    useEffect(() => {
        getChef(id);
    }, []);

    return (
        <>
            <NavBar/>
            <form onSubmit={handleSubmit(onSubmit)} className='mt-5'>
                <h1 className='mb-5'>Chef {chef.nombre}</h1>
                    <div className="row mt-3">
                        <div className="col-4 text-end">
                            <label htmlFor="nombre">Nombre:</label>
                        </div>
                        <div className="col-8 text-start">
                            <input type="text" 
                                className='form-control'
                                defaultValue = {chef.nombre}
                                {...register('nombre', {required: 'El nombre es requerido'})}
                            />
                            {errors.nombre && <span className='text-danger'>{errors.nombre.message}</span>}
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-4 text-end">
                            <label htmlFor="biografia">Biografia:</label>
                        </div>
                        <div className="col-8 text-start">
                            <input type="text" 
                                className='form-control'
                                defaultValue = {chef.biografia}
                                {...register('biografia', {required: 'La biografia es requerida'})}
                            />
                            {errors.biografia && <span className='text-danger'>{errors.biografia.message}</span>}
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-4 text-end">
                            <label htmlFor="cantidad_recetas">Cantidad de recetas:</label>
                        </div>
                        <div className="col-8 text-start">
                            <input type="number" 
                                className='form-control'
                                defaultValue={chef.cantidad_recetas}
                                {...register('cantidad_recetas', {required: 'La cantidad de recetas es requerida'})}
                                />
                                {errors.cantidad_recetas && <span className='text-danger'>{errors.cantidad_recetas.message}</span>}
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-4 text-end">
                            <label htmlFor="fecha_nacimiento">Fecha de nacimiento:</label>
                        </div>
                        <div className="col-8 text-start">
                            <input type="text" 
                                className='form-control'
                                defaultValue = {chef.fecha_nacimiento}
                                {...register('fecha_nacimiento', {required: 'La fecha de nacimiento es requerida'})}
                                />
                                {errors.fecha_nacimiento && <span className='text-danger'>{errors.fecha_nacimiento.message}</span>}
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