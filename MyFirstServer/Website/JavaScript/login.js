
var submit = document.getElementById("form1");
submit.addEventListener('submit', async function (event) {
    event.preventDefault();
    if (!localStorage.getItem('username')) {
        let field = event.target.getElementsByTagName('input');
        let username = field[0].value.toString();
        let password = field[1].value.toString();
        if (username === '' || password === '') alert('Username and Password cannot be empty.');
        else {
            let data = {
                'username': username,
                'password': password
            };
            let response = await fetchData('/login', data);
            if (response.status == 1) {
                fetchData('/login_alert', { 'username': username });
                localStorage.setItem('username', username);
                location.href = '/index.html';
            }
            else {
                if (response.status == 0)
                    alert('Wrong User ID or Password ! Try Again');
                if (response.status == -1)
                    alert("User ID doesn't exists.");

            }
        }
    }
    else {
        alert(' Already logged in ');
    }
    event.preventDefault();
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