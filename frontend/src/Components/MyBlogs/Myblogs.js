import React from 'react'
import BodyOfBlogs from '../BodyOfBlogs/BodyOfBlogs'
import Header from '../Header/Header'
import News from '../News/News'
import BodyOfPrivateBlogs from '../BodyOfPrivateBlogs/BodyOfPrivateBlogs'

function MyBlogs() {
  return (
    <div style={{backgroundColor:"#000", minHeight: "100vh"}}>
      <Header isMyBlogsActive={true} />
    <BodyOfPrivateBlogs/>
    </div>
  )
}

export default MyBlogs