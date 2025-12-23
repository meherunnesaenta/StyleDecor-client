import React from 'react';
import ServicesSection from '../../components/Home/ServiceSection';
import TopDecoratorsSection from '../../components/Home/TopDecoratorsSection';
import Banner from './Banner';
import Coverage from '../../components/Home/Coverage';
import Heading from '../../components/Shared/Heading';

const Home = () => {

  const steps = [
    {
      step: "01",
      title: "Browse Services",
      description: "Explore our wide range of decoration packages for home, wedding, office & events",
      icon: "🔍"
    },
    {
      step: "02",
      title: "Choose Date & Location",
      description: "Select your preferred date, time and provide your venue details",
      icon: "📅"
    },
    {
      step: "03",
      title: "Make Secure Payment",
      description: "Complete payment through our secure Stripe gateway",
      icon: "💳"
    },
    {
      step: "04",
      title: "We Decorate Your Space",
      description: "Our expert team arrives and transforms your space into magic",
      icon: "✨"
    }
  ];

  const features = [
    {
      title: "Expert Decorators",
      description: "Handpicked professionals with years of experience in luxury decoration",
      icon: "👨‍🎨"
    },
    {
      title: "Premium Materials",
      description: "We use only high-quality, durable materials for long-lasting beauty",
      icon: "💎"
    },
    {
      title: "Custom Designs",
      description: "Every decoration is tailored to your unique style and preferences",
      icon: "🎨"
    },
    {
      title: "On-Time Delivery",
      description: "We guarantee timely completion – your event will be ready on schedule",
      icon: "⏰"
    },
    {
      title: "Affordable Pricing",
      description: "Luxury decoration at competitive prices with transparent quotes",
      icon: "💰"
    },
    {
      title: "24/7 Support",
      description: "Our team is available round the clock for any assistance",
      icon: "📞"
    }
  ];

  return (
    <div>
      <Banner></Banner>
      <ServicesSection></ServicesSection>
      <TopDecoratorsSection></TopDecoratorsSection>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Heading
              title="How It Works"
              subtitle=" Simple 4-step process to get your space beautifully decorated"
              center={true}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative text-center group"
              >
                <div className="mb-6 relative">
                  <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-4xl group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    {step.icon}
                  </div>
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>

                {/* Connecting line (except last) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-primary/20 -translate-y-1/2 -z-10">
                    <div className="w-full h-full bg-gradient-to-r from-primary/20 to-transparent"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <Coverage></Coverage>
      <section className="py-20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Heading
              title="Why Choose StyleDecor"
              subtitle="We deliver exceptional decoration services with passion and precision"
              center={true}
            />

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
              >
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>

  );
};

export default Home;