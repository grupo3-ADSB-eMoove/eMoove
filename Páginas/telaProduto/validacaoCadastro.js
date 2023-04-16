const emailCadastro = document.querySelector("#ipt_email");

function validarEmail(emailCadastro) {

    var padraoEmail = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$/;

    return padraoEmail.test(emailCadastro);
}

const senhaCadastro = document.querySelector("#ipt_senha");

function validarSenha(senhaCadastro) {

    var padraoSenha = /^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{6,15}$/;

    return padraoSenha.test(senhaCadastro);
}

const usuario = document.querySelector("#ipt_usuario");
const confirmarSenha = document.querySelector("#ipt_confirmarSenha");

function efetuarCadastro() {

    if (emailCadastro.value == "" || senhaCadastro.value == "" || usuario.value == "" || confirmarSenha.value == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, preencha todos os campos!',
        })
    } else if (validarEmail(emailCadastro.value) != true) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email inválido!',
        })
    } else if (validarSenha(senhaCadastro.value) != true) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Senha inválida!',
        })
    } else if (senhaCadastro.value != confirmarSenha.value) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'As senhas não são iguais!',
        })
    } else {
        Swal.fire(
            'Cadastro efetuado!',
            'Confirme no seu email!',
            'success'
        )
    }
}