import React from 'react'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { Working } from '../components/Working'
import { Footer } from '../components/Footer'
import { Benefits } from '../components/Benefits'


const LandingPage = () => {
    return (
        <div className="bg-[#0A192F] font-sans">
            <Header />
            <main>
                <Hero />
                <Working />
                <Benefits/>
            </main>
            <Footer />
        </div>
    )
}

export default LandingPage
