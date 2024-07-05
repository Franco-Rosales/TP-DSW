import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export const Receta = ({cancelar}) => {

    const {id} = useParams();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [chefs, setChefs] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [dificultad, setDificultad] = useState([]);
    const [receta, setReceta] = useState({});
    const navigate = useNavigate();

    const volver = () => {
        navigate('/recetas');
    };

    const getChefs = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/chefs");
            setChefs(response.data);
        } catch (error) {
            console.error('Error al traer los datos de los chefs:', error);
        }
    };

    const getCategorias = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/categorias");
            setCategorias(response.data);
        } catch (error) {
            console.error('Error al traer los datos de las categorias:', error);
        }
    };

    const getDificultades = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/dificultades");
            setDificultad(response.data);
        } catch (error) {
            console.error('Error al traer los datos de las categorias:', error);
        }
    };

    const getReceta = async (id) => {
        try {
            const recetaDatos = await axios.get(`http://localhost:3001/api/recetas/${id}`);
            setReceta(recetaDatos.data);
            setFormValues(recetaDatos.data)
        } catch (error) { 
            console.error('Error al traer los datos de la receta:', error);
        }
    };

    const onSubmit = async (data) => {
        try {
            if (id > 0) {
                await axios.put(`http://localhost:3001/api/recetas/${id}`, data);
            } else {
                await axios.post("http://localhost:3001/api/recetas", data);
            }
            volver();
        } catch (error) {
            console.error('Error registrando la receta:', error);
        }
    };

    const setFormValues = (receta) => {
        setValue('nombre', receta.nombre);
        setValue('descripcion', receta.descripcion);
        setValue('instrucciones', receta.instrucciones);
        setValue('tiempo_preparacion', receta.tiempo_preparacion);
        setValue('chef_id', receta.chef_id);
        setValue('categoria_id', receta.categoria_id);
        setValue('dificultad_id', receta.dificultad_id);
    };

    useEffect(() => {
        getChefs();
        getCategorias();
        getDificultades();
        getReceta(id);
    }, []);

    return (
        <div className="container text-center">
                <br />
                <h1>Recetas</h1>
                <br />
        <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column align-items-center">
            <div className="form-floating mb-3" style={{ width: '50%' }}>
                <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    placeholder="Nombre de la Receta"
                    defaultValue={receta.nombre}
                    {...register('nombre', { required: 'El nombre es requerido' })}
                />
                <label htmlFor="nombre">Nombre de la Receta</label>
                {errors.nombre && <span className='text-danger'>{errors.nombre.message}</span>}
            </div>
            <div className="form-floating mb-3" style={{ width: '50%' }}>
                <input
                    type="text"
                    className="form-control"
                    id="descripcion"
                    placeholder="Descripcion de la Receta"
                    defaultValue={receta.descripcion}
                    {...register('descripcion', { required: 'La descripcion es requerida' })}
                />
                <label htmlFor="descripcion">Descripcion de la Receta</label>
                {errors.descripcion && <span className='text-danger'>{errors.descripcion.message}</span>}
            </div>
            <div className="form-floating mb-3" style={{ width: '50%' }}>
                <input
                    type="text"
                    className="form-control"
                    id="instrucciones"
                    placeholder="Instrucciones de la Receta"
                    defaultValue={receta.instrucciones}
                    {...register('instrucciones', { required: 'Las instrucciones son requeridas' })}
                />
                <label htmlFor="instrucciones">Instrucciones de la Receta</label>
                {errors.instrucciones && <span className='text-danger'>{errors.instrucciones.message}</span>}
            </div>
            <div className="form-floating mb-3" style={{ width: '50%' }}>
                <input
                    type="number"
                    className="form-control"
                    id="tiempo_preparacion"
                    placeholder="Tiempo de preparación en minutos"
                    defaultValue={receta.tiempo_preparacion}
                    {...register('tiempo_preparacion', { required: 'El tiempo de preparación es requerido' })}
                />
                <label htmlFor="tiempo_preparacion">Tiempo de preparación en minutos</label>
                {errors.tiempo_preparacion && <span className='text-danger'>{errors.tiempo_preparacion.message}</span>}
            </div>
            <div className="form-floating mb-3" style={{ width: '50%' }}>
                <select className="form-select"  defaultValue={receta.chef_id} {...register('chef_id')}>
                    <option value="0">Seleccionar chef</option>
                    {chefs && chefs.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                </select>
                <label htmlFor="chef_id">Chef</label>
            </div>
            <div className="form-floating mb-3" style={{ width: '50%' }}>
                <select className="form-select"  defaultValue={receta.categoria_id} {...register('categoria_id')}>
                    <option value="0">Seleccionar categoria</option>
                    {categorias && categorias.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                </select>
                <label htmlFor="categoria_id">Categoria</label>
            </div>
            <div className="form-floating mb-3" style={{ width: '50%' }}>
                <select className="form-select"  defaultValue={receta.dificultad_id} {...register('dificultad_id')}>
                    <option value="0">Seleccionar dificultad</option>
                    {dificultad && dificultad.map(d => <option key={d.id} value={d.id}>{d.nombre}</option>)}
                </select>
                <label htmlFor="dificultad_id">Dificultad</label>
            </div>
                    <div className="d-flex justify-content-between mt-2 mb-3" style={{ width: '50%' }}>
                        <button type="submit" className="btn btn-primary">
                            {id > 0 ? 'Confirmar Actualización' : 'Registrar Receta'}
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={volver}>
                            Volver
                        </button>
                    </div>
        </form>
        </div>
    )
}