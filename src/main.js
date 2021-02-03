let nome = document.querySelector("#name")
let lastname = document.querySelector("#lastname")
let email = document.querySelector("#email")
let cpf = document.querySelector("#cpf")
let numb = document.querySelector("#numb")
let inputPhoto = document.querySelector("input[type='file'")
let tableAdd = document.querySelector(".table-add")
let areaAdd = document.querySelector(".area-add")
let warnEdit = document.querySelector(".warn-edit")
let warnDel = document.querySelector("#warn-del")
let addButton = document.querySelector("#addButton")
let bntEdit = document.querySelector("#editButton > button")
let bntCancel = document.querySelector("#cancelButton > button")
let id = 1

var persons = JSON.parse(localStorage.getItem("person")) || []

function renderizarPessoas(){
    //Limpar a tela antes de renderizar
    tableAdd.innerHTML = ""

    //variável que identifica o tamanho do array.
    var tamanho = persons.length
    //Loop que de acordo com o tamanho do array, ele cria os elementos
    for( i=0; i<tamanho; i++){
        //Icon Lixeira
        iconExcluir = document.createElement("i")
        iconExcluir.setAttribute("class", "fa fa-trash")
        iconExcluir.setAttribute("id", "excluir")
        iconExcluir.setAttribute("style", "font-size: 25px")
        tdExcluir = document.createElement("td")
        tdExcluir.appendChild(iconExcluir)
        //Icon Editar
        iconEditar = document.createElement("i")
        iconEditar.setAttribute("class", "fa fa-edit")
        iconEditar.setAttribute("id", "editar")
        iconEditar.setAttribute("style", "font-size: 25px")
        tdEditar = document.createElement("td")
        tdEditar.appendChild(iconEditar)

        //Elemento <tr>
        tr = document.createElement("tr")
        //Adicionar elemento <tr> no <tbody>
        tableAdd.appendChild(tr)
        //Adicionar estrutura de elementos <td> no elemento <tr>
        tr.innerHTML = ` <td>${id+i}</td>
        <td><img src="images/icon-user.png" id="img-user" width="40" height="40"/></td>
        <td>${persons[i].names}</td> 
        <td>${persons[i].lastnames}</td>
        <td>${persons[i].emails}</td>
        <td>${persons[i].cpfs}</td>
        <td>${persons[i].numbs}</td>`
        tr.appendChild(tdExcluir)
        tr.appendChild(tdEditar)

        //Ao clicar no excluir é enviado para a tela_excluir o id
        iconExcluir.onclick = function(){
            tela_excluir(this.parentElement.parentElement.children[0])
        }
        //Ao clicar no editar é enviado para a edit o id
        iconEditar.onclick = function(){
            edit(this.parentElement.parentElement.children[0],)
            bntEdit.style.display = "block"
            bntCancel.style.display = "block"
            addButton.style.display = "none"

            }
    }
}

renderizarPessoas()

addButton.onclick = function add(photo){
    //Veifica se todos os campos foram preenchidos e SE UM ficar vario mostra mensagem de que nem todos foram preenchidos
    if(nome.value == "" || lastname.value == "" || email.value == "" || cpf.value == "" || numb.value == ""){
        warnEdit.style.background = "#5981e3"
        warnEdit.style.borderRadius = "5px 5px 0px 0px"
        warnEdit.innerHTML = `<i class="fa fa-exclamation-triangle" id="triangle-warn"><span>[AVISO] Nem todos os dados foram preenchidos!</span></i>`
    }else{
        warnEdit.innerHTML = ""
    }
    //Verifica se todos foram preenchidos e SE TODOS forem vazios mostra uma mensagem de erro para preencher pelo menos um campo
    if(nome.value == "" & lastname.value == "" & email.value == "" & cpf.value == "" & numb.value == ""){
        warnEdit.innerHTML = `<i class="fa fa-exclamation-triangle" id="triangle-warn"><span>[AVISO] Preencha pelo menos um campo!</span></i>`
    }else{
        persons.push({
            ids: id,
            photos: photo,
            names: nome.value,
            lastnames: lastname.value,
            emails: email.value,
            cpfs: cpf.value,
            numbs: numb.value
        })
    }
    renderizarPessoas()

    salvaDados()

    clear()
}
//Limpa os valores do input
function clear(){
    nome.value = ""
    lastname.value = ""
    email.value = ""
    cpf.value = ""
    numb.value = ""
}

//Mostra a tela de confirmação do excluir
function tela_excluir(id) {
   warnDel.setAttribute("style", "display:block")
    //Ao clicar no botão "SIM", é enviado o id
    let yes = document.querySelector("#yes")
    yes.onclick = function(){
        remove(id)
    }
}

//Recebe a confirmação do elemento <tr> para ser removido e remove do array
function remove(id){
    //Transformando o id recebido para inteiro e subtraindo menos 1, que fica o mesmo valor do indice do elemento
    let i = parseInt(id.textContent)
    persons.splice([i-1], 1)

    renderizarPessoas()

    salvaDados()

    warnDel.setAttribute("style", "display:none")
}

//Recebe os elementos no parametro para serem editados.
function edit(id){
    warnEdit.innerHTML = `<i class="fa fa-exclamation-triangle" id="triangle-warn"><span>[AVISO] Editando!</span></i>`
    //Transformando o id recebido para inteiro e subtraindo menos 1, que fica o mesmo valor do indice do elemento
    var i = parseInt(id.textContent)
    i = i-1
    //Pega o texto contido no elemento
    nome.value = persons[i].names
    lastname.value = persons[i].lastnames
    email.value = persons[i].emails
    cpf.value = persons[i].cpfs
    numb.value = persons[i].numbs

    areaAdd.style.display = "block"
    bntCancel.style.display = "block"
    

    bntEdit.onclick = function(){
        //Condição para que se o input estiver vazio, não fazer a alteração.
        if(nome.value != "" || lastname.value != "" || email.value != "" || cpf.value != "" || numb.value != ""){
            //Insere o que estiver no input, na mesma posição do elemento que está sendo editado.
            id = i
            persons[i].names = nome.value
            persons[i].lastnames = lastname.value
            persons[i].emails = email.value
            persons[i].cpfs = cpf.value
            persons[i].numbs = numb.value
        }
        warnEdit.innerHTML = ""
        clear()

        bntEdit.style.display = "none"
        bntCancel.style.display = "none"
        addButton.style.display = "block"

        renderizarPessoas()

        salvaDados()
    }
    
    bntCancel.onclick = function(){
        warnEdit.innerHTML = ""
        clear()

        bntEdit.style.display = "none"
        bntCancel.style.display = "none"
        addButton.style.display = "block"
    }
}

function salvaDados(){
    localStorage.setItem('person', JSON.stringify(persons))
}

function maskInput(){
    //Adição de pontuação no CPF
    cpf.addEventListener("keyup", () =>{
        let value = cpf.value.replace(/[^0-9]/g, "").replace(/^([\d]{3})([\d]{3})?([\d]{3})?([\d]{2})?/, "$1.$2.$3-$4")
        cpf.value = value
    })

    //Adição de pontuação no Telefone
    numb.addEventListener("keyup", () =>{
        let value = numb.value.replace(/[^0-9]/g, "").replace(/^([\d]{2})([\d]{5})?([\d]{4})?/, "($1) $2-$3")
        numb.value = value
    })
}

maskInput()

let no = document.querySelector("#no").onclick = () => warnDel.style.display = "none"
let add = document.querySelector("#add").onclick = () => areaAdd.style.display = "block"
let close = document.querySelector("#close").onclick = () => areaAdd.style.display = "none"