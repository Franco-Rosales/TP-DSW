import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export const Chef = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [chef, setChef] = useState({});
    const {id} = useParams();
    const navigate = useNavigate();

    const volver = () => {
        navigate('/chefs');
    };

    const getChef = async (id) => {
        try {
            const chefDatos = await axios.get(`http://localhost:3001/api/chefs/${id}`);
            setChef(chefDatos.data);
        } catch (error) {
            console.error('Error al traer los datos del chef:', error);
        }
    };

    const onSubmit = async (data) => {
        try {
            if (id > 0) {
                await axios.put(`http://localhost:3001/api/chefs/${id}`, data);
            } else {
                await axios.post("http://localhost:3001/api/chefs", data);
            }
            volver();
        } catch (error) {
            console.error('Error registrando al chef:', error);
        }
    };

    useEffect(() => {
        getChef(id);
    }, []);

    return (
        <div className="container text-center">
                <br />
                <h1>Chefs</h1>
                <br />
                <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column align-items-center">
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <input
                                type="text"
                                className="form-control"
                                id="nombre"
                                placeholder="Nombre"
                                defaultValue={chef.nombre}
                                {...register('nombre', { required: 'El nombre es requerido' })}
                            />
                            <label htmlFor="nombre">Nombre</label>
                            {errors.nombre && <span className='text-danger'>{errors.nombre.message}</span>}
                        </div>
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <input
                                type="text"
                                className="form-control"
                                id="biografia"
                                placeholder="Biografia"
                                defaultValue={chef.biografia}
                                {...register('biografia', { required: 'La biografia es requerida' })}
                            />
                            <label htmlFor="biografia">Biografia</label>
                            {errors.biografia && <span className='text-danger'>{errors.biografia.message}</span>}
                        </div>
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <input
                                type="number"
                                className="form-control"
                                id="cantidad_recetas"
                                placeholder="Cantidad de recetas"
                                defaultValue={chef.cantidad_recetas}
                                {...register('cantidad_recetas', { required: 'La cantidad de recetas es requerida' })}
                            />
                            <label htmlFor="cantidad_recetas">Cantidad de recetas</label>
                            {errors.cantidad_recetas && <span className='text-danger'>{errors.cantidad_recetas.message}</span>}
                        </div>
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <input
                                type="date"
                                className="form-control"
                                id="fecha_nacimiento"
                                placeholder="Fecha de nacimiento"
                                defaultValue={chef.fecha_nacimiento}
                                {...register('fecha_nacimiento', { required: 'La fecha de nacimiento es requerida' })}
                            />
                            <label htmlFor="fecha_nacimiento">Fecha de nacimiento</label>
                            {errors.fecha_nacimiento && <span className='text-danger'>{errors.fecha_nacimiento.message}</span>}
                        </div>
                        <div className="d-flex justify-content-between mt-2 mb-3" style={{ width: '50%' }}>
                            <button type="submit" className="btn btn-primary">
                                {id > 0 ? 'Confirmar Actualización' : 'Registrar Chef'}
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={volver}>
                                Volver
                            </button>
                        </div>
                    </form>
        </div>
    )
}