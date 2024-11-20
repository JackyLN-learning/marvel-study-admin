// List Chatacters
fetch('http://localhost:3000/characterList')
    .then(response => response.json())
    .then(data => {
        const characters = data;
        const tableBody = document.querySelector("#characters-table tbody");

        characters.forEach(character => {
            const row = tableBody.insertRow();
            row.insertCell().textContent = character.id;
            row.insertCell().textContent = character.name;
            row.insertCell().textContent = character.modified;
            const detailCell = row.insertCell();
            const detailButton = document.createElement("button");
            detailButton.textContent = "View Details";
            detailButton.addEventListener("click", () => {
                fetch('http://localhost:3000/sendCharacterId', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ characterId: character.id })
                })
                    .then(response => {
                        // localStorage.setItem('charactersData', JSON.stringify(charactersData));
                        if (response.ok) {
                            console.log('Character ID sent to the server successfully.');
                            // Sau khi xử lý thành công, chuyển hướng đến trang character.html
                            window.location.href = `character.html`;
                        } else {
                            throw new Error('Failed to send Character ID to the server.');
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                // window.location.href = `character.html?id=${character.id}`;
            });

            detailCell.appendChild(detailButton);
        });
    }
        //console.log(data.data)

    )
    .catch(error => console.error(error));
