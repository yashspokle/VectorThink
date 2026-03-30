'use client'

import { useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import styles from './page.module.css'

const QUESTIONS = [
  {
    q: 'What is the time complexity of binary search?',
    options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
    answer: 1,
    topic: 'Algorithms'
  },
  {
    q: 'Which data structure uses LIFO order?',
    options: ['Queue', 'Array', 'Stack', 'Linked List'],
    answer: 2,
    topic: 'Data Structures'
  },
  {
    q: 'What does CPU scheduling decide?',
    options: ['Memory allocation', 'Which process runs next', 'File permissions', 'Network routing'],
    answer: 1,
    topic: 'OS Concepts'
  },
  {
    q: 'What is a foreign key in DBMS?',
    options: ['A primary key in another table', 'An encrypted key', 'A unique index', 'A composite key'],
    answer: 0,
    topic: 'DBMS'
  },
]

export default function QuizPage() {
  const [current, setCurrent]   = useState(0)       // which question we're on
  const [selected, setSelected] = useState(null)     // which option user picked
  const [score, setScore]       = useState(0)        // total correct
  const [finished, setFinished] = useState(false)    // quiz done?
  const [answers, setAnswers]   = useState([])       // track all answers

  const q = QUESTIONS[current]

  // Called when user clicks an option
  function handleSelect(idx) {
    if (selected !== null) return // already answered this question
    setSelected(idx)
    if (idx === q.answer) setScore(s => s + 1)
    setAnswers(prev => [...prev, { question: q.q, picked: idx, correct: q.answer }])
  }

  // Move to next question or finish
  function handleNext() {
    if (current + 1 >= QUESTIONS.length) {
      setFinished(true)
    } else {
      setCurrent(c => c + 1)
      setSelected(null)
    }
  }

  // Reset everything
  function handleRestart() {
    setCurrent(0); setSelected(null); setScore(0); setFinished(false); setAnswers([])
  }

  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>

        <div className={styles.header}>
          <h1 className={styles.title}>Quiz</h1>
          <p className={styles.sub}>Test your knowledge — VT picks questions based on your weak spots.</p>
        </div>

        {!finished ? (
          <div className={styles.quizCard}>

            {/* Progress bar across top */}
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: `${((current) / QUESTIONS.length) * 100}%` }} />
            </div>

            {/* Question meta */}
            <div className={styles.meta}>
              <span className={styles.topic}>{q.topic}</span>
              <span className={styles.counter}>{current + 1} / {QUESTIONS.length}</span>
            </div>

            {/* Question text */}
            <div className={styles.question}>{q.q}</div>

            {/* Options */}
            <div className={styles.options}>
              {q.options.map((opt, i) => {
                // Determine style: default, correct, wrong
                let optClass = styles.option
                if (selected !== null) {
                  if (i === q.answer)          optClass = `${styles.option} ${styles.correct}`
                  else if (i === selected)     optClass = `${styles.option} ${styles.wrong}`
                }
                return (
                  <button key={i} className={optClass} onClick={() => handleSelect(i)}>
                    <span className={styles.optLetter}>{['A','B','C','D'][i]}</span>
                    {opt}
                  </button>
                )
              })}
            </div>

            {/* Next button — only shows after answering */}
            {selected !== null && (
              <button className={styles.nextBtn} onClick={handleNext}>
                {current + 1 >= QUESTIONS.length ? 'See results' : 'Next question'} →
              </button>
            )}

          </div>
        ) : (
          // Results screen
          <div className={styles.results}>
            <div className={styles.scoreCircle}>
              <span className={styles.scoreNum}>{score}/{QUESTIONS.length}</span>
              <span className={styles.scoreLabel}>correct</span>
            </div>
            <div className={styles.resultMsg}>
              {score === QUESTIONS.length ? 'Perfect score.' : score >= QUESTIONS.length / 2 ? 'Good effort.' : 'Keep practicing.'}
            </div>
            <button className={styles.restartBtn} onClick={handleRestart}>Retry quiz</button>
          </div>
        )}

      </main>
    </div>
  )
}