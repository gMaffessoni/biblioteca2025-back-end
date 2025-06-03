import TituloLista from "../componentes/TituloLista";
import axios from "axios";
import { useState, useEffect} from "react";

export default function ListaAutor (){
    //Delarando uma variável useState
    const [dados, setDados] = useState([]);

    const listar = async () => {
        let { data } = await axios.get(`http://localhost:4000/autor`);
        console.log(data);
        setDados(data);
    }

    useEffect( () => {
        listar();
    }, []);

    return(
        <>
            <TituloLista titulo="Autores" descricao="Gerencie aqui os autores dos livros da biblioteca."
            rota="/cadastroautor"/>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <table className="table">
                        <thead>
                            <tr>
                            <th scope="col"></th>
                            <th scope="col">Foto</th>
                            <th scope="col">ID</th>
                            <th scope="col">Autor</th>
                            <th scope="col">Nascimento</th>
                            </tr>
                        </thead>
                        <tbody>
                            { dados.map( (d, i)=>(
                            <tr>
                                <td>
                                    <a className='btn btn-primary' href={`/cadastroautor/${d.idautor}`}>Alterar</a>
                                </td>
                                <td><img className= 'img-thumbnail' src={d.foto} style={{width:"90px"}}/></td>
                                <td>{d.idautor}</td>
                                <td>{d.nomeautor}</td>
                                <td>{d.nascimento}</td>
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