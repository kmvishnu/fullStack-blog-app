import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import BodyOfPrivateBlogs from '../BodyOfPrivateBlogs/BodyOfPrivateBlogs';
import { useBlogs } from '../../Hooks/useBlogs';

function MyBlogs() {
  const { viewPrivateBlogs, privateBlogs } = useBlogs();
  const [loading, setLoading] = useState(true);

  const refreshBlogs = () => {

    viewPrivateBlogs();
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      await viewPrivateBlogs();
      setLoading(false);
    };
    fetchBlogs();
  }, [viewPrivateBlogs]);

  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh" }}>
      <Header isMyBlogsActive={true} refreshBlogs={refreshBlogs} />
      <BodyOfPrivateBlogs privateBlogs={privateBlogs} loading={loading} refreshBlogs={refreshBlogs}/>
    </div>
  );
}

export default MyBlogs;
