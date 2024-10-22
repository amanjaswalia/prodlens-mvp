import React from 'react';
import SearchBar from './SearchBar';
import Title from './Title';
import MenuBar from './MenuBar';

const HomePage: React.FC = () => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <div>
      <SearchBar />
      <div className='py-4'>
      <Title content="Welcome Gabe" date={today} />
      <MenuBar />
      </div>
    </div>
  );
};

export default HomePage;
