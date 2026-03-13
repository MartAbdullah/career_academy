import React, { useState } from 'react';
import { FaSearch, FaFilter, FaStar, FaUsers, FaClock, FaGraduationCap, FaLaptopCode, FaDatabase, FaMobileAlt, FaChartLine } from 'react-icons/fa';

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const courses = [
    {
      id: 1,
      title: 'React.js Masterclass',
      category: 'web',
      instructor: 'Sarah Johnson',
      rating: 4.9,
      students: 15000,
      duration: '40 hours',
      price: '$99',
      image: '💻',
      description: 'Complete guide to building modern web applications with React'
    },
    {
      id: 2,
      title: 'Python for Data Science',
      category: 'data',
      instructor: 'Dr. Michael Chen',
      rating: 4.8,
      students: 12000,
      duration: '50 hours',
      price: '$119',
      image: '📊',
      description: 'Master Python, Pandas, NumPy, and Machine Learning'
    },
    {
      id: 3,
      title: 'Flutter Mobile Development',
      category: 'mobile',
      instructor: 'Alex Kumar',
      rating: 4.7,
      students: 8000,
      duration: '45 hours',
      price: '$89',
      image: '📱',
      description: 'Build cross-platform mobile apps with Flutter'
    },
    {
      id: 4,
      title: 'Node.js Backend API',
      category: 'web',
      instructor: 'Emma Davis',
      rating: 4.85,
      students: 10000,
      duration: '35 hours',
      price: '$99',
      image: '⚙️',
      description: 'Build scalable backend services with Node.js and Express'
    },
    {
      id: 5,
      title: 'Machine Learning with TensorFlow',
      category: 'data',
      instructor: 'Prof. James Wilson',
      rating: 4.9,
      students: 9000,
      duration: '60 hours',
      price: '$149',
      image: '🤖',
      description: 'Deep learning and AI with TensorFlow and Keras'
    },
    {
      id: 6,
      title: 'iOS Development with Swift',
      category: 'mobile',
      instructor: 'Lisa Anderson',
      rating: 4.8,
      students: 7000,
      duration: '50 hours',
      price: '$109',
      image: '🍎',
      description: 'Create professional iOS applications with Swift'
    },
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Explore Our Courses</h1>
          <p className="text-xl text-indigo-100">Discover hundreds of expert-led courses to advance your career</p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {/* Search Bar */}
          <div className="md:col-span-2">
            <div className="relative">
              <FaSearch className="absolute left-4 top-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="md:col-span-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              <option value="all">All Categories</option>
              <option value="web">Web Development</option>
              <option value="data">Data Science</option>
              <option value="mobile">Mobile Development</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-600">
            Showing <span className="font-bold text-indigo-600">{filteredCourses.length}</span> courses
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-2xl transform hover:scale-105 transition duration-300">
              {/* Course Image */}
              <div className="bg-gradient-to-br from-indigo-100 to-purple-100 h-48 flex items-center justify-center rounded-t-xl">
                <span className="text-7xl">{course.image}</span>
              </div>

              {/* Course Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{course.description}</p>

                {/* Instructor */}
                <p className="text-sm text-gray-600 mb-4">
                  <span className="font-semibold">by</span> {course.instructor}
                </p>

                {/* Rating and Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <span className="font-semibold">{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaUsers className="text-indigo-600" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaClock className="text-purple-600" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                {/* Price and Button */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-2xl font-bold text-indigo-600">{course.price}</div>
                  <button className="bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No courses found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="mt-4 text-indigo-600 font-semibold hover:text-indigo-700"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Courses;
