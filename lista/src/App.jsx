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

  return (
    <>
      <div className="center">
        <h1>Lista de Tarefas</h1>
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
            <li kay={index}>{tarefas.text}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
