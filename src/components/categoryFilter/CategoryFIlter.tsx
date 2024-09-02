import { FilterList } from '@mui/icons-material'
import { Box, Button, Checkbox, IconButton, Typography } from '@mui/joy'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterByCategory } from '../../store/productSlice'
import { AppDispatch, RootState } from '../../store/store'

const CategoryFilter = () => {
  const dispatch: AppDispatch = useDispatch()
  const { categories } = useSelector((state: RootState) => state.products)

  const [localSelectedCategories, setLocalSelectedCategories] = useState<string[]>(['all'])

  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const filterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    dispatch(filterByCategory(localSelectedCategories))
  }, [localSelectedCategories, dispatch])

  const handleCategoryChange = (category: string) => {
    setLocalSelectedCategories((prev) => {
      if (category === 'all') {
        return prev.includes('all')
          ? [...categories]  
          : ['all'] 
      } else {
        const updatedCategories = prev.includes(category)
          ? prev.filter((cat) => cat !== category)  
          : [...prev, category]                    

        if (updatedCategories.length > 0 && updatedCategories.includes('all')) {
          updatedCategories.splice(updatedCategories.indexOf('all'), 1)
        }

        if (updatedCategories.length === 0) {
          updatedCategories.push('all')
        }

        return updatedCategories
      }
    })
  }

  const toggleFilter = () => {
    setIsFilterOpen((prev) => !prev)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <Box sx={{ position: 'relative' }}>
      <Button
        startDecorator={<FilterList />}
        sx={{
          color: 'black',
          backgroundColor: 'white',
          boxShadow: '0.14vw solid grey',
          minHeight: '3.89vw',
          borderRadius: 0,
          display: { xs: 'none', sm: 'flex' },
        }}
        size="lg"
        onClick={toggleFilter}
      >
        Filter
      </Button>
      <IconButton
        sx={{
          borderRadius: 0,
          color: 'black',
          backgroundColor: 'white',
          boxShadow: '0.14vw solid grey',
          height: '2.78vw',
          minWidth: '3.19vw',
          display: { xs: 'flex', sm: 'none' },
        }}
        onClick={toggleFilter}
      >
        <FilterList />
      </IconButton>
      {isFilterOpen && (
        <Box
          ref={filterRef}
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            backgroundColor: 'white',
            boxShadow: '0px 0.28vw 0.42vw rgba(0, 0, 0, 0.1)',
            borderRadius: '0.28vw',
            padding: 2,
            zIndex: 10,
            width: '200px',
          }}
        >
          {categories.map((category) => (
            <Box key={category} sx={{ display: 'flex', alignItems: 'center', marginBottom: 1, gap: 2 }}>
              <Checkbox
                checked={localSelectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              <Typography>{category}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}

export default CategoryFilter
