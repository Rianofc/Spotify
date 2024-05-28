function searchTracks() {
    const query = document.getElementById('searchInput').value.trim();
    if (query === '') {
        alert('Please enter a search query.');
        return;
    }

    $('#waitModal').modal('show');

    fetch(`https://api.onesytex.my.id/api/spotify-search?query=${query}`)
        .then(response => response.json())
        .then(data => {
            const resulte = data.results
            const musicGallery = document.getElementById('musicGallery');
            musicGallery.innerHTML = '';

            if (resulte.length === 0) {
                musicGallery.innerHTML = '<p class="text-center text-gray-600">No results found.</p>';
                $('#waitModal').modal('hide');
                return;
            }

            resulte.forEach(track => {
                const card = `
                    <div class="bg-gray-800 rounded-lg overflow-hidden shadow-md">
                        <img src="${track.image}" alt="${track.name}" class="w-full h-40 object-cover rounded-t-lg">
                        <div class="p-4">
                            <h2 class="text-lg font-semibold text-white">${track.title}</h2>
                            <p class="text-sm text-gray-400">${track.artists}</p>
                            <button onclick="showTrackInfo('${track.link}')" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-2">Play</button>
                        </div>
                    </div>
                `;
                musicGallery.innerHTML += card;
            });

            $('#waitModal').modal('hide');
        })
        .catch(error => {
            console.error('Error fetching tracks:', error);
            alert('Failed to fetch tracks. Please try again later.');
            $('#waitModal').modal('hide');
        });
}

function showTrackInfo(trackUrl) {
    $('#waitModal').modal('show');

    fetch(`https://api.exonity.my.id/api/spotify?url=${trackUrl}`)
        .then(response => response.json())
        .then(data => {
            const result = data.result
            const modalTitle = document.getElementById('modalTitle');
            const modalContent = document.getElementById('modalContent');

            modalTitle.textContent = result.title;
            modalContent.innerHTML = `
                <img src="${result.image}" alt="${result.title}" class="w-100 rounded">
                <p><strong>Artist:</strong> ${result.artis}</p>
                <p><strong>Album:</strong> ${result.title}</p>
                <audio controls class="mx-auto mt-4">
                    <source src="https://api.exonity.my.id/api/spotify2?url=${trackUrl}" type="audio/mp3">
                    Your browser does not support the audio element.
                </audio>
            `;

            $('#trackModal').modal('show');
        })
        .catch(error => {
            console.error('Error fetching track info:', error);
            alert('Failed to fetch track info. Please try again later.');
            $('#waitModal').modal('hide');
        });
}

function closeModal() {
    $('#trackModal').modal('hide');
}

document.getElementById("searchInput").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchTracks();
    }
});
