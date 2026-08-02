import React, {useState,useEffect} from 'react'
import { Container, PostForm } from '../component'

function AddPost() {

  return (
<div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0F172A] to-[#1E293B] py-10">
    <Container>
        <PostForm />
    </Container>
</div>
  )
}

export default AddPost