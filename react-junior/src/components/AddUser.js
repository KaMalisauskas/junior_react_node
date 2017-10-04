import axios from 'axios';

class AddUser{

    sendData(data) {
        axios.post('/admin/register', {
            item: data
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export default AddUser;