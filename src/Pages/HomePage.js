import React, { useRef } from 'react'
import Footer from '../Components/Footer'
import HomePageFirstBodySection from '../Components/HomePage/HomePageFirstBodySection'
import HomePageInfoSection from '../Components/HomePage/HomePageInfoSection'
import HomePageMessage from '../Components/HomePage/HomePageMessage'
import HomePageMidBodySection from '../Components/HomePage/HomePageMidBodySection'
import HomePageNavBar from '../Components/HomePage/HomePageNavBar'

function HomePage() {

  const solutions = useRef(null)
  return (
    <>
        <HomePageNavBar solutions={solutions} />
        <HomePageMessage />
        <HomePageFirstBodySection />
        <HomePageMidBodySection solutions={solutions} />
        <HomePageInfoSection />
    </>
  )
}

export default HomePage