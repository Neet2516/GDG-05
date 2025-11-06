import React from 'react';
import { FaCheck } from 'react-icons/fa'; // For the checkmark icons
import { MdArrowForward } from 'react-icons/md'; // For the next arrow on buttons
import { useNavigate } from 'react-router';
// Import the random image for all illustrations
import RandomIllustration1 from '../assets/AboutUsPage/img1.png'; 
import RandomIllustration2 from '../assets/AboutUsPage/img2.png'; 
import RandomIllustration3 from '../assets/AboutUsPage/img3.png'; 
import RandomIllustration4 from '../assets/AboutUsPage/img4.png'; 
import RandomIllustration5 from '../assets/AboutUsPage/img5.png'; 
import RandomIllustration6 from '../assets/AboutUsPage/img6.png'; 
// Make sure the path is correct to your image.png file

const AboutUsPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Container for the entire page with horizontal padding */}
      <div className="max-w-6xl mx-auto px-4 py-12 md:px-8 lg:py-16">

        {/* ========================================================= */}
        {/* Section 1: Stop Guessing, Start Understanding */}
        {/* ========================================================= */}
        <section className="flex flex-col lg:flex-row items-center lg:justify-between py-16 lg:py-24 border-b border-gray-200">
          <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-16 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
              Stop guessing, start understanding <br /> your body's <span className="text-blue-600">patterns</span>
            </h1>
            <ul className="text-lg text-gray-700 space-y-3 mb-10">
              <li className="flex items-center justify-center lg:justify-start">
                <FaCheck className="text-green-500 mr-3 shrink-0" /> Log your Data, Effortlessly
              </li>
              <li className="flex items-center justify-center lg:justify-start">
                <FaCheck className="text-green-500 mr-3 shrink-0" /> Uncover Hidden trends with AI
              </li>
              <li className="flex items-center justify-center lg:justify-start">
                <FaCheck className="text-green-500 mr-3 shrink-0" /> Stay on Track with Smart Reminders
              </li>
              <li className="flex items-center justify-center lg:justify-start">
                <FaCheck className="text-green-500 mr-3 shrink-0" /> Receive Personalized Wellness Tips
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <button type="button" className="flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-md" onClick={() => navigate('/login')}>
                Start <MdArrowForward className="ml-2" />
              </button>
              <button className="flex items-center justify-center px-8 py-3 border border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-colors duration-300">
                View trends
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <img 
              src={RandomIllustration1} 
              alt="Two doctors explaining health patterns" 
              className="w-full max-w-md h-auto" 
            />
          </div>
        </section>

        {/* ========================================================= */}
        {/* Section 2: About healthSnap */}
        {/* ========================================================= */}
        <section className="flex flex-col lg:flex-row items-center lg:justify-between py-16 lg:py-24 border-b border-gray-200">
          <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-16 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              About healthSnap: Your Smart Health Companion
            </h2>
            <p className="text-blue-600 text-lg mb-8">
              Empowering you to take proactive control of your well-being
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              In today's fast-paced world, over-looking minor health signals or missing medication
              is common. HealthSnap is here to change that.
            </p>
            {/* Additional content could go here, like more paragraphs or a call to action */}
          </div>
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <img 
              src={RandomIllustration2} 
              alt="Person climbing stairs with health data" 
              className="w-full max-w-md h-auto" 
            />
          </div>
        </section>

        {/* ========================================================= */}
        {/* Section 3: The HealthSnap Difference (Feature Cards) */}
        {/* ========================================================= */}
        <section className="py-16 lg:py-24 border-b border-gray-200">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 text-center mb-12">
            The HealthSnap Difference
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Simple Tracking */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center border border-gray-100 flex flex-col items-center">
              <img 
                src={RandomIllustration3} 
                alt="Tracking Interface" 
                className="w-32 h-auto mb-6" 
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Simple Tracking</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Log symptoms, activities and medication with unparalleled ease.
              </p>
            </div>

            {/* Card 2: Intelligent Analysis */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center border border-gray-100 flex flex-col items-center">
              <img 
                src={RandomIllustration4} 
                alt="Brain with data" 
                className="w-32 h-auto mb-6" 
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Intelligent Analysis</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Uncover hidden trends and receive personalized wellness tips powered by advanced AI.
              </p>
            </div>

            {/* Card 3: Reliable Reminders */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center border border-gray-100 flex flex-col items-center">
              <img 
                src={RandomIllustration5} 
                alt="Notification reminder" 
                className="w-32 h-auto mb-6" 
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Reliable Reminders</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Never miss a dose or an important activity with timely, cross-platform notification.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* Section 4: Our Commitment to Innovation & Your Privacy */}
        {/* ========================================================= */}
        <section className="flex flex-col lg:flex-row items-center lg:justify-between py-16 lg:py-24">
          <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-16 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6 text-blue-600">
              Our Commitment to Innovation & Your Privacy
            </h2>
            <p className="text-gray-700 text-lg mb-4">
              HealthSnap is built on a robust and modern technology stack.
            </p>
            <p className="text-gray-700 text-lg mb-8">
              Your health data is paramount. We employ industry-standard encryption and security protocols to ensure your information is always protected.
            </p>
            <p className="text-gray-800 text-xl font-semibold mb-6">
              Ready to take control of your health?
            </p>
            <button className="flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-md" onClick={() => navigate('/login')}>
              Start <MdArrowForward className="ml-2" />
            </button>
          </div>
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <img 
              src={RandomIllustration6} 
              alt="Data security and privacy illustration" 
              className="w-full max-w-md h-auto" 
            />
          </div>
        </section>

      </div>
    </div>
  );
};

export default AboutUsPage;