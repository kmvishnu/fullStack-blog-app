import React from 'react'
import BodyOfBlogs from '../BodyOfBlogs/BodyOfBlogs'
import Header from '../Header/Header'
import News from '../News/News'

function Home() {
  return (
    <div style={{backgroundColor:"#000", minHeight: "100vh"}}>
    <Header/>
    <News/>
    <BodyOfBlogs/>
    </div>
  )
}

export default Home