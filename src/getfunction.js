import axios from "axios";

export default function getPictures(name, page) {
    return axios.get(`https://pixabay.com/api/?key=3977332-011d08d25d66b30f2cc776b52&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`)
        .then((response) => {
            if (response.data === '[ERROR 400] \"page\" is out of valid range.') {
                Notiflix.Notify.warning(`We have reached the limit of images we can show you, subscribe to expand your limit!`);   
            } else {
                return response;
            };
        })
        .catch(error => {
            console.log(error)
        });
}
