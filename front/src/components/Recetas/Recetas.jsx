import { useState, useEffect } from "react";
import { NavBar } from "../NavBar/NavBar";
import axios from 'axios';
import { ListarReceta } from "./Listado.jsx";
import { useForm } from 'react-hook-form';

export const Recetas = () => {


    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
          const response = await axios.post("http://localhost:3001/api/recetas", data);
          console.log('Receta registrada:', response.data);
        } catch (error) {
          console.error('Error registrando la receta:', error);
        }
      };
    
   

    return (
        <>
        <NavBar/>
        <div className="container text-center">
            <h1>Recetas</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="col-6 mx-auto">
            <div className="form-floating mb-3">
                <input type="text" className="form-control" {...register('nombre', { required: true })}/>
                <label htmlFor="floatingInput">Nombre</label>
                {errors.Nombre && <span>Este campo es obligatorio</span>}
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" {...register('descripcion', { required: true })}/>
                <label htmlFor="floatingInput">Descripcion</label>
                {errors.Descripcion && <span>Este campo es obligatorio</span>}
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" {...register('instrucciones', { required: true })}/>
                <label htmlFor="floatingInput">Instrucciones</label>
                {errors.Instrucciones && <span>Este campo es obligatorio</span>}
            </div>
            <div className="form-floating mb-3">
                <input type="nuber" className="form-control" {...register('tiempo_preparacion', { required: true })}/>
                <label htmlFor="floatingInput">Tiempo Preparacion en minutos</label>
                {errors.Tiempo_preparacion && <span>Este campo es obligatorio</span>}
            </div>
            <div className="form-floating mb-3">
                <input type="date" className="form-control" {...register('fecha_creacion', { required: true })}/>
                <label htmlFor="floatingInput">Fecha Creacion</label>
                {errors.Fecha_creacion && <span>Este campo es obligatorio</span>}
            </div>
            <div className="form-floating mb-3">
                <input type="number" className="form-control" {...register('chef_id', { required: true })}/>
                <label htmlFor="floatingInput">Id del chef</label>
                {errors.Chef_id && <span>Este campo es obligatorio</span>}
            </div>
            <div>
            <button type="submit" className="btn btn-primary">Registrar</button>
            <button className="btn btn-primary">Cancelar</button>
            </div>
        </form>
        </div>
        
        </>
    );
}