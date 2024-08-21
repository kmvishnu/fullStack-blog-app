import React from 'react'
import Card from './Card';

function BodyOfBlogs() {
  return (
    <div style={{ backgroundColor: '#000' }} className="card-container">
      <Card
        title="Card Title 1"
        authName="Author Name 1"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      />
      <Card
        title="Card Title 2"
        authName="Author Name 2"
        text="This is a sample text for card 2."
      />
      <Card
        title="Card Title 3"
        authName="Author Name 3"
        text="This is a sample text for card 3."
      />
      
      <Card
        title="Card Title 5"
        authName="Author Name 5"
        text="This is a sample text for card 5."
      /><Card
        title="Card Title 3"
        authName="Author Name 3"
        text="This is a sample text for card 3."
      />
      <Card
        title="Card Title 4"
        authName="Author Name 4"
        text="This is a sample text for card 4."
      />
      <Card
        title="Card Title 5"
        authName="Author Name 5"
        text="This is a sample text for card 5."
      />
    </div>
  );
}

export default BodyOfBlogs