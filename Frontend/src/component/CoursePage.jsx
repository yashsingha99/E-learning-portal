import React, { useEffect, useState } from 'react'
import FetchAllCourses from './fetchAllCourses'

function CoursePage() {
  return (
    <>
    <FetchAllCourses forCourses = {true}/>
    </>
  )
}

export default CoursePage