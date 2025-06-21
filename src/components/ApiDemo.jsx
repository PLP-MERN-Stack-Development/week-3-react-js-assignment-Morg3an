import React, { useEffect, useState } from 'react';
import Button from './Button';

const POSTS_PER_PAGE = 10;

const ApiDemo = () => {
    const [posts, setPosts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);

    const fetchPosts = async (pageNumber = 1) => {
        try {
            setLoading(true);
            const skip = (pageNumber - 1) * POSTS_PER_PAGE;
            const res = await fetch(`https://dummyjson.com/posts?limit=${POSTS_PER_PAGE}&skip=${skip}`);
            if (!res.ok) throw new Error('Failed to fetch posts');
            const data = await res.json();
            setPosts(data.posts);
            setFiltered(data.posts);
            setTotalPosts(data.total);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts(page);
    }, [page]);

    useEffect(() => {
        const query = search.toLowerCase();
        setFiltered(
            posts.filter(
                (post) =>
                    post.title.toLowerCase().includes(query) ||
                    post.body.toLowerCase().includes(query)
            )
        );
    }, [search, posts]);

    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

    return (
        <div className="bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 p-6 rounded shadow transition-colors duration-300">
            <h2 className="text-2xl font-bold mb-4">API Demo: Posts</h2>

            <input
                type="text"
                placeholder="Search posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 border mb-4 rounded dark:bg-gray-700 dark:border-gray-600"
            />

            {loading && <p className="text-blue-500">Loading posts...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}

            <div className="grid md:grid-cols-2 gap-4">
                {filtered.map((post) => (
                    <div
                        key={post.id}
                        className="border rounded p-4 dark:border-gray-600 hover:shadow transition"
                    >
                        <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {post.body}
                        </p>
                    </div>
                ))}
            </div>

            {filtered.length === 0 && !loading && (
                <p className="text-gray-500 mt-4">No posts found.</p>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-6">
                <Button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    variant="secondary"
                >
                    Previous
                </Button>

                <p className="text-sm">
                    Page <strong>{page}</strong> of {totalPages}
                </p>

                <Button
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                    variant="secondary"
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default ApiDemo;