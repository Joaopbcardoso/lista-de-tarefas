import './App.css'
import React, {useCallback, useEffect, useReducer, useState} from 'react'

const taskReducer = (state, action) =>{
  switch(action.type){
    case'ADD_TAREFA':
    return[...state, action.payload] //payload é o novo valor da tarefa que está sendo adicionada
    case 'CONCLUIDO':
      const atualizarTarefa = [...state]
      atualizarTarefa[action.payload].completed = true
      return atualizarTarefa
    case 'DELETAR':
      return state.filter((_, index)=> index !== action.payload)
      default:
        return state;
  }

}

function App() {
  const[tarefa, setTarefa]= useState('')

  const[tarefaAtual, dispatch] = useReducer(taskReducer, [])
  //dispatch - funcao ultilizada para despachar as ações do useReducer execultar

  useEffect(()=>{
    const armazenarTarefa = JSON.parse(localStorage.getItem('TarefaAtual'))
  }, [])

  useEffect(()=>{
    localStorage.setItem('tarefaAtual', JSON.stringify(tarefaAtual))
  })
  //buscando nossa tarefa

  const addTarefa = useCallback(()=>{
    //Usando o use Callback para que as tarefas permaneçam as mesmas entre as renderizações
    if(tarefa.trim() !== ''){
      dispatch({type: 'ADD_TAREFA', payload: {text: tarefa, completed: false}})
      setTarefa('')
    }
  }, [tarefa])

  const concluirTarefa = useCallback((index) => {
    dispatch({type: 'CONCLUIDO', payload: index})
 })

  const excluirTarefa = useCallback((index) =>{
    dispatch({type: 'DELETAR', payload: index})
  })


  return (
    <>
      <div className='body'>
        <div className="center">
          <div className='titulo'>
            <h1>Lista de Tarefas </h1>
            <img id='logo-h1' src="check-logo.png" alt="" />
          </div>
          <div className="input">
            <input className='input-lista' type="text" 
            placeholder='Nova Tarefa'
            value={tarefa}
            onChange={(e)=> setTarefa(e.target.value)}/>
            <button className='add' onClick={addTarefa}>Adicionar</button>
          </div>
          <ul>
            {/* d */}
            {tarefaAtual.map((tarefas, index)=>(
              <li key={index} className='itens'>
                <span style={{textDecoration: tarefas.completed ? 'line-through': 'none'}}>
                  {tarefas.text}
                </span>
                {
                  // verificar se tem tarefa
                  !tarefaAtual.completed && (
                    <>
                    <div>
                      <button className='concluir' onClick={()=>concluirTarefa(index)}><svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#FFFFFF"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg></button>

                      <button className='excluir' onClick={()=>excluirTarefa(index)}><svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#FFFFFF"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
                    </div>
                    </>
                  )
                }
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default App
