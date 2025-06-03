import { useNavigate, useParams } from "react-router-dom";
import { useState,  useEffect } from "react";
import axios from "axios";
import TituloCadastro from "../componentes/TituloCadastro";

export default function FormUsuario (){
    const navegacao = useNavigate();
    const { id } = useParams();
    const [ nome, setNome ] = useState(''); 
    const [ cpf, setCpf ] = useState(''); 
    const [ email, setEmail ] = useState(''); 
    const [ telefone, setTelefone ] = useState('');
    const [ nascimento, setNascimento ] = useState(''); 
    const [ senha, setSenha ] = useState(''); 

    const voltar =  ()=>{
        navegacao('/listausuario');
    }

     const excluir = async () => {
        await axios.delete(`http://localhost:4000/usuario/${id}`);
        voltar();
    }

    const selecionar = async () => {
        let { data } = await axios.get(`http://localhost:4000/usuario/${id}`);
        setNome(data.nome)
        setCpf(data.cpf)
        setEmail(data.email)
        setTelefone(data.telefone)
        setNascimento(data.nascimento)
        setSenha(data.senha)
    }

    const alterar = async () => {
        let body = {
            "nome": nome,
            "cpf": cpf,
            "email": email,
            "telefone": telefone,
            "nascimento": nascimento,
            "senha": senha

        };

        await axios.put(`http://localhost:4000/usuario/${id}`,body);
        voltar();
    }

    const inserir = async () => {
        let body = {
            "nome": nome,
            "cpf": cpf,
            "email": email,
            "telefone": telefone,
            "nascimento": nascimento,
            "senha": senha
        };
        await axios.post(`http://localhost:4000/usuario`, body);
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
            <TituloCadastro id={id} titulo="usuario" />

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
                    Nome do Usuário
                    </label>
                    <input
                    type="text"
                    className="form-control"
                    value={nome}
                    onChange={(evento)=>setNome(evento.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">
                    CPF
                    </label>
                    <input
                    type="text"
                    className="form-control"
                    value={cpf}
                    onChange={(evento)=>setCpf(evento.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">
                    E-mail
                    </label>
                    <textarea className="form-control" 
                    value={email} 
                    onChange={(evento)=>setEmail(evento.target.value)}>
                    </textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">
                    Telefone
                    </label>
                    <input
                    type="text"
                    className="form-control"
                    value={telefone}
                    onChange={(evento)=>setTelefone(evento.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">
                    Nascimento
                    </label>
                    <input
                    type="text"
                    className="form-control"
                    value={nascimento}
                    onChange={(evento)=>setNascimento(evento.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">
                    Senha
                    </label>
                    <input
                    type="password"
                    className="form-control"
                    value={senha}
                    onChange={(evento)=>setSenha(evento.target.value)}
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