export default function TituloLista (props){
    return(
        <> 
            {/*CABECALHO*/}
            <div className="row justify-content-md-center">
                <div className="col">
                <div className="alert alert-primary" role="alert">
                    <h4 className="alert-heading">{props.titulo}</h4>
                    <p>{props.descricao}</p>
                    <hr />
                    <a href={props.rota} className="btn btn-primary btn-md">
                    Novo
                    </a>
                </div>
                </div>
            </div>
            {/*FIM CABECALHO*/}
        </>
    );
};