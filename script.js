const API_URL = "https://api-ssl.bitly.com/v4/bitlinks";
const ACCESS_TOKEN = "500d7f15937b32fab173123796f4c11a7eda78b5";


let data_response = ""   //Global Variable for storing the response


//function for shortning the url
async function short_url() {
    const url_long = document.getElementById("longUrlInput").value;
    const normalize = JSON.stringify({
        "long_url": url_long,
    });   //need to normalize the body before sending

    //verifies wheter the user entered the url or not. If not alerts to input
    if (!url_long) {
        alert("Please Enter the Long url")
        return 0;
    }

    const shorten_res = document.getElementById("shortUrlOutput");
    const loader = document.getElementById("loader");

    //making the loader animation visibile to user makes them to wait
    loader.innerHTML = `<div class= "lds-facebook text-center"><div></div><div></div><div></div></div>`

    //sending request to the API using fetch promise
    try {
        let res = await fetch(API_URL, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: normalize
        });

        //response is stored into the global variable after converting to json
        data_response = await res.json();

        //verifies that the response has no messages recived (errors)
        if (!data_response.message) {
            const shortUrlButton = document.getElementById("shortUrlButton");
            const url_long = document.getElementById("longInput");
            // url_long.innerHTML = ""
            // url_long.innerHTML = `<input type="text" class="form-control form-control-lg " id="link"
            //                 value=${url_long.innerText} readonly>`

            shortUrlButton.innerHTML = ""
            loader.innerHTML = ""
            shortUrlButton.innerHTML = `
            <button class="btn btn-warning btn-lg edit-button" type="submit" id="shortenButton"
                            onclick="editData();">Edit</button>
            <button class="btn btn-danger btn-lg delete-button" type="submit" id="shortenButton"
                            onclick="deleteData();">Delete</button>`
            shorten_res.innerHTML = `            
            <input type="text" class="form-control form-control-lg " id="link"
                            placeholder="" value=${data_response.link} readonly><hr>
            
            <button class="btn btn-warning btn-lg" type="submit" id="shortenButton"
                onclick="copyToClipboard()">Copy</button>
                    <p id="copyStatus" class="copy-notification"></p>`

        }

        //if error display the error message
        else if (data.message) {
            shorten_res.innerHTML = `                        
            <input type="text" class="form-control form-control-lg " id="link"
                            placeholder="" value="Invalid / Error" readonly><hr>
            
            <button class="btn btn-warning btn-lg" type="submit" id="shortenButton"
                            onclick="copyToClipboard()">Copy</button>
            <p id="copyStatus" class="copy-notification"></p>`
            loader.innerHTML = ""

        }
    }catch (error) {
        //if error  catched then display the alert to the user.
        alert(error)
        loader.innerHTML = ""
        shorten_res.innerHTML = `                        
            <input type="text" class="form-control form-control-lg " id="link"
                            placeholder="" value="Invalid / Error" readonly><hr>
            
            <button class="btn btn-warning btn-lg" type="submit" id="shortenButton"
                            onclick="copyToClipboard()">Copy</button>
            <p id="copyStatus" class="copy-notification"></p>`
    }
}


//function for modifying the url
async function editData() {
    const edit_Url = prompt("Enter the new long Url!")
    const loader = document.getElementById("loader");
    loader.innerHTML = `<div class= "lds-facebook text-center"><div></div><div></div><div></div></div>`
    if (edit_Url !== null && edit_Url !== "") {
        const normalize = JSON.stringify({
            "long_url": edit_Url,
        });
        try {
            const edit = await fetch(`${API_URL}/${data_response.id}`, {
                method: "PATCH",
                headers: {
                    'Authorization': `Bearer ${ACCESS_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: normalize
            });
            console.log(data_response);
            const url_long = document.getElementById("longInput");
            loader.innerHTML = ""
            url_long.innerHTML = `
             <input type="text" class="form-control form-control-lg " id="link"
                            placeholder="" value=${edit_Url} readonly>`
        }
        catch (error) {
            console.log(error);
        }
    } else {
        loader.innerHTML = ""
        alert("User cancelled the prompt or entered nothing.");
    }
}

async function deleteData() {
    const confirmDelete = confirm("Are You sure you want to Delete this link?")
    if (confirmDelete) {
        try {
            const deleteUrl = await fetch(`${API_URL}/${data_response.id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${ACCESS_TOKEN}`,
                },
            });
            const res = await deleteUrl.json()
            console.log(res.links_deleted);
            if (res.links_deleted) {
                location.reload(true);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}

function copyToClipboard() {
    const copyText = document.getElementById("link").value;
    const copyStatus = document.getElementById("copyStatus");
    // const copyButton = document.getElementById("shortenButton").innerText
    console.log(copyButton);

    if (copyText) {
        navigator.clipboard.writeText(copyText).then(() => {
            copyStatus.innerText = "Copied!";
            // copyButton.innerText = "Edit"

        }).catch(err => {
            copyStatus.innerText = "Failed to copy.";
            console.error("Failed to copy: ", err);
        });
    } else {
        copyStatus.innerText = "No URL to copy.";
    }

}
