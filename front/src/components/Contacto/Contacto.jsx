import axios from "axios";
import { useEffect, useState } from "react";
import { NavBar } from "../NavBar/NavBar";

function Contacto() {
    const [contacto, setContacto] = useState([]);
    const [nombreFiltro, setNombreFiltro] = useState('');
    const [nombreContacto, setNombreContacto] = useState('');
    const [apellidoContacto, setApellidoContacto] = useState('');
    const [emailContacto, setEmailContacto] = useState('');
    const [telefonoContacto, setTelefonoContacto] = useState('');
    const [mensajeContacto, setMensajeContacto] = useState('');
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [editarContactoId, setEditarContactoId] = useState(null);

    async function getContactos() {
        try {
            const response = await axios.get("http://localhost:3001/api/contacto");
            setContacto(response.data);
        } catch (error) {
            console.error('Error al traer los datos de los contactos:', error);
        }
    }

    useEffect(() => {
        getContactos();
    }, []);

    async function eliminarContacto(id) {
        await axios.delete(`http://localhost:3001/api/contacto/${id}`);
        getContactos();
    }

    function handleBuscar() {
        let url = "http://localhost:3001/api/contacto?";
        if (nombreFiltro) {
            url += `nombre=${nombreFiltro}&`;
        }
        axios.get(url).then(response => {
            setContacto(response.data);
        });
    }

    async function handleRegistrarContacto(e) {
        e.preventDefault();
        try {
            if (editarContactoId) {
                await axios.put(`http://localhost:3001/api/contacto/${editarContactoId}`, {
                    nombre: nombreContacto,
                    apellido: apellidoContacto,
                    email: emailContacto,
                    telefono: telefonoContacto,
                    mensaje: mensajeContacto
                });
            } else {
                await axios.post("http://localhost:3001/api/contacto", {
                    nombre: nombreContacto,
                    apellido: apellidoContacto,
                    email: emailContacto,
                    telefono: telefonoContacto,
                    mensaje: mensajeContacto
                });
            }
            setNombreContacto('');
            setApellidoContacto('');
            setEmailContacto('');
            setTelefonoContacto('');
            setMensajeContacto('');
            setMostrarFormulario(false);
            setEditarContactoId(null);
            getContactos();
        } catch (error) {
            console.error('Error al registrar el mensaje:', error);
        }
    }

    function handleEditarContacto(contacto) {
        setNombreContacto(contacto.nombre);
        setApellidoContacto(contacto.apellido);
        setEmailContacto(contacto.email);
        setTelefonoContacto(contacto.telefono);
        setMensajeContacto(contacto.mensaje);
        setEditarContactoId(contacto.id);
        setMostrarFormulario(true);
    }

    return (
        <>
            <NavBar />
            <div className="container text-center">
                <br />
                <h1>Consultar Mensajes</h1>
                <br />
                {!mostrarFormulario ? (
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
                                    <label htmlFor="floatingInput">Buscar Nombre Usuario</label>
                                </div>
                                <button type="button" className="btn btn-primary" onClick={handleBuscar}>Buscar</button>
                            </div>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => setMostrarFormulario(true)}
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
                                    <th scope="col">Fecha de Agregado</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacto.map((contacto) => (
                                    <tr key={contacto.id}>
                                        <td>{contacto.nombre}</td>
                                        <td>{contacto.apellido}</td>
                                        <td>{contacto.email}</td>
                                        <td>{contacto.telefono}</td>
                                        <td>{contacto.mensaje}</td>
                                        <td>{contacto.fecha_agregado}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-warning me-2"
                                                onClick={() => handleEditarContacto(contacto)}
                                            >
                                                Editar
                                            </button>
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
                ) : (
                    <form onSubmit={handleRegistrarContacto} className="d-flex flex-column align-items-center">
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <input
                                type="text"
                                className="form-control"
                                id="nombreContacto"
                                placeholder="Nombre"
                                value={nombreContacto}
                                onChange={(e) => setNombreContacto(e.target.value)}
                                required
                            />
                            <label htmlFor="nombreContacto">Nombre</label>
                        </div>
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <input
                                type="text"
                                className="form-control"
                                id="apellidoContacto"
                                placeholder="Apellido"
                                value={apellidoContacto}
                                onChange={(e) => setApellidoContacto(e.target.value)}
                                required
                            />
                            <label htmlFor="apellidoContacto">Apellido</label>
                        </div>
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <input
                                type="email"
                                className="form-control"
                                id="emailContacto"
                                placeholder="Email"
                                value={emailContacto}
                                onChange={(e) => setEmailContacto(e.target.value)}
                                required
                            />
                            <label htmlFor="emailContacto">Email</label>
                        </div>
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <input
                                type="phone"
                                className="form-control"
                                id="telefonoContacto"
                                placeholder="Telefono"
                                value={telefonoContacto}
                                onChange={(e) => setTelefonoContacto(e.target.value)}
                                required
                            />
                            <label htmlFor="telefonoContacto">Telefono</label>
                        </div>
                        <div className="form-floating mb-3" style={{ width: '50%' }}>
                            <textarea
                                className="form-control"
                                id="mensajeContacto"
                                placeholder="Mensaje"
                                value={mensajeContacto}
                                onChange={(e) => setMensajeContacto(e.target.value)}
                                required
                            />
                            <label htmlFor="mensajeContacto">Mensaje</label>
                        </div>
                        <div className="d-flex justify-content-between" style={{ width: '50%' }}>
                            <button type="submit" className="btn btn-primary">
                                {editarContactoId ? 'Confirmar Actualización' : 'Registrar Mensaje'}
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={() => {
                                setMostrarFormulario(false);
                                setEditarContactoId(null);
                            }}>
                                Volver
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </>
    );
}

export { Contacto };
