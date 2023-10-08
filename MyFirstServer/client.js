var submit = document.getElementById("form1");
var logout = document.getElementById('logout');
var login = document.getElementById('login');
var uid = document.getElementById('uid');
refreshUid();
submit.addEventListener('submit', async function (event) {
    event.preventDefault();
    if (!localStorage.getItem('username')) {
        alert('No running account found! Pleas login');
        location.href = '/login.html';
    }
    else {
        let username = localStorage.getItem('username');
        var field = event.target.getElementsByTagName('input');
        var message = field[0].value.toString();
        var data = {
            'message': message,
            'username': username
        };
        let res = await fetchData('/chat', data);
        field[0].value = '';
    }
});
async function fetchData(path, data) {
    try {
        let res = await fetch(path, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        var result = await res.json();
        return result;
    }
    catch (error) {
        console.log(error);
    }
}

logout.addEventListener('click', function (event) {
    if (localStorage.getItem('username')) {
        let username = localStorage.getItem('username');
        localStorage.setItem('username', "");
        fetchData('/logout_alert', { 'username': username });
        refreshUid();
    }
});
login.addEventListener('click', (event) => {
    location.href='/login.html'
})
function refreshUid() {
    uid.innerHTML = localStorage.getItem('username');
    if (uid.innerHTML == '') {
        uid.innerHTML = 'No user found';
        logout.style.display = 'none';
        login.style.display = 'block';
    }
    else {
        logout.style.display = 'block';
        login.style.display = 'none';
    }
}