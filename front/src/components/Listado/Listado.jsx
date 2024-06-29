import { NavBar } from "../NavBar/NavBar";

export const ListarReceta = ({receta}) => {
    return (
        <>
        <NavBar/>
        <table className="table mt-5 mx-3">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripcion</th>
                    <th scope="col">Instrucciones</th>
                    <th scope="col">Tiempo De Preparacion</th>
                    <th scope="col">Fecha De Creacion</th>
                    <th scope="col">Chef</th>
                </tr>
                </thead>
                <tbody>
                {receta &&
                    receta.map((r) => {
                    return (
                        <tr>
                        <td scope="row">{r.id}</td>
                        <td>{r.nombre}</td>
                        <td>{r.descripcion}</td>
                        <td>{r.instrucciones}</td>
                        <td>{r.tiempo_preparacion}</td>
                        <td>{r.fecha_creacion}</td>
                        <td>{r.chef_id}</td>
                        </tr>
                    );
                    })}
                </tbody>
      </table>
      </>
    );
}