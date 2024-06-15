
export default function ({params}: {params: {id: string}}){
    return <div>Aqui se tiene que ver la trazabilidad entera de una donación. Se ve la donación que venga del parametro de la URL: <b>{params.id}</b></div>
}