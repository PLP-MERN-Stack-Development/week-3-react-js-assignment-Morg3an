import { useState } from 'react';
import Layout from './components/Layout';
import TaskManager from './components/TaskManager';
import ApiDemo from './components/ApiDemo';
import Button from './components/Button';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Layout>
      <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg p-6">
        <div className="flex flex-col items-center justify-center">
          <p className="text-lg mb-4">
            Edit{' '}
            <code className="font-mono bg-gray-200 dark:bg-gray-700 p-1 rounded">
              src/App.jsx
            </code>{' '}
            and save to test HMR
          </p>

          <div className="flex items-center gap-4 my-4">
            <Button onClick={() => setCount(count - 1)} variant="danger">
              -
            </Button>
            <span className="text-xl font-bold">{count}</span>
            <Button onClick={() => setCount(count + 1)} variant="success">
              +
            </Button>
          </div>

          <TaskManager />
        </div>
      </div>

      <div className="mt-8 bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 p-6 rounded shadow transition-colors duration-300">
        <ApiDemo />
      </div>
    </Layout>
  );
}

export default App;