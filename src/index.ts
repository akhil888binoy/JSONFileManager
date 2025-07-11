


console.log("Enter an input ");
const args = process.argv.slice(2);
const Arg = args.find((arg) => arg.startsWith("--arg="));
const command = Arg ? Arg.split("=")[1] : "default";
console.log("Argument =", command);

if ( command == "add" ){

    console.log("Inside add");

}else if (command == "remove"){

        console.log("Inside remove");

}else if(command == "update"){
        console.log("Inside update");

}else if(command =="list"){
        console.log("Inside list");

}else {
    console.log("Enter a valid command");
}
