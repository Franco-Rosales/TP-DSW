import { Link } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar";

export const ListarReceta = ({recetas, deleteReceta}) => {   

    const deleteRec = (id) => {
        deleteReceta(id);
    }

    return (
        <>
        <table className="table mt-5 mx-3">
                <thead>
                <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripcion</th>
                    <th scope="col">Instrucciones</th>
                    <th scope="col">Tiempo De Preparacion</th>
                    <th scope="col">Fecha De Creacion</th>
                    <th scope="col">Chef</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {recetas &&
                    recetas.map((r) => {
                    return (
                        <tr>
                        <td>{r.nombre}</td>
                        <td>{r.descripcion}</td>
                        <td>{r.instrucciones}</td>
                        <td>{r.tiempo_preparacion}</td>
                        <td>{r.fecha_creacion}</td>
                        <td>{r.chef_id}</td>
                        <td>
                            <button
                            className="btn btn-default"
                            onClick={() => deleteRec(r.id)}
                            >
                                <i className="bi bi-trash3 text-danger"></i>
                            </button>
                        </td>
                        <td>
                            <Link className="btn btn-default" to={`/receta/${r.id}`} >
                                <i className="bi bi-pencil text-primary"></i>
                            </Link>
                        </td>
                        </tr>
                    );
                    })}
                </tbody>
      </table>
      </>
    );
}