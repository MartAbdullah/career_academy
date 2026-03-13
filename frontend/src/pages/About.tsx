import React from 'react';
import { FaGraduationCap, FaHandshake, FaLightbulb, FaGlobeAmericas } from 'react-icons/fa';

const About = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <FaGraduationCap className="text-7xl mx-auto mb-6 opacity-80" />
          <h1 className="text-5xl font-bold mb-6">About Career Academy</h1>
          <p className="text-xl text-indigo-100">
            Empowering the next generation of tech professionals with world-class education and real-world experience
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Mission</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Career Academy is dedicated to providing world-class education in modern technology. We believe that anyone, anywhere, should have access to high-quality tech education regardless of their background or financial situation.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Our platform connects students with experienced instructors from leading tech companies. We focus on practical, hands-on learning that prepares you for real-world challenges.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Whether you're starting your tech journey or advancing your career, Career Academy is your trusted partner in success.
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl p-12">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <FaLightbulb className="text-4xl text-indigo-600 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Innovative Learning</h3>
                    <p className="text-gray-600">Cutting-edge curriculum updated with latest industry trends</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <FaHandshake className="text-4xl text-purple-600 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Expert Mentors</h3>
                    <p className="text-gray-600">Learn directly from professionals at Google, Meta, Amazon</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <FaGlobeAmericas className="text-4xl text-pink-600 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Global Community</h3>
                    <p className="text-gray-600">Connect with 50,000+ students from 150+ countries</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-8 bg-indigo-50 rounded-2xl">
              <div className="text-5xl font-bold text-indigo-600 mb-2">50K+</div>
              <p className="text-gray-700 font-semibold">Active Students</p>
            </div>

            <div className="text-center p-8 bg-purple-50 rounded-2xl">
              <div className="text-5xl font-bold text-purple-600 mb-2">1000+</div>
              <p className="text-gray-700 font-semibold">Expert Instructors</p>
            </div>

            <div className="text-center p-8 bg-pink-50 rounded-2xl">
              <div className="text-5xl font-bold text-pink-600 mb-2">150+</div>
              <p className="text-gray-700 font-semibold">Countries Covered</p>
            </div>

            <div className="text-center p-8 bg-green-50 rounded-2xl">
              <div className="text-5xl font-bold text-green-600 mb-2">98%</div>
              <p className="text-gray-700 font-semibold">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-16">Our Core Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="bg-indigo-100 rounded-lg p-4 w-16 h-16 flex items-center justify-center mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Excellence</h3>
              <p className="text-gray-600">We're committed to delivering the highest quality education and content</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="bg-purple-100 rounded-lg p-4 w-16 h-16 flex items-center justify-center mb-6">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Community</h3>
              <p className="text-gray-600">We foster a supportive environment where students help each other grow</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="bg-pink-100 rounded-lg p-4 w-16 h-16 flex items-center justify-center mb-6">
                <span className="text-3xl">💡</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Innovation</h3>
              <p className="text-gray-600">We continuously evolve our methods to stay ahead of industry changes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Get In Touch</h2>
          <p className="text-xl mb-8">Have questions? We'd love to hear from you.</p>
          <button className="bg-white text-indigo-600 font-bold py-4 px-8 rounded-lg hover:shadow-xl transition">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
