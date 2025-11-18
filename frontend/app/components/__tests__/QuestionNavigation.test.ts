import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import QuestionNavigation from '../../components/QuestionNavigation.vue'

describe('QuestionNavigation', () => {
  it('renders the correct number of question buttons', () => {
    const wrapper = mount(QuestionNavigation, {
      props: {
        currentQuestion: 1,
        totalQuestions: 5,
        answers: {}
      }
    })

    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(5)
  })

  it('highlights the current question button', () => {
    const wrapper = mount(QuestionNavigation, {
      props: {
        currentQuestion: 3,
        totalQuestions: 5,
        answers: {}
      }
    })

    const buttons = wrapper.findAll('button')
    expect(buttons[2].classes()).toContain('from-indigo-600') // Current question (index 2 for question 3)
    expect(buttons[0].classes()).not.toContain('from-indigo-600') // Not the current question
  })

  it('highlights answered questions', () => {
    const answers = { 0: 1, 2: 0 } // Questions 1 and 3 are answered
    const wrapper = mount(QuestionNavigation, {
      props: {
        currentQuestion: 1,
        totalQuestions: 5,
        answers
      }
    })

    const buttons = wrapper.findAll('button')
    // Question 1 (index 0) should be highlighted as answered
    expect(buttons[0].classes()).toContain('from-green-400')
    // Question 3 (index 2) should be highlighted as answered
    expect(buttons[2].classes()).toContain('from-green-400')
    // Question 2 (index 1) should not be highlighted as answered
    expect(buttons[1].classes()).not.toContain('from-green-400')
  })

  it('emits navigate-to-question event when a button is clicked', async () => {
    const wrapper = mount(QuestionNavigation, {
      props: {
        currentQuestion: 1,
        totalQuestions: 5,
        answers: {}
      }
    })

    const buttons = wrapper.findAll('button')
    await buttons[2].trigger('click') // Click on the third question button
    
    expect(wrapper.emitted('navigate-to-question')).toBeTruthy()
    expect(wrapper.emitted('navigate-to-question')![0]).toEqual([2]) // Should emit index 2
  })
})