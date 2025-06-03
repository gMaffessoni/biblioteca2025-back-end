import TituloLista from "../componentes/TituloLista";
import axios from "axios";
import { useState, useEffect} from "react";

export default function ListaLivro (){
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
                            <th scope="col">Edição</th>
                            <th scope="col">Páginas</th>
                            <th scope="col">Ativo</th>
                            <th scope="col">Emprestado</th>
                            <th scope="col">Foto</th>
                            
                            </tr>
                        </thead>
                        <tbody>
                            { dados.map( (d, i)=>(
                            <tr>
                                <td>
                                    <a className='btn btn-primary' href={`/cadastrolivro/${d.idlivro}`}>Alterar</a>
                                </td>
                                <td>{d.idlivro}</td>
                                <td>{d.titulo}</td>
                                <td>{d.edicao}</td>
                                <td>{d.paginas}</td>
                                <td>{d.ativo}</td>
                                <td>{d.emprestado}</td>
                                <td><img className= 'img-thumbnail' src={d.foto} style={{width:"90px"}}/></td>
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