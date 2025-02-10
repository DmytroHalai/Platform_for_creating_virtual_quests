export type QuestionType = "multiple-choice" | "text" | "image-click"

export interface Answer {
  id: number
  text: string
  isCorrect: boolean
}

export interface ImageClickArea {
  id: number
  x: number
  y: number
  width: number
  height: number
  isTarget: boolean
}

export interface Task {
  id: number
  question: string
  image: string
  type: QuestionType
  answers?: Answer[]
  correctText?: string
  clickAreas?: ImageClickArea[]
  userAnswer?: number | string | { x: number; y: number }
}
