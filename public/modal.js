// const openModalButtonReg = document.querySelector(".botaoRegistrar");
// const closeModalButtonReg = document.querySelector("#close-modalReg");
// const modalReg = document.querySelector("#modalReg");
// const fadeReg = document.querySelector("#fadeReg");

// emailCadastro = document.querySelector("#ipt_email");
// senhaCadastro = document.querySelector("#ipt_senha");
// usuario = document.querySelector("#ipt_usuario");
// confirmarSenha = document.querySelector("#ipt_confirmarSenha");

// const toggleModalReg = () => {
//     [modalReg, fadeReg].forEach((el) => el.classList.toggle("hideReg"));
//     emailCadastro.value = "";
//     senhaCadastro.value = "";
//     usuario.value = "";
//     confirmarSenha.value = "";
// }

// [openModalButtonReg, closeModalButtonReg, fadeReg].forEach((el) => {
//     el.addEventListener("click", () => toggleModalReg());
// });

const openModalButtonLogin = document.querySelector(".botaoLogin");
const closeModalButton = document.querySelector("#close-modal");
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");
email = document.querySelector("#ipt_loginEmail");
senha = document.querySelector("#ipt_loginSenha");

const toggleModal = () => {
    [modal, fade].forEach((el) => el.classList.toggle("hide"));
    email.value = "";
    senha.value = "";
}
[openModalButtonLogin, closeModalButton, fade].forEach((el) => {
    el.addEventListener("click", () => toggleModal());
});