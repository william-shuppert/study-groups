import React, { useEffect } from 'react'
import Header from '../components/header/header'

const Home = () => {

  useEffect(() => {
    const buildVersion = '11/15/23-10:54'

    const clientVersion = localStorage.getItem('version')

    if (!clientVersion || clientVersion != buildVersion) { // reset local storage
      localStorage.setItem('version', buildVersion)

      localStorage.removeItem('users')
      localStorage.removeItem('groups')
    }
  })

  return (
    <div>
        <Header title="Home" />

        <h2>Objective</h2>

        <p>
          Academic pressure can come in the form of rigorous coursework, demanding assignments, and the constant pursuit of academic excellence. This can create an overwhelming environment for students. Concurrently, the absence of a solid social support system further intensifies these challenges. Navigating the intricacies of coursework becomes even more daunting when students lack a community to share experiences, seek advice, or collaborate on their academic journeys. This problem can have a large impact on a student’s overall well-being and academic success. Due to the importance of these social interactions, and their connections to us, as Miami University students, we have decided that there is a need to research potential systems that could simplify the process of finding groups to study and hangout with at university.
        </p>

        <p>
          This website aims to connect students facing similar academic challenges, providing a dedicated space for collaborative learning and mutual support. The primary feature of this platform is the facilitation of study group formation, tailored to the diverse majors and classes students pursue. This will provide students with the best methods when attempting to connect with others facing similar academic challenges and will provide many benefits when it comes to learning new material and taking on difficult projects.
        </p>
    </div>
  )
}

export default Home