import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

function Contacto() {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [contacto, setContacto] = useState({});
    const [domicilios, setDomicilios] = useState([]);
    const {id} = useParams();
    const navigate = useNavigate();

    const volver = () => {
        navigate('/contacto');
    };

    const getDomicilios = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/domicilios");
            setDomicilios(response.data);
        } catch (error) {
            console.error('Error al traer los datos de los domicilios:', error);
        }
    };

    const getContacto = async (id) => {
        try {
            const contactoDatos = await axios.get(`http://localhost:3001/api/contacto/${id}`);
            setContacto(contactoDatos.data);
            setFormValues(contactoDatos.data);
        } catch (error) {
            console.error('Error al traer los datos del contacto:', error);
        }
    };

    const onSubmit = async (data) => {
        try {
            if (id > 0) {
                await axios.put(`http://localhost:3001/api/contacto/${id}`, data);
            } else {
                await axios.post("http://localhost:3001/api/contacto", data);
            }
            volver();
        } catch (error) {
            console.error('Error registrando al contacto:', error);
        }
    };

    const setFormValues = (contacto) => {
        setValue('nombre', contacto.nombre);
        setValue('apellido', contacto.apellido);
        setValue('email', contacto.email);
        setValue('telefono', contacto.telefono);
        setValue('mensaje', contacto.mensaje);
        setValue('fecha_agregado', contacto.fecha_agregado);
        setValue('domicilio_id', contacto.domicilio_id)
    };

    useEffect(() => {
        getContacto(id);
        getDomicilios()
    }, []);

    return (
        <>
            <div className="container text-center">
                <br />
                <h1>Contactos</h1>
                <br />
                    <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column align-items-center">
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <input
                                type="text"
                                className="form-control"
                                id="nombreContacto"
                                placeholder="Nombre"
                                defaultValue={contacto.nombre}
                                {...register('nombre', { required: 'El nombre es requerido' })}
                            />
                            <label htmlFor="nombreContacto">Nombre</label>
                            {errors.nombre && <span className='text-danger'>{errors.nombre.message}</span>}
                        </div>
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <input
                                type="text"
                                className="form-control"
                                id="apellidoContacto"
                                placeholder="Apellido"
                                defaultValue={contacto.apellido}
                                {...register('apellido', { required: 'El apellido es requerido' })}
                            />
                            <label htmlFor="apellidoContacto">Apellido</label>
                            {errors.apellido && <span className='text-danger'>{errors.apellido.message}</span>}
                        </div>
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <input
                                type="email"
                                className="form-control"
                                id="emailContacto"
                                placeholder="Email"
                                defaultValue={contacto.email}
                                {...register('email', { required: 'El email es requerido' })}
                            />
                            <label htmlFor="emailContacto">Email</label>
                            {errors.email && <span className='text-danger'>{errors.email.message}</span>}
                        </div>
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <input
                                type="phone"
                                className="form-control"
                                id="telefonoContacto"
                                placeholder="Telefono"
                                defaultValue={contacto.telefono}
                                {...register('telefono', { required: 'El telefono es requerido' })}
                            />
                            <label htmlFor="telefonoContacto">Telefono</label>
                            {errors.telefono && <span className='text-danger'>{errors.telefono.message}</span>}
                        </div>
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <select className="form-select"  defaultValue={contacto.domicilio_id} {...register('domicilio_id')}>
                                <option value="0">Seleccionar domicilio</option>
                                {domicilios && domicilios.map(d => <option key={d.id} value={d.id}>{d.calle}</option>)}
                            </select>
                            <label htmlFor="chef_id">Domicilio</label>
                        </div>
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <textarea
                                className="form-control"
                                id="mensajeContacto"
                                placeholder="Mensaje"
                                defaultValue={contacto.mensaje}
                                {...register('mensaje', { required: 'El mensaje es requerido' })}
                            />
                            <label htmlFor="mensajeContacto">Mensaje</label>
                            {errors.mensaje && <span className='text-danger'>{errors.mensaje.message}</span>}
                        </div>
                        <div className="d-flex justify-content-between mt-2 mb-3" style={{ width: '50%' }}>
                            <button type="submit" className="btn btn-primary">
                                {id > 0 ? 'Confirmar Actualización' : 'Registrar Mensaje'}
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={volver}>
                                Volver
                            </button>
                        </div>
                    </form>
            </div>
        </>
    );
}

export { Contacto };
