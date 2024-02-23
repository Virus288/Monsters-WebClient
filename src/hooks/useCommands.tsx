import { useCallback } from "react";
import { useTerminal } from "./useTerminal";

const useCommands = () => {
  const { pushToHistory, resetTerminal } = useTerminal();





  // return {help,test,test2}
};

export default useCommands;

export const start =  () => {
 return(
    <>
      <div>
        <strong>Starting</strong> the server...{" "}
        <span style={{ color: "green" }}>Done</span>
      </div>
    </>
  );
};


export const test = () => {
  return (
    <div className="flex flex-col">
      <p className="font-semibold">Here are all the commands you can use:</p>
      <span>-Test 1</span>
    </div>
  );
};
export const test2 = () => {
  return (
    <div className="flex flex-col">
      <p className="font-semibold">Here are all the commands you can use:</p>
      <span>-Test 2</span>
    </div>
  );
};


export const DescribeClasses=()=>{
return(
  <div>here are all classes</div>
)
}

 export const help = () => {
 return(
    <div className="flex flex-col">
      <p className="font-semibold">For more information on a specific command, type HELP command-name</p>
      <span>- game init</span>
      <span>- alert</span>
      <span>- races</span>
      <span>- profile</span>
      <span>- messages</span>
      <span>- messages</span>
      <span>- sendMsg</span>
      <span>- clear</span>
      <span>- exit</span>
    </div>
  );
};

const User= {
  username:"Adam",
  email:"adam@gmail.com",
  created:"11/11/2023",

}

export const alert = () => {

 return(
  <div>
  <strong>Alert</strong>
  <span style={{ color: "orange", marginLeft: 10 }}>
    <strong>Shown in the browser</strong>
  </span>
</div>
 )

};

export const clear= ()=>{
  return 
}


export const account = ()=>{

return(
  <div>
{Object.entries(User).map(([key,value])=>{
  return(
    <div className="flex gap-2">
      <div>
        {`${key.toLocaleUpperCase()}:`}
      </div>
      <div>
        {value}
      </div>
    </div>
  )
})}
  </div>
)

}

export const InvalidCommand = () => {
  return (
    <div>
      <span className="text-rose-800">InvalidCommand</span>
    </div>
  )
}

