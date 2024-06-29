import { NavBar } from "../NavBar/NavBar";
import { useForm } from 'react-hook-form';
import axios from 'axios';

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
                <input type="text" className="form-control" {...register('Nombre', { required: true })}/>
                <label htmlFor="floatingInput">Nombre</label>
                {errors.Nombre && <span>Este campo es obligatorio</span>}
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" {...register('Descripcion', { required: true })}/>
                <label htmlFor="floatingInput">Descripcion</label>
                {errors.Descripcion && <span>Este campo es obligatorio</span>}
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" {...register('Instrucciones', { required: true })}/>
                <label htmlFor="floatingInput">Instrucciones</label>
                {errors.Instrucciones && <span>Este campo es obligatorio</span>}
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