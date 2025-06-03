import { useNavigate, useParams } from "react-router-dom";
import { useState,  useEffect } from "react";
import axios from "axios";
import TituloCadastro from "../componentes/TituloCadastro";

export default function FormLivro (){
    const navegacao = useNavigate();
    const { id } = useParams();
    const [ titulo, setTitulo ] = useState(''); 
    const [ edicao, setEdicao ] = useState('');
    const [ paginas, setPaginas ] = useState('');
    const [ publicacao, setPublicacao ] = useState('');
    const [ foto, setFoto ] = useState('');
    const [ localizacao, setLocalizacao ] = useState('');
    const [ resumo, setResumo ] = useState('');
    const [ ativo, setAtivo ] = useState('');
    const [ condicaofisica, setCondicaoFisica ] = useState('');
    const [ emprestado, setEmprestado ] = useState('');
    const [ ideditora, setIdEditora ] = useState('');
    const [ idcategoria, setIdCategoria ] = useState('');

    const voltar =  ()=>{
        navegacao('/listalivro');
    }

     const excluir = async () => {
        await axios.delete(`http://localhost:4000/livro/${id}`);
        voltar();
    }

    const selecionar = async () => {
        let { data } = await axios.get(`http://localhost:4000/livro/${id}`);
        setTitulo(data.titulo)
        setEdicao(data.edicao)
        setPaginas(data.paginas)
        setPublicacao(data.publicacao)
        setFoto(data.foto)
        setLocalizacao(data.localizacao)
        setResumo(data.resumo)
        setAtivo(data.ativo)
        setCondicaoFisica(data.condicaofisica)
        setEmprestado(data.emprestado)
        setIdEditora(data.ideditora)
        setIdCategoria(data.idcategoria)
    }

    const alterar = async () => {
        let body = {
            "titulo": titulo,
            "edicao": edicao,
            "paginas": paginas,
            "publicacao": publicacao,
            "foto": foto,
            "localizacao": localizacao,
            "resumo": resumo,
            "ativo": ativo,
            "condicaofisica": condicaofisica,
            "emprestado": emprestado,
            "ideditora": ideditora,
            "idcategoria": idcategoria
        };

        await axios.put(`http://localhost:4000/livro/${id}`,body);
        voltar();
    }

    const inserir = async () => {
        let body = {
            "titulo": titulo,
            "edicao": edicao,
            "paginas": paginas,
            "publicacao": publicacao,
            "foto": foto,
            "localizacao": localizacao,
            "resumo": resumo,
            "ativo": ativo,
            "condicaofisica": condicaofisica,
            "emprestado": emprestado,
            "ideditora": ideditora,
            "idcategoria": idcategoria
        };
        await axios.post(`http://localhost:4000/livro`, body);
        voltar();
    }

    const salvar = async () => {
        if (id){
            alterar();
        }
        else {
            inserir();
        }
    }

    useEffect(()=>{
        if (id){
            selecionar();
        }
    }, []);

    return(
            <>
                <TituloCadastro id={id} titulo="livro" />
    
                <form>
                    { id && (
                        <div className="mb-3">
                            <label className="form-label">
                            ID
                            </label>
                            <input
                            type="email"
                            className="form-control"
                            value={id}
                            />
                        </div>
                    )}
                    <div className="mb-3">
                        <label className="form-label">
                        Título
                        </label>
                        <input
                        type="text"
                        className="form-control"
                        value={titulo}
                        onChange={(evento)=>setTitulo(evento.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                        Edição
                        </label>
                        <input
                        type="text"
                        className="form-control"
                        value={edicao}
                        onChange={(evento)=>setEdicao(evento.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                        Páginas
                        </label>
                        <input
                        type="text"
                        className="form-control"
                        value={paginas}
                        onChange={(evento)=>setPaginas(evento.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                        Publicação
                        </label>
                        <input
                        type="text"
                        className="form-control"
                        value={publicacao}
                        onChange={(evento)=>setPublicacao(evento.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                        Foto
                        </label>
                        <input
                        type="text"
                        className="form-control"
                        value={foto}
                        onChange={(evento)=>setFoto(evento.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                        Localização
                        </label>
                        <input
                        type="text"
                        className="form-control"
                        value={localizacao}
                        onChange={(evento)=>setLocalizacao(evento.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                        Resumo
                        </label>
                        <textarea className="form-control" 
                        value={resumo} 
                        onChange={(evento)=>setResumo(evento.target.value)}>
                        </textarea>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                        Ativo
                        </label>
                        <input
                        type="text"
                        className="form-control"
                        value={ativo}
                        onChange={(evento)=>setAtivo(evento.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                        Condição Física
                        </label>
                        <input
                        type="text"
                        className="form-control"
                        value={condicaofisica}
                        onChange={(evento)=>setCondicaoFisica(evento.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                        Emprestado
                        </label>
                        <input
                        type="text"
                        className="form-control"
                        value={emprestado}
                        onChange={(evento)=>setEmprestado(evento.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                        ID Editora
                        </label>
                        <input
                        type="text"
                        className="form-control"
                        value={ideditora}
                        onChange={(evento)=>setIdEditora(evento.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                        ID Categoria
                        </label>
                        <input
                        type="text"
                        className="form-control"
                        value={idcategoria}
                        onChange={(evento)=>setIdCategoria(evento.target.value)}
                        />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={() => salvar()}>
                        Salvar
                    </button>
                    <button type="button" className="btn btn-secondary" onClick= {() => voltar()}>
                        Cancelar
                    </button>
                    { id && (
                        <button type="button" className="btn btn-danger" onClick={() => excluir()}>
                            Deletar
                        </button>
                    )}
                </form>
            </>
        );
    };