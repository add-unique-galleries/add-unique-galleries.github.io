const GalleryService = {
    getAllImageOnGallery: () => {
        return fetch(`//api.pexels.com/v1/search?per_page=15&page=1`, {
            method: 'GET',
            headers: {
                "Authorization": '563492ad6f91700001000001821f684ac31f47bcb88cf616bc0b0936'
            }})
    },
    searchOnGallery: (queryString: string) => {
        return fetch(`//api.pexels.com/v1/search?query=${queryString}&per_page=15&page=1`, {
            method: 'GET',
            headers: {
                    "Authorization": '563492ad6f91700001000001821f684ac31f47bcb88cf616bc0b0936'
            }})
    }
}

export default GalleryService;
