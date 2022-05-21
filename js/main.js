let input = document.querySelector('input[name=cep]');
let btnAdd = document.querySelector('#adc-cep');
let divSel = document.querySelector('#selected-cep');

let cep_listado = [];

function addCEP(element){

    let iconLocal = document.createElement('img');
    iconLocal.setAttribute('src', 'images/icone-lugar.svg');
    iconLocal.setAttribute('alt', 'icone de localização');

    let divAdc = document.createElement('div');
    divAdc.setAttribute('class', 'adicionados');

    let pAdc = document.createElement('p');
    let spanAdc = document.createElement('span');
    let textP_adc = document.createTextNode(element);
    spanAdc.innerHTML = 'CEP';
    let space = document.createTextNode(' ');

    pAdc.appendChild(spanAdc);
    pAdc.appendChild(space);
    pAdc.appendChild(textP_adc);
    divAdc.appendChild(iconLocal);
    divAdc.appendChild(pAdc);
    divSel.appendChild(divAdc);

    cep_listado.push(element);

}

btnAdd.onclick = function(){
    addCEP(input.value);
    input.value = '';
}

let btnCreate = document.querySelector('#create');

let sectionEndereco = document.querySelector('#endereco');

function addEndereco(rua, cidade, cep){

    //elementos gerais
    let divAddress = document.createElement('div');
    divAddress.setAttribute('class', 'address');

    //elementos da esquerda

    let divEsquerda = document.createElement('div');
    divEsquerda.setAttribute('class', 'esquerda');

    let img1 = document.createElement('img');
    img1.setAttribute('src', 'images/icone-lugar.svg');
    img1.setAttribute('alt', 'icone de lugar');

    let p1 = document.createElement('p');
    let textoP1 = document.createTextNode(rua);

    let span = document.createElement('span');
    let textoSpan = document.createTextNode(cidade);

    //juntando os elementos da esquerda
    divEsquerda.appendChild(img1);
    divEsquerda.appendChild(p1);
    p1.appendChild(textoP1);
    p1.appendChild(span);
    span.appendChild(textoSpan);
    
    //adicionando elementos da direita
    let divDireita = document.createElement('div');
    divDireita.setAttribute('class', 'direita');

    let p2 = document.createElement('p');
    let textP2 = document.createTextNode(cep);

    let img2 = document.createElement('img');
    img2.setAttribute('src', 'images/icone-lixo.svg');
    img2.setAttribute('alt', 'excluir');

    //juntando elementos da direita
    divDireita.appendChild(p2);
    p2.appendChild(textP2);
    divDireita.appendChild(img2);

    //juntando tudo
    divAddress.appendChild(divEsquerda);
    divAddress.appendChild(divDireita);
    sectionEndereco.appendChild(divAddress);

}

btnCreate.onclick = function(){
    let pesquisarCep = async() => {

        for(let i = 0; i < cep_listado.length; i++){

            let url = `https://viacep.com.br/ws/${cep_listado[i]}/json/`;
            let dados = await fetch(url);
            let endereco = await dados.json();

            let bairro = endereco.bairro;
            let rua = endereco.logradouro
            let logradouro = `${rua}, ${bairro}`;
            let cidade = endereco.localidade;
            let uf = endereco.uf;
            let cidadeEstado = `${cidade}, ${uf}`;
        
            addEndereco(logradouro, cidadeEstado, cep_listado[i]);
        }

    }

    pesquisarCep();

}