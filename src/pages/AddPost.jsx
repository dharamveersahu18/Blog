import React, {useState,useEffect} from 'react'
import { Container, PostForm } from '../component'

function AddPost() {

  return (
    <div className='py-25'>
      <Container >
        <PostForm />
      </Container>
    </div>
  )
}

export default AddPost