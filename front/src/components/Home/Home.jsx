import { NavBar } from "../NavBar/NavBar";
import './Home.css'
import receta from '../../images/receta.jpg'

export const Home = () => {
    return (
        <>
            <NavBar/>
            <div className="d-flex justify-content-evenly align-items-center my-5 py-4 home-container">
                <img src={receta} className="recipe-img"/>
                <h2 className="ms-4 page-title">Transforma ingredientes simples en platos extraordinarios.</h2>
            </div>
        </>
    );
}