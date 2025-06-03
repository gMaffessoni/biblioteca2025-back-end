export default function TituloCadastro(props){

    const titulo = (props.id) ? `Alterando` : `Inserindo`; //Comando ternário (se tiver props envia "Alterando")

    return (
        <>
            <h1>{titulo} {props.titulo}</h1>
        </>
    );
};