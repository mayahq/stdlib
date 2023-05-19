import { OnMessageCallback } from '../../mayalabs-browser-control/deps.ts';
import {Symbol, TypedInput} from '../deps.ts';

type HTTPMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

type RequestSchema = {
    method: HTTPMethods;
    url: string;
    headers: Record<string, string>,
    body: Record<string, unknown>
}

class HttpRequest extends Symbol {
    static schema = {
        inputSchema:{},
        outputSchema: {},
        propertiesSchema:{
            httpVerb: new TypedInput({type: "str", allowedTypes:["str"], allowInput: true, defaultValue: "get", label: "HTTP Verb"}),
            url: new TypedInput({type: "str", allowedTypes:["str"], defaultValue: "", label: "URL", allowInput: true}),
            headers: new TypedInput({type: "json", allowedTypes:["json"], defaultValue: "{}", label: "Headers", allowInput: true}),
            body: new TypedInput({type: "json", allowedTypes: ["json"], defaultValue: "{}", label: "Body", allowInput: true})
        },
        editorProperties:{
            category: "stdlib",
            color: "green",
            icon: "",
            paletteLabel: "http-request"
        }
    }
    static description = "Function symbol to make HTTP Requests";
    static isConfig = false;
    static type = "http-request"

    onInit: Symbol['onInit'] = async (_callback) => {

    }
    
    onMessage: Symbol['onMessage'] = async (_msg: Record<string, any>, _vals: Record<string, any>, _callback: OnMessageCallback) => {
        // const url: string = _vals.url;
        // switch(_vals.httpVerb){
        //     case "get": {
        //         const requestObject: {
        //             method: 
        //         }:  
        //         const response: unknown = await fetch(url, head);
        //         _msg
        //         _msg.payload.response = response;
        //         break;
        //     }
        // }
    }
    
}

export default HttpRequest