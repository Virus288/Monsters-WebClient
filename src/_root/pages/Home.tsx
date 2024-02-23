import { Terminal } from "../../components/Terminal"


const Home = ({history,ref,promptLabel,commands,komendy}) => {
  return (
    <div className="bg-orange-600 h-full w-full flex justify-center">

      <Terminal history={history} ref={ref} promptLabel={promptLabel} commands={commands}  />
    </div>
  )
}

export default Home