import React, { useEffect } from 'react';
import { useAccountStore, useProfileStore } from '../zustand/store';
import { useMutation, useQuery } from 'react-query';
import { initProfile } from '../gameApi/gameApi';




export const unnitializedProfile:React.FC = ()=>{
const userLogin = useAccountStore.getState().account?.login

  return(
    <div className='flex flex-col'>
      <span>
<span className='text-yellow-700 font-semibold'>Jessica</span> >> Welcome {userLogin} My name is Jessica. Welcome to our adventure guild. In order to register as an adventurer, I need you to provide me with some information.
      </span>
      <span className=''>
        First question is 'What your race ?
    
      </span>
    </div>
  );
};

export const start = () => {
  return (
    <div>
      <strong>Starting</strong> the server... <span style={{ color: 'green' }}>Done</span>
    </div>
  );
};

export const mycharacter = ()=>{


  const {data} = useProfileStore.getState().profile
 
  return(
    <div className='flex flex-col'>
    <span>Race:{data.race}</span>
    <span>Lvl:{data.lvl}</span>
    <span></span>
    </div>
  );
};


export const help: React.FC = () => {
  return (
    <div className="flex flex-col">
      <p className="font-semibold">For more information on a specific command, type HELP command-name</p>
      <span>- game init</span>
      <span>- start</span>
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

export const InvalidCommand: React.FC = () => {
  return (
    <div>
      <span className="text-rose-800">InvalidCommand</span>
    </div>
  );
};


export const initFight = ():Promise<void>=>{

} 

export const attack = ():Promise<void>=>{
  
} 
export const leaveFight = ():Promise<void>=>{
  
} 

export const races = ()=>{
return(
  <div className='flex flex-col'>
 
<span>Human</span>
<span>Elf</span>
<span>Goblin</span>
<span>Dwarf</span>
<span>Orc</span>
<span>Fairy</span>
<span>DragonBorn</span>
  </div>
)

}


export const confirmationWindow = () =>{

return (
<div className='flex'>
Human ....
</div>
)

}

export const confirmationSuccesWindow = () =>{

return (
<div className='flex'>
Race has been picked sucessfully.
</div>
)

}