async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            console.log('success');
            await fetch('/api/users/login', {
                method: 'post',
                body: JSON.stringify({
                    username,
                    password
                }),
                headers: { 'Content-Type': 'application/json' }
            });
            await document.location.replace('/');
        } else {
            alert(`${response.statusText}
            Make sure your password is 8 characters.
            If your password is the correct length,
            try a different username.`);
        }
    }
}

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);