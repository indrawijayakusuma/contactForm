const scriptURL = 'https://script.google.com/macros/s/AKfycbxg00jqMixRONRMx11MuaTubBrT6HQ6NLRYL3pF8UZmXKH33AhK_81GS2DO53g0e0kmXg/exec';

const form = document.forms['wpu-contact-form'];
const btnKirim = document.querySelector('.btn-kirim');
const myAlert = document.querySelector('.my-alert');
const alert_del = document.querySelector('.alert-del');
const btnLoading = document.querySelector('.btn-Loading');
const descProgram = document.querySelector('.descProgram');
const popUp = document.querySelector('.modal');
const modalBlack = document.querySelector('.modalBlack');
const btnModal = document.querySelector('.btn-modal');

form.addEventListener('submit', (e) => {
e.preventDefault();
// ketika tombol submit diklik
// tampilkan tombol loading, hilangkan tombol kirim
btnLoading.classList.toggle('hidden');
btnKirim.classList.toggle('hidden');
fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then((response) => {
    // tampilkan tombol kirim, hilangkan tombol loading
    btnLoading.classList.toggle('hidden');
    btnKirim.classList.toggle('hidden');
    // // tampilkan alert
    popUp.classList.toggle('hidden');
    modalBlack.classList.toggle('hidden');

    form.reset();
    descProgram.scrollIntoView();

    console.log('Success!', response);
    })
    .catch((error) => console.error('Error!', error.message));
});

btnModal.addEventListener('click', (e) => {
    e.preventDefault();
    popUp.classList.toggle('hidden');
    modalBlack.classList.toggle('hidden');
    window.location.href = "hallOfFame.html";
});

alert_del.addEventListener('click', () => {
    alert_del.parentElement.classList.add('hidden');
})