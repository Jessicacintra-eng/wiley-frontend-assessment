import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import mockStore from '../../mocks/mockStore'
import CategoryFilter from './CategoryFilter'

describe('CategoryFilter', () => {
  

  test('renders filter buttons correctly', () => {
    render(
      <Provider store={mockStore}>
        <CategoryFilter />
      </Provider>
    )
    
    expect(screen.getByText('Filter')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Filter' })).toBeInTheDocument()
  })

})
