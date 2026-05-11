import React,{useState} from 'react'

const colors = ['#FFF2A8','#FFCBA4','#C8F7C5','#B5DEFF','#FFBCD9','#E8D5FF']
const App = () => {

  const [editIndex, setEditIndex] = useState(null)
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')

  const [tasks, setTasks] = useState([])

  const submitHandler = (e) => {
    console.log('title:', title)
    console.log('details:', details)
    e.preventDefault()

    const newTask = { title, details,color: colors[tasks.length % colors.length],ts:new Date() }
    if (editIndex !== null) {

  const updatedTasks = [...tasks]

  updatedTasks[editIndex] = {
    ...updatedTasks[editIndex],
    title,
    details
  }

  setTasks(updatedTasks)
  setEditIndex(null)

} else {

  setTasks([...tasks, newTask])
}
    setTitle('')
    setDetails('')
  }

  const deleteHandler = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index)
    setTasks(newTasks)
  }

  return (
    <div className='h-screen lg:flex  bg-black text-white  '>
      <form onSubmit={(e) => {
        submitHandler(e)
      }} className='flex gap-4 lg:w-1/2  items-start flex-col p-10'>
         <h1 className='text-3xl font-bold'>Add notes</h1>

        <input type='text'
        placeholder='Note heading...' 
        className='border-2 px-5 py-2 rounded w-full outline-none font-medium'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        />
        
        <textarea 
          className='px-5 w-full h-32 py-2 flex items-start flex-row border-2 rounded outline-none font-medium'
          placeholder='Write details...'
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        <button className='bg-white active:bg-gray-300 scale-95 w-full   text-black px-5 py-2 w-full rounded outline-none font-medium'>+ Add note
        </button>
      </form>

      <div className=' lg:w-1/2  lg:border-l-2 p-10'>
        <h1 className='text-3xl font-bold'>Recent Notes</h1>
        <div className='flex flex-wrap gap-4 mt-5 h-full overflow-auto'>
          {tasks.map((task, index) => (
            <div key={index} onClick={()=>{
              setTitle(task.title)
              setDetails(task.details)
              setEditIndex(index)
            }}
             className='relative h-52 w-40 rounded-3xl bg-white text-black p-4 flex flex-col justify-between' style={{ backgroundColor: task.color }}>

              <button onClick={(e) => {
                e.stopPropagation();
                deleteHandler(index);
              }} className='absolute top-3 right-3 text-sm font-bold cursor-pointer active:scale-90 hover:text-gray-700 transition-all duration-200 bg-red-400 border-2 border-gray-700 rounded-full w-6 h-6 flex items-center justify-center'>
                X
              </button>

              <div className='overflow-y-auto break-words scrollbar-hide'>
                <h2 className='leading-tight text-xl font-bold mb-2'>{task.title}</h2>

                <p className='mt-3 leading-tight  font-medium text-gray-600'>{task.details}</p>
              </div>
              <p className='text-xs text-gray-700 whitespace-nowrap'>{task.ts.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})} · {task.ts.toLocaleDateString([],{month:'short',day:'numeric'})}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
