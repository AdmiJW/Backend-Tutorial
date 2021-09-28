import Blog from './Blog';


function BlogList(props) {
    const { blogs } = props;

    // JSX
    return (
        <main>
            <h2 className='title'>Recent Blogs 📝</h2>

            <ul className='no-list-style' id='blog-list'>
                { blogs.map((blog)=> <Blog blog={blog} key={blog._id}/>) }
            </ul>
        </main>
    );
}

export default BlogList;