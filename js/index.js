selecionarUsuarios();

document.querySelector('#salvar').addEventListener('click', () => {
    let nome = document.querySelector('#exampleInputName').value;
    // pegando pelo nome, porque todos os itens desse radio tem o mesmo nome
    // e então pegaremos apenas o selecionado. Estamos selecionando pela tag
    // <input> e pegando a tag com o nome especifico.
    let genero = document.querySelector('input[name=gender]:checked').value;
    let dtNascimento = document.querySelector('#exampleInputBirth').value;
    let pais = document.querySelector('#exampleInputCountry').value;
    let email = document.querySelector('#exampleInputEmail1').value;
    let password = document.querySelector('#exampleInputPassword1').value;
    let foto = document.querySelector('#exampleInputFile').value;
    // pegando integralmente, porque o "value" é igual para marcado ou não
    let admin = document.querySelector('#exampleInputAdmin').checked;

    // "===" com 3 "=" ele vai comparar o conteúdo e o tipo também
    if (admin == true) {
        admin = 'Sim';
    } else {
        admin = 'Não';
    }

    // Criar o arquivo
    let json = {
        nome: nome, genero: genero, dtNascimento: dtNascimento,
        pais: pais, email: email, password: password, foto: foto, admin: admin
    };

    //console.log(json);

    addLinha(json);

    inserir(json);
});

// JSON - todo arquivo JSON começa com Chaves e dentro terá uma chave do
// elemento e o DOMRectReadOnly, separados por ":"
// sintaxe {chave:valor, chave:valor, chave:valor, chave:valor ......}, {}

// ÁREA DESTINADA A FUNÇÕES
function addLinha(usuario) {
    // cria tag nova
    let tr = document.createElement('tr');

    // adiciona dentro dessa tag <tr> o texto abaixo
    // para colocar foto é necessário colocar inserir a tag <img> antes
    // data atual ${new Date().toLocaleDateString()} e formatada
    tr.innerHTML = `
    <td><img src="dist/img/avatar5.png" alt="Imagem do Usuário" class="img-sm img-circle"></td>
    <td>${usuario.nome}</td>
    <td>${usuario.email}</td>
    <td>${usuario.admin}</td>
    <td>${new Date().toLocaleDateString()}</td>
    <td>
    <button type="button" class="btn btn-primary btn-sm">Editar</button>
    <button type="button" class="btn btn-danger btn-sm btn-delete" data-toggle="modal" 
            data-target="#modalExcluir">Excluir</button>
    </td>`;

    // Local onde será inserido, dentro do elemento id=table-users
    document.querySelector('#table-users').appendChild(tr); atualizarContagem();
    addEventosBtn(tr);
}



// Contagem do número de linhas da tabela para saber o número de usuários.
// checagem dos usuários adm para colocar o número de usuários adm,
// dentro do <tr> você tem que achar o 4º item, que é ADM, e verificar se ele é "Sim".
function atualizarContagem() {
    let numUsuarios = 0;
    let numAdmins = 0;

    numUsuarios = document.querySelector('#table-users').children.length;

    // número de adm
    // transformar em array um HTML Collection ->  "[...      children]",
    // o "forEach" funciona apenas se for um array.
    // ".clildren" é o filho do "id=table-users", mas o "tr.children" pega 
    // o filho do <tr>
    [...document.querySelector('#table-users').children].forEach(tr => {
        if (tr.children[3].innerHTML == 'Sim') {
            numAdmins = numAdmins + 1;
        };
    });

    // número de usuários
    document.querySelector('#number-users').innerHTML = numUsuarios;
    // número de Admins
    document.querySelector('#number-users-admin').innerHTML = numAdmins;
}

// cria eventos para um determinado botão
function addEventosBtn(tr) {
    // fazendo um "querySelector" dentro do "tr", parametro recebido pela função
    tr.querySelector('.btn-delete').addEventListener('click', t => {
        //console.log('Click no botão excluir');

        // se usar o modal não precisa do "if".
        //if(confirm('Deseja realmente excluir o item?')){
        // com modal "tr.remove()" passou para dentro do "addEventListener"
        //tr.remove();
        //}

        // para funcionar o modal
        document.querySelector('#confirmar-exclusao').addEventListener('click', e => {
            tr.remove();
            atualizarContagem();
            $('#modalExcluir').modal('hide');
        });

        // sem modal, com modal passou para dentro do "addEventListener"
        //atualizarContagem();
    })
}

// Função para inserir dados
function inserir(json){
    // armazenando o json no "session store"
    // Quando utiliza "sessionStorage", mesmo passando um JSON,
    // O próprio método converte o objeto para string.
    // O "toString" do objeto JSON retorna [Object]. Teste:
    //sessionStorage.setItem('usuario', json);

    // Para converter o arquivo JSON para strig, tem que usar o método, 
    // senão ele não consegue converter retorna "[Object]"
    // Da forma salva abaixo, ele sempre sobre-escreve o item anterior
    // "sessionStorage.setItem('usuario', JSON.stringify(json));", para isso
    // vamos cria um array de usuários, para guardar várias informações sem sobre-escrever
    let usuarios = [];

    if(sessionStorage.getItem('usuarios')){

        // o "JSON.parse" retprna a string para o estado original de JSON
        usuarios = JSON.parse(sessionStorage.getItem('usuarios'))
    }

    // o comando "push" ele vai adicionar um novo valor no array já existente, no fim da fila.
    usuarios.push(json);

    sessionStorage.setItem('usuarios', JSON.stringify(usuarios));

}

// Função para recuperar os valores da "session storage" e inserir na página
// Essa função deve ser chamada no ínicio do código, pois a primeira coisa 
// que queremos ao carregar a página é recuperar os usuários.
function selecionarUsuarios(){
    let usuarios = [];

    if(sessionStorage.getItem('usuarios')){

        // o "JSON.parse" retprna a string para o estado original de JSON
        usuarios = JSON.parse(sessionStorage.getItem('usuarios'))
    }
    //console.log(usuarios);

    usuarios.forEach(usuario => {
        //console.log(usuario);
        //chamar o adicionar linha para colocar no cod HTML
        addLinha(usuario);
    })

}
