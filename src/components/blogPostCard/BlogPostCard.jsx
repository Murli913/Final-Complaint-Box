import { Button, Card, Typography } from "@material-tailwind/react";
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import { useNavigate } from 'react-router';

function BlogPostCard() {
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
    } else if (sortColumn === 'description') {
      return sortOrder === 'asc' ? a.blogs.description.localeCompare(b.blogs.description) : b.blogs.description.localeCompare(a.blogs.description);
    }
    return 0;
  });

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto max-w-7xl">
          <Card className="h-full w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4" onClick={() => handleSort('date')}>
                    <div className="flex items-center justify-between cursor-pointer">
                      <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                        Date
                      </Typography>
                      {sortColumn === 'date' && (
                        <div className="ml-1">
                          {sortOrder === 'asc' ? (
                            <span>&uarr;</span>
                          ) : (
                            <span>&darr;</span>
                          )}
                        </div>
                      )}
                    </div>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4" onClick={() => handleSort('title')}>
                    <div className="flex items-center justify-between cursor-pointer">
                      <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                        Title
                      </Typography>
                      {sortColumn === 'title' && (
                        <div className="ml-1">
                          {sortOrder === 'asc' ? (
                            <span>&uarr;</span>
                          ) : (
                            <span>&darr;</span>
                          )}
                        </div>
                      )}
                    </div>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4" onClick={() => handleSort('description')}>
                    <div className="flex items-center justify-between cursor-pointer">
                      <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                        Description
                      </Typography>
                      {sortColumn === 'description' && (
                        <div className="ml-1">
                          {sortOrder === 'asc' ? (
                            <span>&uarr;</span>
                          ) : (
                            <span>&darr;</span>
                          )}
                        </div>
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedBlogs.length > 0 ? (
                  sortedBlogs.map((item, index) => {
                    const { id, date } = item;
                    const isLast = index === sortedBlogs.length - 1;
                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={id}>
                        <td className={classes}>
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {date}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography variant="small" color="blue-gray" className="font-bold">
                            {item.blogs.title}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography variant="small" color="blue-gray">
                            Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.
                          </Typography>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="3" className="p-4">
                      <Typography variant="base" color="gray">
                        Not Found
                      </Typography>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Card>

          <div className="flex justify-center my-5">
            <Link to={'/allblogs'}>
              <Button
                style={{
                  background: mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)',
                  color: mode === 'dark' ? 'rgb(30, 41, 59)' : 'rgb(226, 232, 240)',
                }}
              >
                See More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BlogPostCard;