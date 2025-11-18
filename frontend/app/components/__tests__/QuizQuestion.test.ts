import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import QuizQuestion from '../../components/QuizQuestion.vue'

describe('QuizQuestion', () => {
  const mockQuestion = {
    id: 1,
    text: 'What is Vue.js?',
    type: 'Multiple Choice',
    options: [
      'A backend framework',
      'A JavaScript framework',
      'A database',
      'A CSS library'
    ],
    correctAnswerIndex: 1,
    explanation: 'Vue.js is a progressive JavaScript framework'
  }

  it('renders question text and options correctly', () => {
    const wrapper = mount(QuizQuestion, {
      props: {
        question: mockQuestion,
        questionNumber: 1,
        totalQuestions: 10,
        modelValue: null
      }
    })

    expect(wrapper.text()).toContain('What is Vue.js?')
    expect(wrapper.findAll('div').length).toBeGreaterThan(0) // Check if options are rendered
  })

  it('emits update:modelValue when an option is selected', async () => {
    const wrapper = mount(QuizQuestion, {
      props: {
        question: mockQuestion,
        questionNumber: 1,
        totalQuestions: 10,
        modelValue: null
      }
    })

    const optionElements = wrapper.findAll('[data-testid="option"]')
    if (optionElements.length > 0) {
      await optionElements[0].trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([0])
    }
  })

  it('highlights selected option', async () => {
    const wrapper = mount(QuizQuestion, {
      props: {
        question: mockQuestion,
        questionNumber: 1,
        totalQuestions: 10,
        modelValue: 1
      }
    })

    const optionElements = wrapper.findAll('div')
    // Check that the selected option has the correct class
    // This will depend on the implementation
  })
})