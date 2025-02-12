import { useState, useEffect, useCallback, useRef } from "react"
import { useParams } from "react-router-dom"
import type { Task, Answer, ImageClickArea } from "../../types/questItem.ts"
import "./UserQuestItemRoute.css"

interface Answer {
  id: number
  text: string
  isCorrect: boolean
}

interface Task {
  id: number
  question: string
  image: string
  answers?: Answer[]
  type: "multiple-choice" | "text" | "image-click"
  userAnswer?: number | string
  correctText?: string
  clickAreas?: ImageClickArea[]
}

// Mock data - replace with API call
const mockQuest = {
  id: 1,
  title: "ARE YOU SURE YOU KNOW ANIMALS?",
  time: "20 MINUTES",
  category: "NATURE",
  description: "THIS TEST IS ABOUT ANIMALS LSLSLSLSLSLSLSLSLSLS",
  image: "https://picsum.photos/800/400?random=1",
  tasks: [
    {
      id: 1,
      question: "WHAT ANIMAL IS THAT?",
      image: "https://picsum.photos/800/400?random=2",
      type: "multiple-choice",
      answers: [
        { id: 1, text: "BEAR", isCorrect: false },
        { id: 2, text: "SNAKE", isCorrect: true },
        { id: 3, text: "WOLF", isCorrect: false },
        { id: 4, text: "DOG", isCorrect: false },
      ],
    },
    {
      id: 2,
      question: "DESCRIBE THIS ANIMAL'S HABITAT",
      image: "https://picsum.photos/800/400?random=3",
      type: "text",
      correctText: "Forest",
    },
    {
      id: 3,
      question: "CLICK ON THE BIRD IN THIS IMAGE",
      image: "https://picsum.photos/800/400?random=4",
      type: "image-click",
      clickAreas: [
        { id: 1, x: 100, y: 100, width: 50, height: 50, isTarget: true },
        { id: 2, x: 200, y: 200, width: 50, height: 50, isTarget: false },
      ],
    },
  ],
}

const UserQuestItemRoute = () => {
  const { userQuestId } = useParams()
  const [currentTask, setCurrentTask] = useState(0)
  const [timeLeft, setTimeLeft] = useState(1200)
  const [showEnlargedImage, setShowEnlargedImage] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [textAnswer, setTextAnswer] = useState("")
  const [clickPosition, setClickPosition] = useState<{ x: number; y: number } | null>(null)
  const [tasks, setTasks] = useState(mockQuest.tasks)
  const [isAnswered, setIsAnswered] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleTaskChange = (taskNumber: number) => {
    setCurrentTask(taskNumber - 1)
    setSelectedAnswer(null)
    setTextAnswer("")
    setClickPosition(null)
    setIsAnswered(false)
  }

  const handleAnswerSelect = (answerId: number) => {
    if (!isAnswered) {
      setSelectedAnswer(answerId)
      setIsAnswered(true)
      const currentTaskData = tasks[currentTask]
      if (currentTaskData.type === "multiple-choice" && currentTaskData.answers) {
        const isCorrect = currentTaskData.answers.find(a => a.id === answerId)?.isCorrect || false
        // Here you would typically send the answer to your backend
        console.log(`Answer submitted: ${answerId}, isCorrect: ${isCorrect}`)
      }
    }
  }

  const handleTextSubmit = () => {
    if (textAnswer.trim() && !isAnswered) {
      setIsAnswered(true)
      const currentTaskData = tasks[currentTask]
      const isCorrect = textAnswer.toLowerCase() === currentTaskData.correctText?.toLowerCase()
      // Here you would typically send the answer to your backend
      console.log(`Text answer submitted: ${textAnswer}, isCorrect: ${isCorrect}`)
    }
  }

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    if (!isAnswered && imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      setClickPosition({ x, y })
      setIsAnswered(true)

      const currentTaskData = tasks[currentTask]
      if (currentTaskData.type === "image-click" && currentTaskData.clickAreas) {
        const clickedArea = currentTaskData.clickAreas.find(area =>
          x >= area.x && x <= area.x + area.width &&
          y >= area.y && y <= area.y + area.height
        )
        const isCorrect = clickedArea?.isTarget || false
        // Here you would typically send the answer to your backend
        console.log(`Image clicked at (${x}, ${y}), isCorrect: ${isCorrect}`)
      }
    }
  }

  const handleNextTask = () => {
    if (currentTask < tasks.length - 1) {
      setCurrentTask(prev => prev + 1)
      setSelectedAnswer(null)
      setTextAnswer("")
      setClickPosition(null)
      setIsAnswered(false)
    }
  }

  const handleFinish = () => {
    // Here you would typically send all answers to your backend
    console.log("Quest finished")
  }

  const task = tasks[currentTask]

  return (
    <div className="user-quest">
      <div className="user-quest__header">
        <span className="user-quest__section-title">►QUEST</span>
        <span className="user-quest__timer">{formatTime(timeLeft)}</span>
      </div>

      <div className="user-quest__main">
        <div className="user-quest__quest-info">
          <div className="user-quest__image-container" onClick={() => setShowEnlargedImage(true)}>
            <img src={mockQuest.image || "/placeholder.svg"} alt={mockQuest.title} className="user-quest__image" />
          </div>
          <div className="user-quest__details">
            <h1 className="user-quest__title">{mockQuest.title}</h1>
            <div className="user-quest__meta">
              <span className="user-quest__time">TIME: {mockQuest.time}</span>
              <span className="user-quest__category">CATEGORY: {mockQuest.category}</span>
            </div>
            <p className="user-quest__description">{mockQuest.description}</p>
          </div>
        </div>

        <div className="user-quest__task-nav">
          {tasks.map((_, index) => (
            <button
              key={index + 1}
              className={`task-nav__button ${currentTask === index ? "active" : ""} ${
                tasks[index].userAnswer ? "answered" : ""
              }`}
              onClick={() => handleTaskChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <div className="user-quest__task">
          <span className="user-quest__section-title">►Task {currentTask + 1}</span>
          <div className="task__content">
            <div
              className={`task__image-container ${task.type === "image-click" ? "clickable" : ""}`}
              onClick={task.type !== "image-click" ? () => setShowEnlargedImage(true) : undefined}
            >
              <img
                ref={imageRef}
                src={task.image || "/placeholder.svg"}
                alt={`Task ${currentTask + 1}`}
                className="task__image"
                onClick={task.type === "image-click" ? handleImageClick : undefined}
              />
              {task.type !== "image-click" && (
                <span className="task__image-hint">CLICK ON THE PICTURE TO MAKE IT BIGGER</span>
              )}
              {task.type === "image-click" && clickPosition && (
                <div
                  className="click-marker"
                  style={{
                    left: clickPosition.x,
                    top: clickPosition.y,
                  }}
                />
              )}
            </div>
            <div className="task__question">{task.question}</div>
          </div>
        </div>

        {task.type === "multiple-choice" && task.answers && (
          <div className="user-quest__answers">
            <span className="user-quest__section-title">►Answers</span>
            <div className="answers__grid">
              {task.answers.map((answer) => (
                <button
                  key={answer.id}
                  className={`answer-button ${selectedAnswer === answer.id ? "selected" : ""} ${
                    isAnswered && selectedAnswer === answer.id
                      ? answer.isCorrect
                        ? "correct"
                        : "incorrect"
                      : ""
                  }`}
                  onClick={() => handleAnswerSelect(answer.id)}
                  disabled={isAnswered}
                >
                  {answer.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {task.type === "text" && (
          <div className="user-quest__text-answer">
            <input
              type="text"
              value={textAnswer}
              onChange={(e) => setTextAnswer(e.target.value)}
              placeholder="ENTER YOUR ANSWER HERE"
              className="text-answer__input"
              disabled={isAnswered}
            />
            {!isAnswered && (
              <button
                className="user-quest__submit-btn"
                onClick={handleTextSubmit}
                disabled={!textAnswer.trim()}
              >
                Submit Answer
              </button>
            )}
          </div>
        )}

        {isAnswered && currentTask < tasks.length - 1 ? (
          <button className="user-quest__next-btn" onClick={handleNextTask}>
            Next Task
          </button>
        ) : isAnswered && currentTask === tasks.length - 1 ? (
          <button className="user-quest__finish-btn" onClick={handleFinish}>
            FINISH QUEST
          </button>
        ) : null}
      </div>

      {showEnlargedImage && task.type !== "image-click" && (
        <div className="enlarged-image__overlay" onClick={() => setShowEnlargedImage(false)}>
          <div className="enlarged-image__container">
            <img src={task.image || "/placeholder.svg"} alt={`Task ${currentTask + 1}`} className="enlarged-image" />
          </div>
        </div>
      )}
    </div>
  )
}

export default UserQuestItemRoute
