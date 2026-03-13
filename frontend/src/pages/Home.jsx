import React from 'react';
import { Link } from 'react-router-dom';
import { FaLaptopCode, FaDatabase, FaMobileAlt, FaArrowRight, FaStar, FaUsers, FaTrophy, FaPlayCircle } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center px-4 py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto text-center text-white">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Learn <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-pink-200">skills</span> that matter
          </h1>
          <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Master in-demand technologies with expert instructors. Grow your career with world-class education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/courses"
              className="bg-white text-indigo-600 font-bold py-4 px-8 rounded-lg hover:shadow-xl transform hover:scale-105 transition inline-flex items-center justify-center gap-2"
            >
              Explore Courses <FaArrowRight className="text-sm" />
            </Link>
            <button className="border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white hover:text-indigo-600 transition inline-flex items-center justify-center gap-2">
              <FaPlayCircle /> Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-6">
              <div className="text-3xl font-bold">50K+</div>
              <div className="text-indigo-100">Active Students</div>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-6">
              <div className="text-3xl font-bold">100+</div>
              <div className="text-indigo-100">Expert Courses</div>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-6">
              <div className="text-3xl font-bold">95%</div>
              <div className="text-indigo-100">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Why Choose Career Academy?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Everything you need to advance your career in one platform</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transform hover:scale-105 transition duration-300">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg p-4 w-16 h-16 flex items-center justify-center mb-6">
                <FaLaptopCode className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Web Development</h3>
              <p className="text-gray-600 mb-4">Learn React, Vue, Node.js and modern backend frameworks from industry experts.</p>
              <a href="#" className="text-indigo-600 font-semibold inline-flex items-center gap-2 hover:gap-3 transition">
                Learn more <FaArrowRight className="text-sm" />
              </a>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transform hover:scale-105 transition duration-300">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg p-4 w-16 h-16 flex items-center justify-center mb-6">
                <FaDatabase className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Data Science & AI</h3>
              <p className="text-gray-600 mb-4">Master Python, ML, and AI with hands-on projects and real-world datasets.</p>
              <a href="#" className="text-indigo-600 font-semibold inline-flex items-center gap-2 hover:gap-3 transition">
                Learn more <FaArrowRight className="text-sm" />
              </a>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transform hover:scale-105 transition duration-300">
              <div className="bg-gradient-to-br from-pink-500 to-red-500 rounded-lg p-4 w-16 h-16 flex items-center justify-center mb-6">
                <FaMobileAlt className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Mobile Development</h3>
              <p className="text-gray-600 mb-4">Build iOS and Android apps with React Native, Flutter, and Swift.</p>
              <a href="#" className="text-indigo-600 font-semibold inline-flex items-center gap-2 hover:gap-3 transition">
                Learn more <FaArrowRight className="text-sm" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-8">Your Path to Success</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white">
                      <FaStar className="text-xl" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Expert Instructors</h3>
                    <p className="text-gray-600 mt-1">Learn from industry professionals with 10+ years of experience</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-600 text-white">
                      <FaUsers className="text-xl" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Community Support</h3>
                    <p className="text-gray-600 mt-1">Join 50,000+ students and get help from peers and mentors</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-pink-600 text-white">
                      <FaTrophy className="text-xl" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Job-Ready Skills</h3>
                    <p className="text-gray-600 mt-1">Get certified and land your dream job with real-world projects</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl p-12 h-96 flex items-center justify-center">
              <div className="text-center">
                <FaPlayCircle className="text-6xl text-indigo-600 mx-auto mb-4 opacity-30" />
                <p className="text-gray-600">Watch our intro video</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Career?</h2>
          <p className="text-xl mb-8">Start learning today and join thousands of successful professionals</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-indigo-600 font-bold py-4 px-8 rounded-lg hover:shadow-xl transform hover:scale-105 transition"
            >
              Sign Up Free
            </Link>
            <Link
              to="/about"
              className="border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white hover:text-indigo-600 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
