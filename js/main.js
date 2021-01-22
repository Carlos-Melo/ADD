let name = document.querySelector("#name")
let lastname = document.querySelector("#lastname")
let email = document.querySelector("#email")
let cpf = document.querySelector("#cpf")
let numb = document.querySelector("#numb")
let tableAdd = document.querySelector(".table-add")
let areaAdd = document.querySelector(".area-add")
let warnEdit = document.querySelector(".warn-edit")
let bntEdit = document.querySelector("#editButton > button")
let bntCancel = document.querySelector("#cancelButton > button")
let bntAdd = document.querySelector("#addButton")

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
// Acessando o Storage e transformando num array, ou retorna um array vazio
var nomes = JSON.parse(localStorage.getItem("nomePessoas")) || []
var sobrenomes = JSON.parse(localStorage.getItem("sobrenomePessoas")) || []
var emails = JSON.parse(localStorage.getItem("emailPessoas")) || []
var cpfs = JSON.parse(localStorage.getItem("cpfPessoas")) || []
var numbs = JSON.parse(localStorage.getItem("numbPessoas")) || []

function renderizarPessoas(){
    //Limpar a tela antes de renderizar
    tableAdd.innerHTML = ""

    //variável que identifica o tamanho do array. Obs.: Todo array dessa aplicação tem o mesmo tamanho
    
    var tamanho = nomes.length
    //Loop que de acordo com o tamanho do array, ele cria os elementos
    for( i= 0; i<tamanho; i++){
        iconExcluir = document.createElement("i")
        iconExcluir.setAttribute("class", "fa fa-trash")
        iconExcluir.setAttribute("id", "excluir")
        iconExcluir.setAttribute("style", "font-size: 25px")
        tdExcluir = document.createElement("td")
        tdExcluir.appendChild(iconExcluir)

        iconEditar = document.createElement("i")
        iconEditar.setAttribute("class", "fa fa-edit")
        iconEditar.setAttribute("id", "editar")
        iconEditar.setAttribute("style", "font-size: 25px")
        tdEditar = document.createElement("td")
        tdEditar.appendChild(iconEditar)
        //Criar elementos <tr>
        tr = document.createElement("tr")
        //Adicionar elemento <tr> no <tbody>
        tableAdd.appendChild(tr)
        //Adicionar estrutura de elementos <td> no elemento <tr>
        tr.innerHTML = `<td><img src="images/icon-user.png" id="img-user" width="40" height="40"/></td>
        <td>${nomes[i]}</td> 
        <td>${sobrenomes[i]}</td>
        <td>${emails[i]}</td>
        <td>${cpfs[i]}</td>
        <td>${numbs[i]}</td>`
        tr.appendChild(tdExcluir)
        tr.appendChild(tdEditar)

            //Ao clicar no excluir é enviado para a tela_excluir a posição dos elementos que foram clicados
            iconExcluir.onclick = function(){
                tela_excluir(this.parentElement.parentElement.children[1],  this.parentElement.parentElement.children[2], this.parentElement.parentElement.children[3], this.parentElement.parentElement.children[4], this.parentElement.parentElement.children[5])
            }
            //Ao clicar no editar é enviado para a edit a posição dos elementos que foram clicados
            iconEditar.onclick = function(){
                edit(this.parentElement.parentElement.children[1],  this.parentElement.parentElement.children[2], this.parentElement.parentElement.children[3], this.parentElement.parentElement.children[4], this.parentElement.parentElement.children[5])
                bntEdit.style.display = "block"
                bntCancel.style.display = "block"
                bntAdd.style.display = "none"

            }
        }
    
}

renderizarPessoas()

function add(){
    //Veifica se todos os campos foram preenchidos e SE UM ficar vario mostra mensagem de que nem todos foram preenchidos
    if(name.value == "" || lastname.value == "" || email.value == "" || cpf.value == "" || numb.value == ""){
        warnEdit.style.background = "rgba(255, 255, 0, 0.4)"
        warnEdit.innerHTML = `<i class="fa fa-exclamation-triangle" id="triangle-warn"><span>[AVISO] Nem todos os dados foram preenchidos!</span></i>`
    }else{
        warnEdit.innerHTML = ""
    }
    //Verifica se todos foram preenchidos e SE TODOS forem vazios mostra uma mensagem de erro para preencher pelo menos um campo
    if(name.value == "" & lastname.value == "" & email.value == "" & cpf.value == "" & numb.value == ""){
        warnEdit.innerHTML = `<i class="fa fa-exclamation-triangle" id="triangle-warn"><span>[AVISO] Preencha pelo menos um campo!</span></i>`
    }else{
        nomes.push(name.value)
        sobrenomes.push(lastname.value)
        emails.push(email.value)
        cpfs.push(cpf.value)
        numbs.push(numb.value)
    }
   
    renderizarPessoas()

    salvaDados()

    clear()
}

//Limpa os valores do input
function clear(){
    name.value = ""
    lastname.value = ""
    email.value = ""
    cpf.value = ""
    numb.value = ""
}

//Mostra a tela de confirmação do excluir
function tela_excluir(nome, sobrenome, email, cpf, numb) {
    $('#warn-del').css("display", "block") 
    //Ao clicar no botão "SIM", é enviado o elemento <tr> que foi clicado
    let yes = document.querySelector("#yes")
    yes.onclick = function(){
        remove(nome, sobrenome, email, cpf, numb)
    }
}

//Recebe os elementos no parametro para serem editados.
function edit(nomeEd, sobrenomeEd, emailEd, cpfEd, numbEd){
    warnEdit.innerHTML = `<i class="fa fa-exclamation-triangle" id="triangle-warn"><span>[AVISO] Editando!</span></i>`
    //Pega o texto contido no elemento
    name.value = nomeEd.textContent
    lastname.value = sobrenomeEd.textContent
    email.value = emailEd.textContent
    cpf.value = cpfEd.textContent
    numb.value = numbEd.textContent

    areaAdd.style.display = "block"
    $("#close").css("display", "none")
    

    bntEdit.onclick = function(){
        //Recebe o index do elemento para identificar no array qual elemento editar.
        i = nomes.indexOf(nomeEd.textContent)
        //Condição para que se o input estiver vazio, não fazer a alteração.
        if(name.value != "" || lastname.value != "" || email.value != "" || cpf.value != "" || numb.value != ""){
        //Insere o que estiver no input, na mesma posição do elemento que está sendo editada.
        nomes[i] = name.value
        sobrenomes[i] = lastname.value
        emails[i] = email.value
        cpfs[i] = cpf.value
        numbs[i] = numb.value
    }
        warnEdit.innerHTML = ""
        clear()

        bntEdit.style.display = "none"
        bntCancel.style.display = "none"
        bntAdd.style.display = "block"
        $("#close").css("display", "block")

        renderizarPessoas()

        salvaDados()
    }
    
    bntCancel.onclick = function(){
        warnEdit.innerHTML = ""
        clear()

        bntEdit.style.display = "none"
        bntCancel.style.display = "none"
        bntAdd.style.display = "block"
        $("#close").css("display", "block")
    }
}

//Recebe a confirmação do elemento <tr> para ser removido e remove do array
function remove(nome, sobrenome, email, cpf, numb){
        //Pega o texto que está localiza seu index e exclui do elemento.
        nomes.splice(nomes.indexOf(nome.textContent), 1)
        sobrenomes.splice(sobrenomes.indexOf(sobrenome.textContent), 1)
        emails.splice(emails.indexOf(email.textContent), 1)
        cpfs.splice(cpfs.indexOf(cpf.textContent), 1)
        numbs.splice(numbs.indexOf(numb.textContent), 1)

        renderizarPessoas()

        salvaDados()

        $('#warn-del').css("display", "none")
    }

function salvaDados(){
    localStorage.setItem('nomePessoas', JSON.stringify(nomes))
    localStorage.setItem('sobrenomePessoas', JSON.stringify(sobrenomes))
    localStorage.setItem('emailPessoas', JSON.stringify(emails))
    localStorage.setItem('cpfPessoas', JSON.stringify(cpfs))
    localStorage.setItem('numbPessoas', JSON.stringify(numbs))
}

$('#no').click(function() {
        $('#warn-del').css("display", "none")
    })

$('#add').click(function(){
    $('.area-add').css("display", "block")
})

$('#close').click(function(){
    $('.area-add').css("display", "none")
})