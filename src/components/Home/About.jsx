import React from 'react';
import Heading from '../Shared/Heading'; // তোমার existing Heading component
import { Link } from 'react-router';

const About = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-base-100 to-base-200">
      <div className="container mx-auto px-4">
        {/* Main Title */}
        <Heading
          title="About StyleDecor"
          subtitle="Creating beautiful spaces with passion and precision since 2020"
          center={true}
        />

        {/* Hero Image + Overlay Text */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-20">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
            alt="StyleDecor Team" 
            className="w-full h-[500px] md:h-[600px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white">
            <h3 className="text-3xl md:text-5xl font-bold mb-4">
              We Bring Your Vision to Life
            </h3>
            <p className="text-lg md:text-xl max-w-3xl">
              From elegant home interiors to magical wedding decorations – our expert team transforms ordinary spaces into extraordinary experiences.
            </p>
          </div>
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 lg:order-1">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Our <span className="text-primary">Story</span>
            </h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Founded in 2020, StyleDecor started with a simple mission: to make professional interior decoration accessible to everyone in Bangladesh.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Today, we are proud to be one of the leading decoration service providers, serving thousands of happy clients across major cities with our on-site and in-studio services.
            </p>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div className="bg-primary/10 rounded-2xl p-6 hover:bg-primary hover:text-white transition-all duration-500">
                <div className="text-4xl font-bold text-primary group-hover:text-white">5000+</div>
                <p className="text-gray-600 group-hover:text-white mt-2">Happy Clients</p>
              </div>
              <div className="bg-secondary/10 rounded-2xl p-6 hover:bg-secondary hover:text-white transition-all duration-500">
                <div className="text-4xl font-bold text-secondary group-hover:text-white">200+</div>
                <p className="text-gray-600 group-hover:text-white mt-2">Completed Projects</p>
              </div>
              <div className="bg-primary/10 rounded-2xl p-6 hover:bg-primary hover:text-white transition-all duration-500">
                <div className="text-4xl font-bold text-primary group-hover:text-white">50+</div>
                <p className="text-gray-600 group-hover:text-white mt-2">Expert Decorators</p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
              alt="StyleDecor Team Working" 
              className="rounded-3xl shadow-2xl w-full"
            />
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Our <span className="text-secondary">Core Values</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border-t-8 border-primary">
              <div className="text-6xl mb-6 text-primary">🎨</div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">Creativity</h4>
              <p className="text-gray-600">
                Every design is unique, crafted with innovation and attention to detail
              </p>
            </div>

            <div className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border-t-8 border-secondary">
              <div className="text-6xl mb-6 text-secondary">⭐</div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">Quality</h4>
              <p className="text-gray-600">
                Premium materials and expert craftsmanship in every project
              </p>
            </div>

            <div className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border-t-8 border-primary">
              <div className="text-6xl mb-6 text-primary">🤝</div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">Trust</h4>
              <p className="text-gray-600">
                Transparent pricing, timely delivery, and complete customer satisfaction
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-primary to-secondary rounded-3xl p-12 text-white shadow-2xl">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Space?
          </h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let our expert team create the perfect decoration for your home or event
          </p>
          <Link to='/services' className="btn btn-neutral btn-lg text-xl px-12 hover:scale-105 transition-transform">
            Book Consultation Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;