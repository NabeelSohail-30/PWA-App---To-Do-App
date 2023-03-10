
/*---------------------------------------------------------------*/

const url = window.location.href;
let baseUrl = "";

if (url.split(":")[0] === 'https') {
    baseUrl = 'https://pwatodoapp.cyclic.app/';
} else {
    baseUrl = 'http://localhost:5001';
}


/*---------------------------------------------------------------*/


let getAllTodos = () => {
    axios.get(`${baseUrl}/todos`)
        .then(function (response) {
            // handle success
            console.log("response is success");
            console.log(response.data.data);
            document.querySelector(".todoContainer").innerHTML = null ?? ""

            response?.data?.data.map((eachTodo, index) => {
                document.querySelector(".todoContainer").innerHTML +=
                    `
                    <div class="todo">
                        <div class="row">
                            <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10 col-xxl-10">
                                <label for="" id="lblTodo">
                                ${eachTodo.todo}
                                </label>
                            </div>
                            <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2 del-img del-img-sm">
                                <button class="btn-del" onclick="deleteTodo('${eachTodo._id}')">
                                    <img src="img/delete.png" alt="">
                                </button>
                            </div>
                        </div>
                    </div>
                    `
            })
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}


let addTodo = () => {

    let todo = document.querySelector("#txtTodo").value

    axios.post(`${baseUrl}/todo`, {
        todo: todo
    })
        .then(function (response) {
            // handle success
            console.log("response is success");
            console.log(response.data);

            document.querySelector("#todoError").innerHTML = response.data.message;

            getAllTodos();
            document.querySelector("#txtTodo").value = "";

        })
        .catch(function (error) {
            // handle error
            console.log(error);
            document.querySelector("#todoError").innerHTML = error.message;
        })

}


let deleteTodo = (id) => {

    axios.delete(`${baseUrl}/todo/${id}`)
        .then(function (response) {
            // handle success
            console.log("response is success");
            console.log(response.data);

            document.querySelector("#todoError").innerHTML = response.data.message;
            getAllTodos();

        })
        .catch(function (error) {
            // handle error
            console.log(error.message);
            document.querySelector("#todoError").innerHTML = error.data.message;
        })
}

getAllTodos();