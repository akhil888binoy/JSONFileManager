import fs from "fs";
import * as readline from 'readline';

const args = process.argv.slice(2);
const Arg = args.find((arg) => arg.startsWith("--arg="));
const namearg = args.find((arg) => arg.startsWith("--name="));
const agearg = args.find((arg) => arg.startsWith("--age="));
const sexarg = args.find((arg) => arg.startsWith("--sex="));
const removearg = args.find((arg) => arg.startsWith("--id="));
const command = Arg ? Arg.split("=")[1] : "default";
const name = namearg?namearg.split("=")[1] : "default";
const age = agearg?agearg.split("=")[1] : "default";
const sex = sexarg?sexarg.split("=")[1] : "default";
const removeid = removearg?removearg.split("=")[1] : "default";

console.log("Argument =", command);

interface Records<T , U>{
        key: T ;
        value : U;
}

interface Details{
        name:string ,
        age:number,
        sex: string
}

let id = 1;


if ( command == "add" ) {

        console.log("Inside add");

        let records: Records< number , Details> = {
                key : id ,
                value : {
                        name : name, 
                        age: Number(age),
                        sex: sex
                }
        };
        let userJson = JSON.stringify(records, null , 2);

        fs.writeFileSync('user.json', userJson , 'utf8');

        id++;

} else if (command == "remove") {

        const loadedConfig = fs.readFileSync('user.json', 'utf-8');
        console.log("Loaded", loadedConfig)
        const config = JSON.parse(loadedConfig) as Records<number, Details>;
        let record = JSON.stringify(config,null,2);

        console.log("removeid=", Number(removeid));
        console.log("ConfigKey=", config.key);

        if (config.key == Number(removeid)){
                console.log("item removed")
                fs.writeFileSync('user.json', "" , 'utf8');
        }


} else if(command == "update") {

        const loadedConfig = fs.readFileSync('user.json', 'utf-8');
        console.log("Loaded", loadedConfig)
        const config = JSON.parse(loadedConfig) as Records<number, Details>;
                        config.value.name = name;
                        config.value.age= Number(age);
                        config.value.sex= sex;

        let record = JSON.stringify(config,null,2);
        fs.writeFileSync('user.json', record , 'utf8');
        console.log("Inside update");

} else if(command =="list") {

        const loadedConfig = fs.readFileSync('user.json', 'utf-8');
        console.log("Loaded", loadedConfig)
        const config = JSON.parse(loadedConfig) as Records<number, Details>;
        console.log("Key=", config.key);


}else{
        console.log("Enter a valid command");
}
