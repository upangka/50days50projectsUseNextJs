export interface Question {
  question: string
  a: string
  b: string
  c: string
  d: string
  correct: string
}

export const quizData = [
  {
    question: 'React 是由哪家公司开发的？',
    a: 'Google',
    b: 'Facebook',
    c: 'Microsoft',
    d: 'Apple',
    correct: 'b'
  },
  {
    question: 'Next.js 是基于哪个框架构建的？',
    a: 'Angular',
    b: 'React',
    c: 'Vue',
    d: 'Svelte',
    correct: 'b'
  },
  {
    question: 'TypeScript 是哪个公司维护的？',
    a: 'Facebook',
    b: 'Google',
    c: 'Microsoft',
    d: 'Amazon',
    correct: 'c'
  },
  {
    question: 'Node.js 是基于哪个 JavaScript 引擎构建的？',
    a: 'SpiderMonkey',
    b: 'V8',
    c: 'JavaScriptCore',
    d: 'Chakra',
    correct: 'b'
  }
]
