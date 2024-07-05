import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Contactos = () => {

    const [contactos, setContactos] = useState([]);
    const [domicilios, setDomicilios] = useState([]);
    const [nombreFiltro, setNombreFiltro] = useState('');
    const navigate = useNavigate();

    async function getContactos() {
        try {
            const response = await axios.get("http://localhost:3001/api/contacto");
            setContactos(response.data);
        } catch (error) {
            console.error('Error al traer los datos de los contactos:', error);
        }
    };

    async function eliminarContacto(id) {
        if (window.confirm("¿Desea borrar este contacto?")) {
            await axios.delete(`http://localhost:3001/api/contacto/${id}`);
            getContactos();
        }
    };

    const getDomicilios = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/domicilios");
            setDomicilios(response.data);
        } catch (error) {
            console.error('Error al traer los datos de los domicilios:', error);
        }
    };

    const getDomicilioName = (domicilioId) => {
        const domicilio = domicilios.find(c => d.id === domicilioId);
        return domicilio ? domicilio.calle : 'Desconocido';
    };

    useEffect(() => {
        getContactos();
        getDomicilios()
    }, []);

    function handleBuscar() {
        let url = "http://localhost:3001/api/contacto?";
        if (nombreFiltro) {
            url += `nombre=${nombreFiltro}&`;
        }
        axios.get(url).then(response => {
            setContactos(response.data);
        });
    };

    function mostrarFormulario() {
        navigate('/contacto/0')
    }

    return (
        <div className="container text-center">
            <br />
            <h1>Contactos</h1>
            <br />
            <>
            <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center" style={{ gap: '10px' }}>
                                <div className="form-floating" style={{ flex: '1' }}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="Buscar Nombre de Mensaje"
                                        value={nombreFiltro}
                                        onChange={(e) => setNombreFiltro(e.target.value)}
                                    />
                                    <label htmlFor="floatingInput">Buscar por nombre</label>
                                </div>
                                <button type="button" className="btn btn-primary" onClick={handleBuscar}>Buscar</button>
                            </div>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => mostrarFormulario()}
                            >
                                Enviar nuevo mensaje
                            </button>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Apellido</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Telefono</th>
                                    <th scope="col">Mensaje</th>
                                    <th scope="col">Domicilio</th>
                                    <th scope="col">Fecha de Agregado</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contactos.map((contacto) => (
                                    <tr key={contacto.id}>
                                        <td>{contacto.nombre}</td>
                                        <td>{contacto.apellido}</td>
                                        <td>{contacto.email}</td>
                                        <td>{contacto.telefono}</td>
                                        <td>{contacto.mensaje}</td>
                                        <td>{getDomicilioName(contacto.domicilio_id)}</td>
                                        <td>{contacto.fecha_agregado}</td>
                                        <td>
                                            <Link to={`/contacto/${contacto.id}`}>
                                                <button
                                                    type="button"
                                                    className="btn btn-warning me-2"
                                                >
                                                    Editar
                                                </button>
                                            </Link>
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() => eliminarContacto(contacto.id)}
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
            </>
        </div>
    );
}