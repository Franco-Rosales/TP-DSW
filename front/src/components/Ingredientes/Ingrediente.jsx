import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate, Link } from "react-router-dom";

export const Ingrediente = () => {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [ingrediente, setIngrediente] = useState({});
    const {id} = useParams();
    const navigate = useNavigate();

    const volver = () => {
        navigate('/ingredientes');
    };

    const getIngrediente = async (id) => {
        try {
            const ingredienteDatos = await axios.get(`http://localhost:3001/api/ingredientes/${id}`);
            setIngrediente(ingredienteDatos.data);
            setFormValues(ingredienteDatos.data);
        } catch (error) {
            console.error('Error al traer los datos del ingrediente:', error);
        }
    };

    const onSubmit = async (data) => {
        try {
            if (id > 0) {
                await axios.put(`http://localhost:3001/api/ingredientes/${id}`, data);
            } else {
                await axios.post("http://localhost:3001/api/ingredientes", data);
            }
            volver();
        } catch (error) {
            console.error('Error registrando el ingrediente:', error);
        }
    };

    const setFormValues = (ingrediente) => {
        setValue('nombre', ingrediente.nombre);
        setValue('popularidad', ingrediente.popularidad);
        setValue('fecha_agregado', ingrediente.fecha_agregado);
    };

    useEffect(() => {
        getIngrediente(id);
    }, []);

    return (
        <div className="container text-center">
                <br />
                <h1>Ingredientes</h1>
                <br />
                <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column align-items-center">
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <input
                                type="text"
                                className="form-control"
                                id="nombre"
                                defaultValue={ingrediente.nombre}
                                {...register('nombre', { required: 'El nombre es requerido' })}
                            />
                            <label htmlFor="nombre">Nombre:</label>
                            {errors.nombre && <span className='text-danger'>{errors.nombre.message}</span>}
                        </div>
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <input
                                type="number"
                                className="form-control"
                                defaultValue={ingrediente.popularidad}
                                {...register('popularidad', { required: 'La popularidad es requerida' })}
                            />
                            <label htmlFor="popularidad">Popularidad:</label>
                            {errors.popularidad && <span className='text-danger'>{errors.popularidad.message}</span>}
                        </div>
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <input
                                type="date"
                                className="form-control"
                                defaultValue={ingrediente.fecha_agregado}
                                {...register('fecha_agregado', { required: 'La fecha de agregado es requerida' })}
                            />
                            <label htmlFor="fecha_agregado">Fecha de agregado:</label>
                            {errors.fecha_agregado && <span className='text-danger'>{errors.fecha_agregado.message}</span>}
                        </div>
                        <div className="d-flex justify-content-between mt-2 mb-3" style={{ width: '50%' }}>
                            <button type="submit" className="btn btn-primary">
                                {id > 0 ? 'Confirmar Actualización' : 'Registrar Ingrediente'}
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={volver}>
                                Cancelar
                            </button>
                        </div>
                    </form>
        </div>
    );
}