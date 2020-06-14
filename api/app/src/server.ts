import "@tsed/mongoose";
import { ServerLoader, ServerSettings} from "@tsed/common";
import Path from "path"
import Express from "express";

@ServerSettings({
    rootDir: Path.resolve(__dirname),
    port: 3000,
    mongoose: [
        {
            id: "default",
            url: "mongodb://mongo:27017/default",
            connectionOptions: {}
        }
    ]
})
export class Server extends ServerLoader {

    public $onReady(){
        console.log("server started")
    }
    public $onServerInitError(err: any){
        console.error(err);
    } 
    public $beforeRoutesInit(): void | Promise<any> {
        this
            .use(Express.json())
            .use(Express.urlencoded({extended: true}))
    }
}