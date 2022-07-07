import React from 'react'
import {Grid,TextField ,InputAdornment,IconButton} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'

const Input = ({half,name,label,handleChange,autoFocus,type,handleShowPassword}) => {
  return (
    <Grid item xs={12} sm={half?6:12}>
        <TextField
            name={name}
            label={label}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            autoFocus={autoFocus}
            type={type}
            InputProps={name==="password"? {
                endAdornment:(
                    <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                        {type==="password"? <VisibilityOff/>:<Visibility/>}
                    </IconButton>
                    </InputAdornment>
                )
            }:null}

        
         />
    </Grid>
  )
}

export default Input
