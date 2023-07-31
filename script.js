//Alogritimo

// OK 1. Pegar os valores dos inputs
// OK 2. Fazer o calculo do IMC -> valorIMC
// OK 3. Gerar a classificação IMC -> classificacaoIMC 
// OK 4. Organizar os dados do usuário para salvar na lista e gerar a data de cadastro
// OK 5. Inserir o usuário na lista (salvar no localStorage)
// OK 6. Função para carregar os usuários (localStorage), chamar ao carregar a página
// 7. Renderizar o conteúdo da tabela com os usuários cadastrados
// 8. Botão para limpar os registros (localStorage)


function calcular(event) {
    //Previne o recarregar da página
    event.preventDefault()
    console.log("Foi executada a função calcular")

   // Passo 1
   let usuario = receberValores()
    
   // Passo 2
   let imcCalculado =  calcularImc(usuario.altura, usuario.peso)

    // Passo 3
   let classificacaoImc = classificarImc(imcCalculado)

   console.log(classificacaoImc)

   // Passo 4
   usuario = organizarDados(usuario, imcCalculado, classificacaoImc)

   // Passo 5
   cadastrarUsuario(usuario)

   // Passo 6
//    carregarUsuarios(usuario)

   window.location.reload()

}

function receberValores() {
    let nomeRecebido = document.getElementById("nome").value.trim()
    let alturaRecebida= document.getElementById("altura").value
    let pesoRecebido= document.getElementById("peso").value

    let dadosUsuario = {
        nome: nomeRecebido,
        altura: alturaRecebida,
        peso: pesoRecebido

    }

    console.log(dadosUsuario)

    return dadosUsuario
}

function calcularImc(altura, peso){

    let imc = peso / (altura*altura)
    console.log(imc)

    return imc
}

function classificarImc(imc) {
    /*
    Resultado               Situação
    Abaixo de 18.5          Abaixo do peso
    Entre 18.5 e 24.99      Peso Normal
    Entre 25 e 29.99        Sobrepeso
    Acima de 30             Obesidade
    */
    if (imc < 18.5) {
        return "Abaixo do peso" 
    } else if (imc >= 18.5 && imc < 25) {
        return "Peso normal"
    } else if (imc >= 25 && imc < 30) {
        return "Sobrepeso"
    } else {
        return "Obesidade"
    }
}

function organizarDados(dadosUsuario, valorImc, classificacaoImc){
    // Pegar a dataHoraAtual
    let dataHoraAtual = new Intl.DateTimeFormat('pt-BR',{ timeStyle: 'long', dateStyle: 'short'}).format(Date.now())

    console.log(dataHoraAtual)

    //Organizar os dados od usuário
    let dadosUsuarioAtualizado = {
        ...dadosUsuario,
        imc: valorImc,
        situacaoImc: classificacaoImc,
        dataCadastro: dataHoraAtual
    }

    return dadosUsuarioAtualizado;
}

function cadastrarUsuario(dadosUsuario) {
    let listaUsuarios = [] 

     // SE houver uma lista de usuarios no localStorage, carrega isso para a variavel listaUsuarios
     if (localStorage.getItem("usuariosCadastrados") != null ) {
        listaUsuarios = JSON.parse( localStorage.getItem("usuariosCadastrados") )
    }

    //Adiciona o usuario na lista de usuarios
    listaUsuarios.push(dadosUsuario)

    //Salva a listaUsuarios no localStorage 
    localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuarios))
   
   
}   

function carregarUsuarios() {
    let listaCarregada = []

    if(localStorage.getItem("usuariosCadastrados") != null) {
        listaCarregada = JSON.parse(localStorage.getItem("usuariosCadastrados"))
    }

    
    if(listaCarregada.length == 0){
        //SE não tiver nenhum usuario cadastrado, mostrar mensagem.
       let tabela = document.getElementById("corpo-tabela")
         tabela.innerHTML = "Nenhum usuário cadastrado"
    } else{
        montarTabela(listaCarregada)
    }
    console.log(listaCarregada)
}

window.addEventListener("DOMContentLoaded",() => carregarUsuarios())

function montarTabela(listaUsuarios) {
    let tabela = document.getElementById ("corpo-tabela")
    let template = ""
    
    // listaUsuarios.forEach(usuario=>{console.log("o usuário é: ", usuario)})
    listaUsuarios.forEach(usuario => {
        template += ` <tr>
            <td data-cell="nome">${usuario.nome}</td>
            <td data-cell="altura">${usuario.altura}</td>
            <td data-cell="peso">${usuario.peso}</td>
            <td data-cell="valor do IMC">${usuario.imc.toFixed(2)}</td>
            <td data-cell="classificação do IMC">${usuario.situacaoImc}</td>
            <td data-cell="data de cadastro">${usuario.dataCadastro}</td>
    </tr> `
    })

    tabela.innerHTML = template;
}

function deletarRegistros() {
    //Remove o item do local storage
    localStorage.removeItem("usuariosCadastrados")

    //Recarrega a página
    window.location.reload()
}