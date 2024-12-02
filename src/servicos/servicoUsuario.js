const urlBase = 'https://backend-bcc-2-b.vercel.app/usuario';

export async function gravarUsuario(usuario){
    const resposta = await fetch(urlBase,{
        'method':"POST",
        'headers': { 
            'Content-Type':"application/json"
        },
        'body': JSON.stringify(usuario)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function alterarUsuario(usuario){
    const resposta = await fetch(urlBase + "/" + usuario.id,{
        'method':"PUT",
        'headers': { 
            'Content-Type':"application/json"
        },
        'body': JSON.stringify(usuario)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function excluirUsuario(usuario){
    const resposta = await fetch(urlBase + "/" + usuario.id,{
        'method':"DELETE",
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function consultarUsuario(termo) {
    const url = `${urlBase}/${termo ? termo : ''}`;
    const resposta = await fetch(url, {
        method: "GET"
    });

    if (!resposta.ok) {
        throw new Error('Erro ao consultar o usuário');
    }

    const resultado = await resposta.json();

    return resultado.listaUsuario || [];
}
