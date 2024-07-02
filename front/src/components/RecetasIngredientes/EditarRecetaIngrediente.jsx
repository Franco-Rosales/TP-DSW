import { useParams, useNavigate } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";

export const EditarRecetaIngrediente = () => {
    const {id} = useParams();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ recetas, setRecetas ] = useState([]);
    const [ ingredientes, setIngredientes ] = useState([]);
    const [ recetaIngrediente, setRecetaIngrediente ] = useState({});
    const navigate = useNavigate();

    const cancelar = () => {
        navigate('/recetas-ingredientes');
    }

    const getRecetaIngrediente = async (id) => {
        try {
            const recetaIngredienteDatos = await axios.get(`http://localhost:3001/api/recetas-ingredientes/${id}`);
            setRecetaIngrediente(recetaIngredienteDatos.data);
        } catch (error) { 
            console.error('Error al traer los datos del ingrediente de la receta:', error);
        }
    }

    const getRecetas = async () => {
        try {
            const recetaDatos = await axios.get('http://localhost:3001/api/recetas');
            setRecetas(recetaDatos.data);
        } catch (error) { 
            console.error('Error al traer los datos de las recetas:', error);
        }
    }

    const getIngredientes = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/ingredientes");
            setIngredientes(response.data)
        } catch (error) {
            console.error('Error al traer los datos de los ingredientes:', error);
          }
    };

    const onSubmit = async(data) => {
        await axios.put(`http://localhost:3001/api/recetas-ingredientes/${id}`, data)
        console.log('datos: ',data);
        cancelar();
    }

    useEffect(() => {
        getRecetas();
        getIngredientes();
        getRecetaIngrediente(id);
    }, []);

    return (
        <>
            <NavBar/>
            <form onSubmit={handleSubmit(onSubmit)} className='mt-5'>
                <h1 className='mb-5'>Actualizar ingrediente de receta</h1>
                    <div className="row mt-3">
                        <div className="col-4 text-end">
                            <label htmlFor="receta">Receta:</label>
                        </div>
                        <div className="col-8 text-start">
                            <select className="form-select" 
                            {...register('receta_id')}
                            defaultValue = {recetaIngrediente.receta_id}
                            >
                            { recetas && recetas.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-4 text-end">
                            <label htmlFor="ingrediente">Ingrediente:</label>
                        </div>
                        <div className="col-8 text-start">
                            <select className="form-select" 
                            {...register('ingrediente_id')}
                            defaultValue = {recetaIngrediente.ingrediente_id}
                            >
                            { ingredientes && ingredientes.map(i => <option key={i.id} value={i.id}>{i.nombre}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-4 text-end">
                            <label htmlFor="cantidad">Cantidad:</label>
                        </div>
                        <div className="col-8 text-start">
                            <input type="number" 
                                className='form-control'
                                defaultValue={recetaIngrediente.cantidad}
                                {...register('cantidad', {required: 'La cantidad es requerida'})}
                                />
                                {errors.cantidad && <span className='text-danger'>{errors.cantidad.message}</span>}
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-4 text-end">
                            <label htmlFor="unidad">Unidad:</label>
                        </div>
                        <div className="col-8 text-start">
                            <input type="text" 
                                className='form-control'
                                defaultValue = {recetaIngrediente.unidad}
                                {...register('unidad', {required: 'La unidad es requerida'})}
                                />
                                {errors.unidad && <span className='text-danger'>{errors.unidad.message}</span>}
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