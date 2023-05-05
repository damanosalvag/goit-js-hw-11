import axios from "axios";
import Notiflix from "notiflix";

const KEY_API = '3977332-011d08d25d66b30f2cc776b52';

export default function getPictures(name, page) {
    return axios.get(`https://pixabay.com/api/?key=${KEY_API}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`)
        .then((response) => {
                return response;
        })
        .catch(error => {
            switch (true) {
                case error.response.status === 400:
                    Notiflix.Notify.failure(`We have reached the limit of images we can show you, subscribe to expand your limit!`);
                    break;
                case error.response.status === 401:
                    Notiflix.Notify.warning(`Authorization is required to access the resource!, Maybe Key problems`);
                    break;
                case error.response.status === 403:
                    Notiflix.Notify.warning(`The client does not have permission to acces this resource!, Maybe Key problems`);
                    break;
                case error.response.status === 404:
                    Notiflix.Notify.warning(`The resource is not found!`);
                    break;
                default:
                    Notiflix.Notify.warning(`Something went wrong!`);
            };
        });
};
