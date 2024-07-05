import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export const Categoria = () => {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [categoria, setCategoria] = useState({});
    const {id} = useParams();
    const navigate = useNavigate();

    const volver = () => {
        navigate('/categorias');
    };

    const getCategoria = async (id) => {
        try {
            const categoriasDatos = await axios.get(`http://localhost:3001/api/categorias/${id}`);
            setCategoria(categoriasDatos.data);
            setFormValues(categoriasDatos.data)
        } catch (error) {
            console.error('Error al traer los datos de la categoria:', error);
        }
    };

    const onSubmit = async (data) => {
        try {
            if (id > 0) {
                await axios.put(`http://localhost:3001/api/categorias/${id}`, data);
            } else {
                await axios.post("http://localhost:3001/api/categorias", data);
            }
            volver();
        } catch (error) {
            console.error('Error registrando a la categoria:', error);
        }
    };

    const setFormValues = (categoria) => {
        setValue('nombre', categoria.nombre);
        setValue('descripcion', categoria.descripcion);
        setValue('fecha_agregado', categoria.fecha_agregado);
    };

    useEffect(() => {
        getCategoria(id);
    }, []);

    return (
        <div className="container text-center">
            <br />
            <h1>Categorias</h1>
            <br />
            <>
            <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column align-items-center">
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <input
                                type="text"
                                className="form-control"
                                id="nombreCategoria"
                                placeholder="Nombre de la Categoria"
                                defaultValue={categoria.nombre}
                                {...register('nombre', { required: 'El nombre es requerido' })}
                            />
                            <label htmlFor="nombreCategoria">Nombre de la Categoria</label>
                            {errors.nombre && <span className='text-danger'>{errors.nombre.message}</span>}
                        </div>
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <input
                                type="text"
                                className="form-control"
                                id="descripcionCategoria"
                                placeholder="Descripcion de la Categoria"
                                defaultValue={categoria.descripcion}
                                {...register('descripcion', { required: 'La descripción es requerida' })}
                            />
                            <label htmlFor="descripcionCategoria">Descripcion de la Categoria</label>
                            {errors.descripcion && <span className='text-danger'>{errors.descripcion.message}</span>}
                        </div>
                        <div className="d-flex justify-content-between" style={{ width: '50%' }}>
                            <button type="submit" className="btn btn-primary">
                                {id > 0 ? 'Confirmar Actualización' : 'Registrar Categoria'}
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={volver}>
                                Volver
                            </button>
                        </div>
                    </form>
            </>
        </div>
    );
}