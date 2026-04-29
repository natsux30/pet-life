import "../Style.css";
import Formulario from "../Pages/Form";
import Cg from "../components/Cg";
function Home() {
    return (
        
     
    
        <div className="main">
            <Cg />
            <div className="main__container">
                <div className="main__content">
                    <h1>
                        Veja nossos produtos{" "}
                        <span className="text-highlight">
                            Ou crie o perfil do seu pet
                        </span>
                    </h1>

                    <button className="main__btn">Produtos</button>
                </div>

                <div className="main__img--container">
                    <img src="/gif/vid1.gif" alt="pet" id="main__img" />
                </div>
            </div>
        </div>

    );
    
}

export default Home;