const email = document.querySelector("#ipt_loginEmail");

function validarEmail(email) {

    var padraoEmail = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$/;

    return padraoEmail.test(email);
}

const senha = document.querySelector("#ipt_loginSenha");

function validarSenha(senha) {

    var padraoSenha = /^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{6,15}$/;

    return padraoSenha.test(senha);
}

function efetuarLogin() {

    if (email.value == "" || senha.value == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, preencha todos os campos!',
        })
    } else if (validarEmail(email.value) != true) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email inválido!',
        })
    } else if (validarSenha(senha.value) != true) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Senha inválida!',
        })
    } else if (email.value == 'admin@gmail.com' && senha.value == "Admin@123") {
        Swal.fire(
            'Login efetuado!',
            'Redirecionando para página do usuário!',
            'success'
        )
        setTimeout(() => {
            window.location.href = "../dashboards/teladashboard.html"
        }, 3000)
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Conta não cadastrada!',
        })
    }
}