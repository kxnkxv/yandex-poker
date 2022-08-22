import { Slider, styled } from '@mui/material'
import { SliderProps } from '@mui/material/Slider'

const BetSlider = styled(Slider)<SliderProps>(() => {
  return {
    color: '#5B5BA8',
    '& .MuiSlider-thumb': {
      '&:hover, &.Mui-focusVisible': {},
      '&.Mui-active': {},
    },
  }
})

export default BetSlider
