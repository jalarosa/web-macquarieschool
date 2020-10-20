import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes";
import * as mustacheExpress from 'mustache-express';

class App {

    public app: express.Application = express();
    public routePrv: Routes = new Routes();

    constructor() {
        this.config();
        this.routePrv.routes(this.app);
    }

    private config(): void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // serving static files
        this.app.use(express.static('public'));
        this.app.set('views', `${__dirname}/views`);
        this.app.set('view engine', 'mustache');
        this.app.engine('mustache', mustacheExpress());
        this.app.use (bodyParser.urlencoded( {extended : true} ) );
    }

}

export default new App().app;