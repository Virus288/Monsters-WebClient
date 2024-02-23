import {create} from "zustand";



type CounterStore= {
count:number;
increment:()=>void;
decrement:()=>void;
incrementAsync:()=>Promise<void>;
}

type IUser ={
   login:string ;
   id:string ;
}

type IAccountStore= {
   account:object| undefined;
   setAccount:(data:IUser)=>void;

   }

   export enum EUserRace {
      Human = 'human',
      Elf = 'elf',
      Goblin = 'goblin',
      Dwarf = 'dwarf',
      Orc = 'orc',
      Fairy = 'fairy',
      DragonBord = 'dragonBorn',
    }
    

    type ProfileStore= {
      profile:IUserProfile |undefined;
      setProfile:(profile:IUserProfile)=>void;

      }

   export interface IUserProfile {
      _id: string;
      user: string;
      race: EUserRace;
      friends: string[];
      lvl: number;
      exp: number[];
      initialized: boolean;
      inventory: string;
      party: string;
    }
    







export const useCounterStore = create<CounterStore>((set)=>({
count:0,
increment:()=>{
    set((state)=>({count:state.count+1}))
},
incrementAsync: async()=>{
await new Promise((resolve)=>setTimeout(resolve,1000))
set((state)=>({count:state.count+1}))
},
    
decrement:()=>{
    set((state)=>({count:state.count-1}))
},
}))


export const useAccountStore = create<IAccountStore>((set)=>({
account:undefined,
setAccount:(user)=>{
   set({account:user})
}

    }))
    
    export const useLogsStore= create((set)=>({
        logs:[],
        setLogs:(logs)=>{
         set({logs:logs})
        }

     }))
     export const useProfileStore = create<ProfileStore>((set)=>({
        profile:undefined,
        setProfile:(profile)=>{
         set({profile})
        }
            }))

 export const useStaticsStore= create(()=>({
    statics:[]
 }))

 export const useMessagesStore= create(()=>({
    messages:[]
 }))

 export const useWebsocketStore= create(()=>({
    websocket:null
 }))

 export const useHistoryStore= create(()=>({
    history:['start']
 }))