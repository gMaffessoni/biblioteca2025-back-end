import { useNavigate, useParams } from "react-router-dom";
import TituloLista from "../componentes/TituloLista";
import axios from "axios";
import { useState, useEffect} from "react";

export default function ListaEmprestimo (){
    //Delarando uma variável useState
    const [dados, setDados] = useState([]);

    const listar = async () => {
        let { data } = await axios.get(`http://localhost:4000/emprestimo`);
        console.log(data);
        setDados(data);
    }

    useEffect( () => {
        listar();
    }, []);

    return(
        <>
            <TituloLista titulo="Empréstimos" descricao="Gerencie aqui os empréstimos pendentes dos livros da biblioteca."
            rota="/listaemprestimo"/>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Título</th>
                            <th scope="col">Usuário</th>
                            <th scope="col">Empréstimo</th>
                            <th scope="col">Vencimento</th>
                            </tr>
                        </thead>
                        <tbody>
                            { dados.map( (d, i)=>(
                            <tr>
                                <td>
                                    <button type="button" className="btn btn-primary">
                                        Devolver
                                    </button>
                                </td>
                                <td>{d.idlivro}</td>
                                <td>{d.idusuario}</td>
                                <td>{d.vencimento}</td>
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