import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export const Dificultad = () => {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [dificultad, setDificultad] = useState({});
    const {id} = useParams();
    const navigate = useNavigate();

    const volver = () => {
        navigate('/dificultades');
    };

    const getDificultad = async (id) => {
        try {
            const dificultadDatos = await axios.get(`http://localhost:3001/api/dificultades/${id}`);
            setDificultad(dificultadDatos.data);
            setFormValues(dificultadDatos.data);
        } catch (error) {
            console.error('Error al traer los datos de las dificultades:', error);
        }
    };

    const onSubmit = async (data) => {
        try {
            if (id > 0) {
                await axios.put(`http://localhost:3001/api/dificultades/${id}`, data);
            } else {
                await axios.post("http://localhost:3001/api/dificultades", data);
            }
            volver();
        } catch (error) {
            console.error('Error registrando a la dificultad:', error);
        }
    };

    const setFormValues = (dificultad) => {
        setValue('nombre', dificultad.nombre);
        setValue('edad_recomendada', dificultad.edad_recomendada);
        setValue('descripcion', dificultad.descripcion);
        setValue('fechaCarga', dificultad.fechaCarga);
    };

    useEffect(() => {
        getDificultad(id);
    }, []);

    return (
        <div className="container text-center">
            <br />
            <h1>Dificultad</h1>
            <br />
            <>
            <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column align-items-center">
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <input
                                type="text"
                                className="form-control"
                                id="descripcionDificultad"
                                placeholder="Nombre de la Dificultad"
                                defaultValue={dificultad.nombre}
                                {...register('nombre', { required: 'El nombre es requerido' })}
                            />
                            <label htmlFor="nombreDificultad">Nombre de la Dificultad</label>
                        </div>
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <input
                                type="text"
                                className="form-control"
                                id="edad_recomendadaDificultad"
                                placeholder="Edad recomendada para la Dificulta"
                                defaultValue={dificultad.edad_recomendada}
                                {...register('edad_recomendada', { required: 'La edad recomendad es requerida' })}
                            />
                            <label htmlFor="edad_recomendadaDificultad">Edad recomendada para la dificultad</label>
                        </div>
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <input
                                type="text"
                                className="form-control"
                                id="descripcionDificultad"
                                placeholder="Descripcion de la Dificultad"
                                defaultValue={dificultad.descripcion}
                                {...register('descripcion', { required: 'La descripcion es requerida' })}
                            />
                            <label htmlFor="nombreDificultad">Descripcion de la Dificultad</label>
                        </div>
                        <div className="d-flex justify-content-between" style={{ width: '50%' }}>
                            <button type="submit" className="btn btn-primary">
                                {id > 0 ? 'Confirmar Actualización' : 'Registrar Dificultad'}
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={volver}>
                                Volver
                            </button>
                        </div>
                    </form>
            </>
        </div>
    )
}