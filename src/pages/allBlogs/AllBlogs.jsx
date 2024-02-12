import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import Layout from '../../components/layout/Layout';
import myContext from '../../context/data/myContext';

function AllBlogs() {
  const context = useContext(myContext);
  const { mode, getAllBlog } = context;
  const navigate = useNavigate();

  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = (column) => {
    if (sortColumn === column) {
      // If the same column is clicked again, toggle the order
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // If a new column is clicked, set the new column and default order to 'asc'
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const sortedBlogs = [...getAllBlog].sort((a, b) => {
    if (sortColumn === 'date') {
      return sortOrder === 'asc' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date);
    } else if (sortColumn === 'title') {
      return sortOrder === 'asc' ? a.blogs.title.localeCompare(b.blogs.title) : b.blogs.title.localeCompare(a.blogs.title);
    }
    return 0;
  });

  return (
    <Layout>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto max-w-7xl ">
          <div className="mb-5">
            <h1 className='text-center text-2xl font-bold' style={{ color: mode === 'dark' ? 'white' : 'black' }}>
              All Blogs
            </h1>
          </div>
          <div className="flex flex-wrap justify-center -m-4 mb-5">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 cursor-pointer"
                    onClick={() => handleSort('date')}
                  >
                    Date {sortColumn === 'date' && (sortOrder === 'asc' ? <span>&uarr;</span> : <span>&darr;</span>)}
                  </th>
                  <th
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 cursor-pointer"
                    onClick={() => handleSort('title')}
                  >
                    Title {sortColumn === 'title' && (sortOrder === 'asc' ? <span>&uarr;</span> : <span>&darr;</span>)}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedBlogs.map((item, index) => {
                  const { thumbnail, id, date } = item;
                  return (
                    <tr key={index}>
                      <td
                        className="border-b border-blue-gray-100 p-4 cursor-pointer"
                        onClick={() => navigate(`/bloginfo/${id}`)}
                      >
                        {date}
                      </td>
                      <td
                        className="border-b border-blue-gray-100 p-4 cursor-pointer"
                        onClick={() => navigate(`/bloginfo/${id}`)}
                      >
                        {item.blogs.title}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default AllBlogs;