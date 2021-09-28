import Blog from './Blog';

// A component that is shown on main page - Contains a list of <Blog /> component.
// The list of blogs is passed in using props from top level component.
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