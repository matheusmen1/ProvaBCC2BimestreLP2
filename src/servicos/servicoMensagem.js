const urlBase = 'https://backend-bcc-2-b.vercel.app/mensagem';  

export async function gravarMensagem(mensagem) {
    const resposta = await fetch(urlBase, {
        'method': "POST",
        'headers': { 
            'Content-Type': "application/json"
        },
        'body': JSON.stringify(mensagem)  
    });
    const resultado = await resposta.json();
    return resultado; 
}


export async function editarMensagem(mensagem) {
    const resposta = await fetch(urlBase + "/" + mensagem.id, {
        'method': "PUT",
        'headers': { 
            'Content-Type': "application/json"
        },
        'body': JSON.stringify(mensagem)  
    });
    const resultado = await resposta.json();
    return resultado;  
}

export async function excluirMensagem(mensagem) {
    const resposta = await fetch(urlBase + "/" + mensagem.id, {
        'method': "DELETE",  
    });
    const resultado = await resposta.json();
    return resultado;  
}

export async function consultarMensagens(termo) {
    const url = `${urlBase}/${termo ? termo : ''}`;
    const resposta = await fetch(url, {
        method: "GET"
    });

    if (!resposta.ok) {
        throw new Error('Erro ao consultar');
    }

    const resultado = await resposta.json();

    return resultado.listaMensagem || [];
}