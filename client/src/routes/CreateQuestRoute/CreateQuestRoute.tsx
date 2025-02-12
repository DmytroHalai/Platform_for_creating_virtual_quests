import React, { useState } from 'react';
import { FiUpload, FiPlus, FiCheck, FiX } from 'react-icons/fi';
import './CreateQuestRoute.css';
import service from '../../services/service';
import API from '../../services/api';

interface Task {
  id: number;
  image: string | null;
  type: string;
  description: string;
}

interface Answer {
  id: number;
  text: string;
  isCorrect: boolean;
}

export enum QuestionType {
  Open = 'Open answer',
  Test = 'Test',
  Find = 'Find object',
}

export enum QuestCategory {
  ADVENTURE = 'adventure',
  HORROR = 'horror',
  MYSTERY = 'mystery',
  SCI_FI = 'sci-fi',
  FANTASY = 'fantasy',
  HISTORICAL = 'historical',
  DETECTIVE = 'detective',
  SURVIVAL = 'survival',
  ESCAPE_ROOM = 'escape-room',
  POST_APOCALYPTIC = 'post-apocalyptic',
  STEAMPUNK = 'steampunk',
  CYBERPUNK = 'cyberpunk',
  SUPERNATURAL = 'supernatural',
  THRILLER = 'thriller',
  WESTERN = 'western',
  MEDIEVAL = 'medieval',
  SPACE = 'space',
  PIRATE = 'pirate',
  COMEDY = 'comedy',
  WAR = 'war',
}

export default function CreateQuestRoute() {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [questImage, setQuestImage] = useState<any>(null);
  const [tasks, setTasks] = useState<any>([
    { id: 1, media: null, question_type: '', description: '', answers: [] },
  ]);
  const [answers, setAnswers] = useState<any>([
    { id: 1, answer: '', is_correct: false },
  ]);
  const [currentTask, setCurrentTask] = useState(1);
  const [taskFiles, setTaskFiles] = useState([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setQuestImage(file);
  };
  const handleTaskFileChange = (event, index) => {
    const newFiles = [...taskFiles];
    newFiles[index] = event.target.files[0];
    setTaskFiles(newFiles);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('title', title);
    formData.append('time', time);
    formData.append('category', category);
    formData.append('description', description);

    if (questImage) {
      formData.append('photo', questImage);
    }

    tasks.forEach((task, index) => {
      formData.append(`tasks[${index}][description]`, 'qqq');
      formData.append(`tasks[${index}][question_type]`, QuestionType.Test);
      task.type;

      if (task.image) {
        formData.append(`tasks[${index}][media]`, task.image);
      }

      task.answers?.forEach((answer, answerIndex) => {
        formData.append(
          `tasks[${index}][answers][${answerIndex}][answer]`,
          answer.answer
        );
        formData.append(
          `tasks[${index}][answers][${answerIndex}][is_correct]`,
          String(answer.is_correct)
        );
      });
    });

    // try {
    //   await service.post('/quests/create', formData)
    //   console.log('Quest created successfully');
    // } catch (err) {
    //   console.error('Failed to create quest:', err);
    // }
    formData.forEach((value, key) => {
      console.log(value, key);
    });
    try {
      // Замінити на реальний запит
      await fetch(`${API}/quests/create`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
    } catch (err) {
      console.error('Failed to create quest:', err);
    }
    // try {
    //   await dispatch(createQuest(questData)).unwrap()
    //   // Reset form or redirect after successful creation
    // } catch (err) {
    //   console.error("Failed to create quest:", err)
    // }
  };

  const addTask = () => {
    const newTask = {
      id: tasks.length + 1,
      media: null,
      question_type: '',
      description: '',
      answers: [],
    };
    setTasks([...tasks, newTask]);
  };

  const addAnswer = () => {
    const newAnswer = {
      id: answers.length + 1,
      answer: '',
      is_correct: false,
    };
    setAnswers([...answers, newAnswer]);
  };

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
              <label
                htmlFor="quest-image"
                className="create-quest__image-label"
              >
                {questImage ? (
                  <img
                    src={questImage || '/placeholder.svg'}
                    alt="Quest preview"
                  />
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

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="create-quest__select"
                >
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
                  className={`task-nav__button ${
                    currentTask === task.id ? 'active' : ''
                  }`}
                >
                  {task.id}
                </button>
              ))}
              <button type="button" onClick={addTask} className="task-nav__add">
                <FiPlus />
              </button>
            </div>

            {tasks.map((task, index) => (
              <div
                key={task.id}
                className={`task ${currentTask === task.id ? 'active' : ''}`}
              >
                <h3 className="task__title">Task {task.id}</h3>
                <div className="task__content">
                  <div className="task__image-upload">
                    <input
                      type="file"
                      id={`task-image-${task.id}`}
                      accept="image/*"
                      className="task__image-input"
                      onChange={(e) => handleTaskFileChange(e, index)}
                    />
                    <label
                      htmlFor={`task-image-${task.id}`}
                      className="task__image-label"
                    >
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

                    <textarea
                      placeholder="ENTER DESCRIPTION FOR YOUR TASK"
                      className="task__textarea"
                    />
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
                    setAnswers(
                      answers.map((a) =>
                        a.id === answer.id
                          ? { ...a, isCorrect: !a.isCorrect }
                          : a
                      )
                    );
                  }}
                  className={`answer__status ${
                    answer.isCorrect ? 'correct' : ''
                  }`}
                >
                  {answer.isCorrect ? <FiCheck /> : <FiX />}
                </button>
                <input
                  type="text"
                  placeholder="ENTER TITLE FOR YOUR QUEST"
                  className="answer__input"
                  value={answer.text}
                  onChange={(e) => {
                    setAnswers(
                      answers.map((a) =>
                        a.id === answer.id ? { ...a, text: e.target.value } : a
                      )
                    );
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
  );
}

