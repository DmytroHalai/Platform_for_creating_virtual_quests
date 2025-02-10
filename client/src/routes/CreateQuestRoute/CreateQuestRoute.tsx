"use client"

import React, { useState } from "react"
import { FiUpload, FiPlus, FiCheck, FiX } from "react-icons/fi"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { createQuest } from "../../store/questSlice"
import "./CreateQuestRoute.css"

interface Task {
  id: number
  image: string | null
  type: string
  description: string
}

interface Answer {
  id: number
  text: string
  isCorrect: boolean
}

export default function CreateQuestRoute() {
  const dispatch = useAppDispatch()
  //const { loading, error } = useAppSelector((state) => state.quests)

  const [title, setTitle] = useState("")
  const [time, setTime] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [questImage, setQuestImage] = useState<string | null>(null)
  const [tasks, setTasks] = useState<Task[]>([{ id: 1, image: null, type: "", description: "" }])
  const [answers, setAnswers] = useState<Answer[]>([{ id: 1, text: "", isCorrect: false }])
  const [currentTask, setCurrentTask] = useState(1)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setQuestImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const questData = {
      title,
      time,
      category,
      description,
      image: questImage || "",
      tasks,
      answers,
    }

    // try {
    //   await dispatch(createQuest(questData)).unwrap()
    //   // Reset form or redirect after successful creation
    // } catch (err) {
    //   console.error("Failed to create quest:", err)
    // }
  }

  const addTask = () => {
    const newTask = {
      id: tasks.length + 1,
      image: null,
      type: "",
      description: "",
    }
    setTasks([...tasks, newTask])
  }

  const addAnswer = () => {
    const newAnswer = {
      id: answers.length + 1,
      text: "",
      isCorrect: false,
    }
    setAnswers([...answers, newAnswer])
  }

  return (
    <div className="create-quest">
      <div className="container">
        <form onSubmit={handleSubmit} className="create-quest__form">
          <h1 className="create-quest__title">Create Quest</h1>

          <div className="create-quest__main">
            <div className="create-quest__image-upload">
              <input
                type="file"
                id="quest-image"
                accept="image/*"
                onChange={handleImageUpload}
                className="create-quest__image-input"
              />
              <label htmlFor="quest-image" className="create-quest__image-label">
                {questImage ? (
                  <img src={questImage || "/placeholder.svg"} alt="Quest preview" />
                ) : (
                  <>
                    <FiUpload className="upload-icon" />
                    <span>UPLOAD</span>
                  </>
                )}
              </label>
            </div>

            <div className="create-quest__details">
              <input
                type="text"
                placeholder="ENTER TITLE FOR YOUR QUEST"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="create-quest__input"
              />

              <div className="create-quest__row">
                <input
                  type="text"
                  placeholder="ENTER TIME TO PASS YOUR QUEST"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="create-quest__input"
                />

                <select value={category} onChange={(e) => setCategory(e.target.value)} className="create-quest__select">
                  <option value="">SELECT YOUR QUEST CATEGORY</option>
                  <option value="adventure">Adventure</option>
                  <option value="puzzle">Puzzle</option>
                  <option value="educational">Educational</option>
                </select>
              </div>

              <textarea
                placeholder="ENTER DESCRIPTION FOR YOUR QUEST"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="create-quest__textarea"
              />
            </div>
          </div>

          <div className="create-quest__tasks">
            <div className="create-quest__task-nav">
              {tasks.map((task) => (
                <button
                  key={task.id}
                  type="button"
                  onClick={() => setCurrentTask(task.id)}
                  className={`task-nav__button ${currentTask === task.id ? "active" : ""}`}
                >
                  {task.id}
                </button>
              ))}
              <button type="button" onClick={addTask} className="task-nav__add">
                <FiPlus />
              </button>
            </div>

            {tasks.map((task) => (
              <div key={task.id} className={`task ${currentTask === task.id ? "active" : ""}`}>
                <h3 className="task__title">Task {task.id}</h3>
                <div className="task__content">
                  <div className="task__image-upload">
                    <input type="file" id={`task-image-${task.id}`} accept="image/*" className="task__image-input" />
                    <label htmlFor={`task-image-${task.id}`} className="task__image-label">
                      <FiUpload />
                      <span>UPLOAD</span>
                    </label>
                  </div>

                  <div className="task__details">
                    <select className="task__select">
                      <option value="">SELECT YOUR TASK TYPE</option>
                      <option value="text">Text Answer</option>
                      <option value="multiple">Multiple Choice</option>
                      <option value="photo">Photo Upload</option>
                    </select>

                    <textarea placeholder="ENTER DESCRIPTION FOR YOUR TASK" className="task__textarea" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="create-quest__answers">
            <h3 className="answers__title">Answers</h3>
            {answers.map((answer) => (
              <div key={answer.id} className="answer">
                <button
                  type="button"
                  onClick={() => {
                    setAnswers(answers.map((a) => (a.id === answer.id ? { ...a, isCorrect: !a.isCorrect } : a)))
                  }}
                  className={`answer__status ${answer.isCorrect ? "correct" : ""}`}
                >
                  {answer.isCorrect ? <FiCheck /> : <FiX />}
                </button>
                <input
                  type="text"
                  placeholder="ENTER TITLE FOR YOUR QUEST"
                  className="answer__input"
                  value={answer.text}
                  onChange={(e) => {
                    setAnswers(answers.map((a) => (a.id === answer.id ? { ...a, text: e.target.value } : a)))
                  }}
                />
              </div>
            ))}
            <button type="button" onClick={addAnswer} className="answers__add">
              <FiPlus />
            </button>
          </div>

          <button type="submit" className="create-quest__submit">
            FINISH CREATING
          </button>
        </form>
      </div>
    </div>
  )
}