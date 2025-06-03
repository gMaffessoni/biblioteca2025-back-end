import TituloLista from "../componentes/TituloLista";
import axios from "axios";
import { useState, useEffect} from "react";

export default function ListaEditora (){
    //Delarando uma variável useState
    const [dados, setDados] = useState([]);

    const listar = async () => {
        let { data } = await axios.get(`http://localhost:4000/livro`);
        console.log(data);
        setDados(data);
    }

    useEffect( () => {
        listar();
    }, []);

    return(
        <>
            <TituloLista titulo="Livros" descricao="Gerencie aqui os livros da biblioteca."
            rota="/cadastrolivro"/>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <table className="table">
                        <thead>
                            <tr>
                            <th scope="col"></th>
                            <th scope="col">ID</th>
                            <th scope="col">Livro</th>
                            </tr>
                        </thead>
                        <tbody>
                            { dados.map( (d, i)=>(
                            <tr>
                                <td>
                                    <a className='btn btn-primary' href={`/cadastroeditora/${d.ideditora}`}>Alterar</a>
                                </td>
                                <td>{d.ideditora}</td>
                                <td>{d.nomeeditora}</td>
                            </tr>
                            ))}
                            
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};