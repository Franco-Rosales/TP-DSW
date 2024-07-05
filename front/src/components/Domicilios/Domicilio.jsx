import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar";


export const Domicilio = () => {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [domicilio, setDomicilio] = useState({});
    const {id} = useParams();
    const navigate = useNavigate();

    const volver = () => {
        navigate('/domicilios');
    };

    const getDomicilio = async (id) => {
        try {
            const domicilioDatos = await axios.get(`http://localhost:3001/api/domicilios/${id}`);
            setDomicilio(domicilioDatos.data);
            setFormValues(domicilioDatos.data);
        } catch (error) {
            console.error('Error al traer los datos del domicilio:', error);
        }
    };

    const onSubmit = async (data) => {
        try {
            if (id > 0) {
                await axios.put(`http://localhost:3001/api/domicilios/${id}`, data);
            } else {
                await axios.post("http://localhost:3001/api/domicilios", data);
            }
            volver();
        } catch (error) {
            console.error('Error registrando el domicilio:', error);
        }
    };

    const setFormValues = (domicilio) => {
        setValue('calle', domicilio.calle);
        setValue('nro_calle', domicilio.nro_calle);
        setValue('barrio', domicilio.barrio);
        setValue('fecha_carga', domicilio.fecha_carga);
    };

    useEffect(() => {
        getDomicilio(id);
    }, []);

    return (

        <div className="container text-center">
                <br />
                <h1>Domicilios</h1>
                <br />
                <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column align-items-center">
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <input
                                type="text"
                                className="form-control"
                                id="calle"
                                placeholder="Calle"
                                defaultValue={domicilio.calle}
                                {...register('calle', { required: 'La calle es requerida' })}
                            />
                            <label htmlFor="calle">Calle</label>
                            {errors.calle && <span className='text-danger'>{errors.calle.message}</span>}
                        </div>
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <input
                                type="number"
                                className="form-control"
                                id="nro_calle"
                                placeholder="Numero calle"
                                defaultValue={domicilio.nro_calle}
                                {...register('nro_calle', { required: 'El numero de la calle es requerido' })}
                            />
                            <label htmlFor="nro_calle">Numero calle</label>
                            {errors.nro_calle && <span className='text-danger'>{errors.nro_calle.message}</span>}
                        </div>
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <input
                                type="text"
                                className="form-control"
                                id="barrio"
                                placeholder="Barrio"
                                defaultValue={domicilio.barrio}
                                {...register('barrio', { required: 'El barrio es requerido' })}
                            />
                            <label htmlFor="barrio">Barrio</label>
                            {errors.barrio && <span className='text-danger'>{errors.barrio.message}</span>}
                        </div>
                        <div className="d-flex justify-content-between mt-2 mb-3" style={{ width: '50%' }}>
                            <button type="submit" className="btn btn-primary">
                                {id > 0 ? 'Confirmar Actualización' : 'Registrar Domicilio'}
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={volver}>
                                Volver
                            </button>
                        </div>
                    </form>
        </div>
    )
}