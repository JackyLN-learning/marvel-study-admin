// List Characters
fetch('http://localhost:3000/api/characterList')
    .then(response => response.json())
    .then(data => {
        const characters = data;
        const tableBody = document.querySelector("#characters-table tbody");

        characters.forEach(character => {
            const row = tableBody.insertRow();
            row.insertCell().textContent = character.id;
            row.insertCell().textContent = character.name;
            row.insertCell().textContent = character.modified;
            
            // Tạo cell cho nút detail
            const detailCell = row.insertCell();
            const detailButton = document.createElement("button");
            detailButton.textContent = "View Details";
            detailButton.addEventListener("click", () => {
                fetch('http://localhost:3000/api/sendCharacterId', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ characterId: character.id })
                })
                .then(response => {
                    if (response.ok) {
                        console.log('Character ID sent to the server successfully.');
                        window.location.href = `character.html`;
                    } else {
                        throw new Error('Failed to send Character ID to the server.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            });
            detailCell.appendChild(detailButton);

            // Tạo cell cho nút like
            const likeCell = row.insertCell();
            const likeButton = document.createElement("button");
            likeButton.textContent = "❤️ Like";
            likeButton.classList.add('like-button');
            
            // Xử lý sự kiện like
            likeButton.addEventListener("click", () => {
                // Chuẩn bị dữ liệu để gửi đi
                const likeData = {
                    characterId: character.id,
                    characterName: character.name,
                    thumbnail: `${character.thumbnail.path}.${character.thumbnail.extension}`
                };

                // Gửi request like tới server
                fetch('http://localhost:3000/api/favorite', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(likeData)
                })
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        // Thông báo khi like thành công
                        alert(result.message);
                        
                        // Có thể thay đổi trạng thái của nút like
                        likeButton.disabled = true;
                        likeButton.textContent = "Liked ✅";
                    }
                })
                .catch(error => {
                    console.error('Error liking character:', error);
                    alert('Có lỗi xảy ra khi thích nhân vật');
                });
            });

            likeCell.appendChild(likeButton);
        });
    })
    .catch(error => console.error(error));