


form.addEventListener('submit', async (e)=> {
    e.preventDefault();

    const form = document.getElementById('form')
    const responseText = document.getElementById('responsetext');

    const formData = new FormData(form);

    let response = await fetch('/price', {
        method: "POST",
        body: JSON.stringify({ "query": formData.get('query') }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    response = await response.json();

    if (response.error)
        responseText.innerText = response.error;
    else
        responseText.innerHTML = `${response.fruit} is $${response.price}`;
});