import React, { useState } from "react";
import axios from "axios";

export enum QuestionType {
  Open = "Open answer",
  Test = "Test",
  Find = "Find object",
}

export enum QuestCategory {
  SURVIVAL = "survival",
}

const QuestCreator = () => {
  const [quest, setQuest] = useState({
    title: "Танковый рай",
    photo: "",
    description: "Погрузись в мир танков",
    time: "60 минут",
    category: QuestCategory.SURVIVAL,
    tasks: [
      {
        media: "",
        description: "Как называется этот танк?",
        question_type: QuestionType.Open,
        answers: [
          { answer: "Т-34", is_correct: true },
          { answer: "Panzer IV", is_correct: false },
        ],
      },
      {
        media: "",
        description: "Какое слабое место у этого танка?",
        question_type: QuestionType.Test,
        answers: [
          { answer: "Лобовая броня", is_correct: false },
          { answer: "Борт", is_correct: true },
        ],
      },
    ],
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [taskFiles, setTaskFiles] = useState([]);

  // 📌 Обработчик выбора фото квеста
  const handlePhotoChange = (event) => {
    setPhotoFile(event.target.files[0]);
  };

  // 📌 Обработчик выбора медиафайлов для вопросов
  const handleTaskFileChange = (event, index) => {
    const newFiles = [...taskFiles];
    newFiles[index] = event.target.files[0];
    setTaskFiles(newFiles);
  };

  // 📌 Функция загрузки файлов
  const handleUpload = async () => {
    const formData = new FormData();

    formData.append("title", quest.title);
    formData.append("description", quest.description);
    formData.append("time", quest.time);
    formData.append("category", quest.category);
    formData.append("tasks", JSON.stringify(quest.tasks));

    if (photoFile) {
      formData.append("photo", photoFile);
    }

    taskFiles.forEach((file, index) => {
      if (file) {
        formData.append(`media[${index}]`, file);
      }
    });

    try {
      const response = await axios.post(
        "http://localhost:3000/quests/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // 🔹 Для отправки cookies
        }
      );

      console.log("Ответ сервера:", response.data);
      alert("Квест успешно создан!");
    } catch (error) {
      console.error("Ошибка загрузки", error);
      alert("Ошибка загрузки файла!");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Создание квеста</h1>

      {/* Фото квеста */}
      <label>Фото квеста:</label>
      <input type="file" onChange={handlePhotoChange} />

      {/* Медиафайлы для вопросов */}
      <h2>Медиа для вопросов</h2>
      {quest.tasks.map((task, index) => (
        <div key={index}>
          <p>
            Вопрос {index + 1}: {task.description}
          </p>
          <input type="file" onChange={(e) => handleTaskFileChange(e, index)} />
        </div>
      ))}

      <button onClick={handleUpload}>Создать квест</button>
    </div>
  );
};

export default QuestCreator;
