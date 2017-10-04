import axios from 'axios';

class AdminLogin{

    sendData(data) {
        axios.post('/admin', {
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

export default AdminLogin;