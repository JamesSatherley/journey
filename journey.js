window.onload = function() {
    const imageListKey = 'imageList';
    const lastImageDateKey = 'lastImageDate';
    const imageUrlKey = 'imageUrl';
    let today = new Date().toDateString();

    chrome.storage.local.get([imageListKey, lastImageDateKey, imageUrlKey], function(result) {
        let lastImageDate = result[lastImageDateKey];
        let imageUrl = result[imageUrlKey];
        let images = result[imageListKey] ? result[imageListKey] : getDefaultImageList();

        if (!lastImageDate || !imageUrl || new Date(lastImageDate).toDateString() !== today) {
            imageUrl = images[Math.floor(Math.random() * images.length)];
            chrome.storage.local.set({ [lastImageDateKey]: today, [imageUrlKey]: imageUrl });
        }

        preloadImages(images);
        document.body.style.backgroundImage = 'url(' + imageUrl + ')';
    });

    var searchBar = document.getElementById('search-bar');
    if (searchBar) {
        searchBar.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                var query = encodeURIComponent(this.value);
                window.location.href = 'https://www.google.com/search?q=' + query;
            }
        });
    } else {
        console.error('Search bar element not found');
    }

    updateClock();
    setInterval(updateClock, 1000);
};

function preloadImages(images) {
    images.forEach(imageUrl => {
        const img = new Image();
        img.src = imageUrl;
    });
}

function getDefaultImageList() {
    return [
        'https://images.unsplash.com/photo-1702626590502-23f10cd54a0b?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1475737154378-501d2de7fd94?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1560382797-66b2d275cb56?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1648471766979-5e7d920f327f?q=80&w=3607&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1702719796532-13c5bfbb741e?q=80&w=3732&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1543039717-b4d407223b4c?q=80&w=2404&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1691201200774-aee757f40cff?q=60&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDk3fGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D'
    ];
}

function updateClock() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var timeString = hours + ':' + minutes;
    document.getElementById('clock').innerText = timeString;
}
