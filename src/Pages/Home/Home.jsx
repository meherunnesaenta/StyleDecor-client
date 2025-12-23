import React from 'react';
import ServicesSection from '../../components/Home/ServiceSection';
import TopDecoratorsSection from '../../components/Home/TopDecoratorsSection';
import Banner from './Banner';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <ServicesSection></ServicesSection>
    <TopDecoratorsSection></TopDecoratorsSection>
    </div>

  );
};

export default Home;