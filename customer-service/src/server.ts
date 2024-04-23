import App from "./app";
import IndexRoute from "@routes/index.route";
import UserRoute from "@routes/user.route";
import TodosRoute from "@routes/todos.route";


const app = new App([
    new IndexRoute(),
    new UserRoute(),
    new TodosRoute()
]);


app.listen();